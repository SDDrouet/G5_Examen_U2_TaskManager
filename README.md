# Gestor de Tareas

Este proyecto es una aplicación de gestión de tareas. La aplicación está construida con Next.js para el frontend y Express para el backend.

## Requisitos

- Node.js (v14 o superior)
- npm o yarn

## Instalación

### Backend

1. Navega a la carpeta del backend:

    ```bash
    cd backend
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Ejecuta el servidor:

    ```bash
    npm start
    ```

   El backend estará disponible en [http://localhost:5000](http://localhost:5000).

### Frontend

1. Navega a la carpeta del frontend:

    ```bash
    cd frontend
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Ejecuta el servidor:

    ```bash
    npm run dev
    ```

   El frontend estará disponible en [http://localhost:3000](http://localhost:3000).

## Estructura del Proyecto

### Backend

- `src/server.js` - Archivo principal del servidor Express.
- `src/routes/` - Contiene las rutas del backend.
- `src/ervices/` - Lógica de manejo de solicitudes.
- `src/models/` - Modelos de datos.

### Frontend

- `pages/` - Contiene las páginas de Next.js.
- `controller/` - Comunicación y envio de datos al backend.
- `view/` - Muestra y organiza la información en la página
- `models/` - Modelos de datos.
- `styles/` - Hojas de estilo y configuraciones de Tailwind CSS.
- `public/` - Archivos estáticos como imágenes.

## Uso

1. Asegúrate de que tanto el backend como el frontend estén en ejecución.
2. Abre tu navegador y visita [http://localhost:3000](http://localhost:3000) para acceder a la aplicación de gestión de tareas.
3. Interactúa con la interfaz para gestionar tareas y grupos.



