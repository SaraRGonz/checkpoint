# 🎮 Checkpoint

![Checkpoint Cover](public/checkpointlogo.svg) **Checkpoint** es una plataforma web fullstack para la gestión de colecciones de videojuegos. Diseñada como un organizador personal, permite a los usuarios buscar títulos, gestionar su estado (Wishlist, Playing, Backlog, Completed, Dropped), calificar sus juegos y escribir reseñas personales.

---

## 📊 Tablero de Trello: Organización del proyecto
https://trello.com/b/54UhRPDL

---

## 🚀 Live Demo & API

- **Frontend (Vercel):** 🔗 https://checkpoint-gules.vercel.app/
- **Backend API (Render):** [🔗 https://checkpoint-api-0tgm.onrender.com](https://checkpoint-api-0tgm.onrender.com/api/health)
- **Documentación de Despliegue:** Consulta [`docs/deployment.md`](docs/deployment.md) para más detalles técnicos.

---

## ✨ Características Principales 

* 🔍 **Buscador Integrado:** Conexión en tiempo real con la API de RAWG para encontrar cualquier videojuego al instante.
* 📚 **Gestión de Biblioteca (CRUD):** Añade juegos desde el buscador o de forma manual. Edita plataformas, notas, puntuaciones y etiquetas (géneros).
* 📊 **Dashboard Dinámico:** Página de inicio con estadísticas calculadas en tiempo real y listas rápidas de "Jugando" y "Lista de Deseos".
* 🌓 **Tema Claro/Oscuro:** Interfaz adaptable mediante Context API y guardado de preferencias en `localStorage`.
* 📱 **Diseño 100% Responsive:** Experiencia fluida en dispositivos móviles con menús interactivos y animaciones suaves usando Framer Motion.
* 🛡️ **Validación de Datos:** Uso de `Zod` en el backend para asegurar que la información guardada siempre tenga el formato correcto.

---

## 🛠️ Stack Tecnológico

**Frontend:**
- **React 19** + **TypeScript**
- **Vite** (Build Tool)
- **Tailwind CSS v4** (Estilos y macros estructurales)
- **Framer Motion** (Animaciones UI)
- **React Router DOM v7** (Navegación)

**Backend:**
- **Node.js** + **Express**
- **Zod** (Validación de esquemas)
- **UUID** (Generación de identificadores)
- **File System (fs)** (Persistencia de datos en JSON para entorno de desarrollo)

---

## ⚙️ Instalación y Uso Local

Sigue estos pasos para levantar el proyecto en tu máquina local.

### 1. Clonar el repositorio
```bash
git clone https://github.com/SaraRGonz/checkpoint
cd checkpoint
```

### 2. Configurar el Backend
#### 2.1. Navega a la carpeta del servidor:
```
cd server
```

#### 2.2. Instala las dependencias:
```
npm install
```

#### 2.3. Crea un archivo .env en la carpeta server con tus credenciales:
```
PORT=3000
RAWG_API_KEY=tu_clave_de_rawg_aqui
```

#### 2.4. Inicia el servidor en modo desarrollo:
```
npm run dev
```

### 3. Configurar el Frontend

#### 3.1. Abre una nueva terminal en la raíz del proyecto (/checkpoint).

#### 3.2. Instala las dependencias:
```
npm install
```

#### 3.3. (Opcional) Crea un archivo .env en la raíz si tu backend no usa el puerto 3000:
```
VITE_API_URL=http://localhost:3000/api/v1
```

#### 3.4. Inicia el entorno de desarollo
```
npm run dev
```

La aplicación estará disponible en http://localhost:5173.

---

## 📂 Estructura del Proyecto

El repositorio sigue la siguiente arquitectura:

```plaintext
CHECKPOINT/
├── docs/               # Documentación, plan de pruebas (QA) y despliegue
├── server/             # Backend (Express + Node)
│   ├── controllers/    # Lógica de las rutas
│   ├── data/           # Base de datos local (library.json)
│   ├── middleware/     # Manejo de errores y validación Zod
│   ├── routes/         # Endpoints de la API
│   └── services/       # Integración con RAWG y operaciones CRUD
├── src/                # Frontend (React + Vite)
│   ├── api/            # Cliente Fetch y llamadas al backend
│   ├── components/     # Componentes reutilizables de UI y layout
│   ├── context/        # Estado global (Theme y Library)
│   ├── hooks/          # Custom hooks (filtros, lógica de UI)
│   ├── pages/          # Vistas principales (Home, Library, Search...)
│   └── utils/          # Formateadores, constantes y utilidad 'cn' (Tailwind merge)
```

---

## 🧪 Pruebas y Control de Calidad

El proyecto ha pasado por una fase de QA documentada. Para ver el historial de bugs solucionados y la metodología de pruebas, revisa `docs/testing.md`.

---

## 📄 Créditos y Licencia

- Datos e imágenes de videojuegos proporcionados por [RAWG API](https://rawg.io/apidocs).