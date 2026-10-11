# Pixel Vault — Tienda de videojuegos

Proyecto académico de **Desarrollo Frontend I (PFY2201)**. Sitio de demostración para una tienda online de videojuegos, creado con HTML5, CSS3, JavaScript, Bootstrap 5 y React.

## Funcionalidades

- Navegación por las secciones Inicio, Catálogo y Contacto.
- Catálogo generado dinámicamente a partir del arreglo de objetos definido en `js/videojuegos.js`.
- Tarjetas con portada gráfica, nombre, categoría, precio en CLP y descripción.
- Filtro por categoría y búsqueda por texto.
- Carrito de demostración que actualiza el contador al agregar un juego. No procesa pagos.
- Modo administrador de demostración para agregar y eliminar productos usando el estado de React. Los cambios solo duran durante la sesión y no se guardan en una base de datos.
- Formulario de contacto con validación de nombre, correo electrónico y mensaje, incluidos mensajes de error accesibles.
- Diseño responsivo con Bootstrap 5, CSS Grid y estilos personalizados.
- Portadas SVG originales incluidas en `assets/covers/`; no dependen de imágenes externas.

## Requisitos

Un navegador moderno y conexión a internet para cargar React, Babel y Bootstrap desde sus CDN. No se necesita instalar dependencias con npm.

## Cómo ejecutar el sitio

**Opción recomendada — Visual Studio Code**

1. Descomprime el proyecto y abre la carpeta `tienda-videojuegos` en Visual Studio Code.
2. Instala la extensión **Live Server** si no la tienes.
3. Haz clic derecho en `index.html` y selecciona **Open with Live Server**.
4. El navegador abrirá el sitio. Si aparece la pantalla de carga, revisa tu conexión a internet y la consola del navegador.

**Alternativa con Python**

Abre una terminal dentro de la carpeta y ejecuta:

```bash
python -m http.server 5500
```

Luego visita `http://localhost:5500`.

> No abras el archivo con `file://`: Babel carga el código JSX desde un script externo y puede ser bloqueado por el navegador en ese modo.

## Estructura del proyecto

```text
tienda-videojuegos/
├── index.html
├── README.md
├── .gitignore
├── css/
│   └── styles.css
├── js/
│   ├── videojuegos.js
│   └── app.js
├── assets/
│   └── covers/
│       ├── cyberpunk.svg
│       ├── elden-ring.svg
│       ├── hogwarts.svg
│       ├── western.svg
│       ├── hades.svg
│       ├── racing.svg
│       ├── civilization.svg
│       ├── minecraft.svg
│       └── indie.svg
└── guion_presentacion.md
```

## Tecnologías y componentes

- **HTML semántico:** `header`, `nav`, `main`, `section`, `article`, `form` y `footer`.
- **CSS3:** variables CSS, estados `hover` y `focus-visible`, media queries y CSS Grid para las tarjetas.
- **Bootstrap 5:** barra de navegación, contenedores, grilla responsiva, botones, formularios y alertas.
- **JavaScript:** datos estructurados, búsqueda, filtros, validación y formato de precios chilenos.
- **React:** componentes `Navbar`, `Hero`, `GameCard`, `GameList`, `AddGameForm`, `Catalogo`, `ContactForm`, `Footer` y `App`; uso de `props`, `useState` y `useMemo`.

## Pruebas manuales sugeridas

1. Cambia entre las categorías y confirma que varía el número de tarjetas.
2. Busca un título, luego busca una palabra inexistente y revisa el estado vacío.
3. Pulsa **+ Agregar** y comprueba que sube el contador del carrito.
4. Activa **Administrar catálogo**, agrega un juego y comprueba que aparece inmediatamente.
5. En modo administrador, elimina un juego y confirma que deja de mostrarse.
6. Envía el formulario vacío, luego escribe un correo inválido y revisa los errores.
7. Envía el formulario completo con un correo válido y un mensaje de al menos 10 caracteres.
8. Reduce el ancho del navegador o prueba la vista móvil para comprobar la responsividad.



## Límites de esta demostración

El carrito es solo visual: no hay pago, stock, autenticación, backend ni persistencia de los cambios. El formulario valida los datos en el navegador, pero no envía correos. Para uso real se necesitaría un servicio backend.
