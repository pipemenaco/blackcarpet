import express from 'express'
import cors from 'cors'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, '..', 'dist')

const app = express()
app.set('trust proxy', 1)
app.use(compression())
app.use(express.json({ limit: '20kb' }))
app.use(cors())

// --- Configuración del transporte SMTP ---
function buildTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 465),
    secure: String(process.env.SMTP_SECURE || 'true') === 'true',
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })
}

const transporter = buildTransport()

// Limita el formulario a 5 envíos cada 15 minutos por IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: 'Demasiados envíos. Intenta más tarde.' },
})

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, smtp: Boolean(transporter) })
})

app.post('/api/contacto', contactLimiter, async (req, res) => {
  const { nombre, email, telefono, tipoEvento, mensaje } = req.body || {}

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ ok: false, error: 'Faltan campos obligatorios.' })
  }
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))
  if (!emailOk) {
    return res.status(400).json({ ok: false, error: 'El correo no es válido.' })
  }

  if (!transporter) {
    // Sin SMTP configurado: registramos el mensaje para no perderlo.
    console.warn('[contacto] SMTP no configurado. Mensaje recibido:', {
      nombre, email, telefono, tipoEvento, mensaje,
    })
    return res.json({
      ok: true,
      warning: 'Mensaje recibido (modo sin correo). Configura SMTP para recibir emails.',
    })
  }

  try {
    await transporter.sendMail({
      from: process.env.CONTACT_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_TO || process.env.SMTP_USER,
      replyTo: email,
      subject: `Nuevo contacto web — ${nombre}`,
      text: `Nombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono || '-'}\nTipo de evento: ${tipoEvento || '-'}\n\nMensaje:\n${mensaje}`,
      html: `
        <h2>Nuevo mensaje desde blackcarpet.cl</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(nombre)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Teléfono:</strong> ${escapeHtml(telefono || '-')}</p>
        <p><strong>Tipo de evento:</strong> ${escapeHtml(tipoEvento || '-')}</p>
        <p><strong>Mensaje:</strong></p>
        <p style="white-space:pre-wrap">${escapeHtml(mensaje)}</p>
      `,
    })
    return res.json({ ok: true })
  } catch (err) {
    console.error('[contacto] Error al enviar correo:', err.message)
    return res.status(500).json({ ok: false, error: 'No se pudo enviar el mensaje.' })
  }
})

// --- Servir el frontend compilado (producción) ---
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir))
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distDir, 'index.html'))
  })
} else {
  app.get('/', (_req, res) => {
    res.send('Backend Black Carpet activo. Ejecuta "npm run build" para generar el frontend.')
  })
}

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Black Carpet escuchando en http://localhost:${PORT}`)
  console.log(`SMTP ${transporter ? 'configurado ✔' : 'NO configurado (modo log)'}`)
})
