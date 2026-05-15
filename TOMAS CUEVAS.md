# ZAMMOT – E-commerce (Tp 1)

**Alumno:** Cuevas Tomás Gonzalo
**Materia:** Aplicaciones Web I  
**Trabajo Práctico:** E-commerce – TRABAJO PRÁCTICO FINAL

---

## Descripción

Este proyecto corresponde a la versión final de la aplicación de e-commerce llamada ZAMMOT.
Incluye autenticación completa, carrito por usuario, sistema de favoritos, render dinámico desde JSON, páginas protegidas, modales personalizados, toasts, categorías y una estructura profesional de archivos.

## Contenido del proyecto
- index.html → Página de inicio (Login).

- Registro.html → Página de registro.

- home.html → Página principal del sitio.

- destacados.html → Productos destacados.

- camisas.html → Categoría de camisas.

- trajes.html → Categoría de trajes.

- zapatos.html → Categoría de zapatos.

- carrito.html → Carrito de compras.

- favoritos.html → Sección de favoritos.

- contacto.html → Página de contacto.

## JavaScript

- auth.js → Registro, login, logout y recuperación.

- navbar.js → Navbar dinámico según usuario.

- carrito.js → Carrito por usuario, cantidades, totales, modales y toasts.

- wishlist.js → Sistema de favoritos por usuario.

- renderProducts.js → Render de productos por categoría y tarjetas.

- dataPages.js → Control de estados y comportamiento según la página.

- homeCarousel.js (si corresponde) → Carrusel del Home.

- Estilos (CSS)

- styless.css → Estilos generales del sitio.

- login.css → Estilos del Login.

- Registro.css → Estilos del Registro.

- destacados.css → Estilos de categorías y productos destacados.

- contacto.css → Estilos del formulario de contacto.

## Imágenes

Imágenes optimizadas en formato .webp:

- Carpeta camisas/

- Carpeta trajes/

- Carpeta zapatos/

- zammot_bowtie.webp → Logo.

- zammot_bg.webp → Fondo principal.

- Banners y material visual de soporte.

- Datos

## products.json → Archivo JSON con todos los productos:
- id, título, descripción, precio, imagen, categoría.

## Funcionalidades

- Registro y login con validaciones reales.

- Navbar dinámico según estado del usuario.

- Carrito con persistencia por correo electrónico.

- Favoritos (Wishlist) por usuario.

- Contadores dinámicos en la navbar.

- Render de productos desde JSON usando fetch().

- Modales elegantes para ver producto.

- Toast animado tipo Mercado Libre al agregar al carrito.

- Páginas protegidas (carrito y favoritos requieren login).

- Actualización automática de cantidades y totales.

- Diseño responsive completo.

## Cómo abrir el proyecto

- Clonar o descargar el repositorio.

- Abrir la carpeta en Visual Studio Code.

- Iniciar Live Server.

- Abrir index.html.

- Registrarse o iniciar sesión para navegar todo el sitio.