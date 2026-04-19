# Proceso de despliegue

## Backend con Render

El servidor se despliega en [Render.com](https://render.com) como un Web Service con la siguiente configuración:

| Campo | Valor |
|:---|:---|
| Directorio raíz | `server` |
| Build Command | `npm install && npm run build` |
| Start Command | `npm start` |

**Variables de entorno necesarias:**

| Variable | Descripción |
|:---|:---|
| `RAWG_API_KEY` | La clave privada de la API de RAWG. |
| `PORT` | `3000` |

> **Persistencia de datos:** Como Render usa un sistema de archivos efímero el contenido de `library.json` se borra cada vez que el servidor se reinicia o se despliega una nueva versión. Para una solución permanente habría que migrar a una base de datos real.

---

## Frontend con Vercel

El frontend se despliega en [Vercel.com](https://vercel.com) que detecta automáticamente el framework Vite.

**Variables de entorno necesarias:**

| Variable | Descripción |
|:---|:---|
| `VITE_API_URL` | URL completa de la API desplegada en Render (`https://checkpoint-api.onrender.com/api/v1`). |

---

## Errores encontrados

### `ENOENT library.json`

Al tratar de usar la web, se recibe el siguiente error al tratar de añadir un juego a la biblioteca:
> ENOENT: no such file or directory, open '/opt/render/project/src/server/dist/data/library.json'

**Problema:** Al desplegar en producción el servidor no encuentra el archivo `library.json` porque el compilador de TypeScript (`tsc`) no lo copia a la carpeta `dist`.

**Solución:** Se modificó `library.service.ts` para usar `process.cwd()` en lugar de `__dirname`. Así el servidor busca el archivo desde la raíz del proyecto en lugar de dentro de la carpeta.