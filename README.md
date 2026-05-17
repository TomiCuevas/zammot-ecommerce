# ZAMMOT – E-commerce

**Alumno:** Cuevas Tomás Gonzalo  
**Materia:** Aplicaciones Web II  
**Trabajo Práctico:** E-commerce – Trabajo Práctico

---

## Descripción

Este proyecto corresponde a la versión final de la aplicación de e-commerce llamada ZAMMOT.

La aplicación fue desarrollada utilizando una arquitectura multirepo, separando el frontend y el backend en distintos repositorios para lograr una mejor organización y comunicación cliente-servidor mediante fetch y Express.js.

El sistema permite:
- Registro e inicio de sesión.
- Navegación dinámica.
- Gestión de carrito de compras.
- Sistema de favoritos.
- Render dinámico de productos.
- Historial de compras.
- Generación de órdenes de compra.
- Persistencia de datos mediante backend y archivos JSON.

---

## Arquitectura del proyecto

### Frontend
Repositorio:

https://github.com/TomiCuevas/zammot-ecommerce

Tecnologías utilizadas:
- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- Bootstrap Icons
- Fetch API
- LocalStorage
- SessionStorage

---

### Backend
Repositorio:

https://github.com/TomiCuevas/ModulosCuevas

Tecnologías utilizadas:
- Node.js
- Express.js
- CORS
- JSON como persistencia de datos

Servidor backend:

http://localhost:3001

---

## Contenido del proyecto

- index.html → Página principal de login.

- Registro.html → Página de registro de usuarios.

- home.html → Página principal del sitio.

- destacados.html → Productos destacados.

- camisas.html → Categoría de camisas.

- trajes.html → Categoría de trajes.

- zapatos.html → Categoría de zapatos.

- carrito.html → Carrito de compras.

- favoritos.html → Sección de favoritos.

- miscompras.html → Historial de compras realizadas.

- contacto.html → Página de contacto.

---

## JavaScript

### APIs
- auth.api.js → Login y registro mediante backend.

- product.api.js → Obtención de productos, categorías y filtros dinámicos.

- sale.api.js → Gestión de ventas y órdenes de compra.

- app.js → Configuración de URL base del backend.

---

### Scripts
- auth.js → Registro, login, logout y validaciones.

- navbar.js → Navbar dinámica según estado del usuario.

- carrito.js → Carrito por usuario, cantidades y compra.

- wishlist.js → Sistema de favoritos por usuario.

- renderProducts.js → Render dinámico de productos.

- ventas.js → Historial de compras.

- dataPages.js → Comportamiento y estados según página.

---

## Estilos (CSS)

- styless.css → Estilos generales del sitio.

- login.css → Estilos del Login.

- Registro.css → Estilos del Registro.

- destacados.css → Estilos de productos y categorías.

- contacto.css → Estilos de contacto.

---

## Imágenes

Imágenes optimizadas en formato `.webp`.

Incluye:
- Camisas
- Trajes
- Zapatos
- Logo institucional
- Fondo principal
- Banners y material visual

---

## Funcionalidades

- Registro y login mediante backend.

- Navbar dinámica según sesión activa.

- Carrito persistente por usuario.

- Sistema de favoritos por usuario.

- Contadores dinámicos en navbar.

- Render dinámico de productos utilizando fetch().

- Filtros dinámicos por categoría y precio consumiendo endpoints del backend.

- Generación de órdenes de compra.

- Historial de compras conectado al backend.

- Persistencia mediante LocalStorage y SessionStorage.

- Toasts y modales personalizados.

- Páginas protegidas para usuarios logueados.

- Diseño responsive completo.

- Comunicación cliente-servidor mediante Express.js.

- Integración completa frontend-backend mediante arquitectura multirepo.

---

## Funcionalidades técnicas implementadas

- Arquitectura multirepo.

- Consumo de API REST mediante fetch.

- Métodos GET, POST, PUT y DELETE.

- Persistencia con archivos JSON.

- SessionStorage para sesión activa.

- LocalStorage para carrito y favoritos.

- Backend desarrollado con Express.js.

- Comunicación frontend-backend mediante CORS.

- Filtrado dinámico y escalable desde el backend mediante query params.

---

## Cómo ejecutar el proyecto

### Clonar repositorios

Frontend:

git clone https://github.com/TomiCuevas/zammot-ecommerce.git

Backend:

git clone https://github.com/TomiCuevas/ModulosCuevas.git

cd ModulosCuevas

npm install

node index.js

---

## Relación con el backend

El frontend consume información desde el backend utilizando fetch.

La comunicación permite:
- Obtener productos.
- Filtrar categorías.
- Aplicar filtros dinámicos por precio y categoría.
- Registrar usuarios.
- Iniciar sesión.
- Crear órdenes de compra.
- Consultar historial de compras.

---

## Notas

- El proyecto utiliza arquitectura multirepo.
- El backend administra usuarios, productos y ventas.
- Los datos se almacenan mediante archivos JSON.
- Se implementa comunicación cliente-servidor utilizando Express.js.
- El archivo .gitignore evita subir dependencias innecesarias.
- Se implementa filtrado dinámico desde backend utilizando query params.

---

## Autor

Tomás Cuevas