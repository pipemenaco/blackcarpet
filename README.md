# Black Carpet — Sitio web

Sitio de **Black Carpet**, productora de eventos inmersivos.

- **Frontend:** React + Vite (CSS plano, sin frameworks de estilos)
- **Backend:** Node.js + Express (sirve el sitio compilado y el formulario de contacto)
- **Correo:** Nodemailer (SMTP de Hostinger)

Un solo servidor Node sirve el sitio estático **y** la API del formulario, así
Hostinger lo despliega como una única aplicación.

---

## Desarrollo local

```bash
npm install
cp .env.example .env   # completa los datos SMTP (opcional para probar)
npm run dev            # frontend en :5173, backend en :3000
```

Abre http://localhost:5173. Sin SMTP configurado el formulario funciona en
"modo log": el mensaje se imprime en la consola del servidor en vez de enviar
un correo.

## Probar el build de producción

```bash
npm run build   # genera /dist
npm start       # sirve /dist + API en http://localhost:3000
```

---

## Despliegue en Hostinger (Git + Node.js)

> Requiere un plan con soporte **Node.js** (Cloud o Business). El panel es
> **hPanel**.

1. **Subir a GitHub** (ya hecho): repositorio `pipemenaco/blackcarpet`.
2. En hPanel: **Sitios web → Avanzado → Node.js** → *Crear aplicación*.
   - **Versión de Node:** 18 o superior
   - **Repositorio Git:** `https://github.com/pipemenaco/blackcarpet`
   - **Rama:** `main`
   - **Archivo de inicio (startup file):** `server/index.js`
   - **Comando de build:** `npm install && npm run build`
3. **Variables de entorno** (sección *Environment variables* de la app):
   copia las de `.env.example` con los valores reales del correo
   `contacto@blackcarpet.cl` (lo creas en hPanel → *Correos electrónicos*).
4. **Iniciar la app.** Hostinger ejecuta el build y levanta `server/index.js`.
5. **Dominio:** apunta `blackcarpet.cl` a la aplicación Node desde
   *Dominios* en hPanel.

Cada vez que hagas `git push`, vuelve a desplegar desde el botón de la app
(o configura auto-deploy si tu plan lo permite).

### Alternativa: hosting estático puro

Si prefieres no usar Node en Hostinger, puedes subir solo la carpeta `dist/`
a `public_html` (hosting compartido normal). En ese caso el formulario
necesita un backend aparte (por ejemplo, tu VPS) o un servicio externo de
formularios.

---

## Estructura

```
blackcarpet/
├── index.html            # HTML raíz (Vite)
├── src/                  # Frontend React
│   ├── main.jsx
│   ├── App.jsx
│   ├── styles.css
│   └── components/
├── server/
│   └── index.js          # Express: estáticos + /api/contacto
├── .env.example          # Variables (SMTP, contacto)
└── package.json
```

## API

`POST /api/contacto`
```json
{ "nombre": "...", "email": "...", "telefono": "...", "tipoEvento": "...", "mensaje": "..." }
```
Respuesta: `{ "ok": true }`. Limitado a 5 envíos por IP cada 15 minutos.
