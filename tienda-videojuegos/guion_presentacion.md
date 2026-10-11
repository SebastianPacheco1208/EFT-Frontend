# Guion para el video de presentación

**Duración sugerida:** 4 a 5 minutos. Comparte la pantalla y abre el sitio en el navegador. Ajusta el texto a tu manera de hablar; no es necesario memorizarlo.

## 1. Presentación (0:00–0:30)

“Hola, mi nombre es [tu nombre] y voy a presentar Pixel Vault, una tienda de videojuegos desarrollada para la Evaluación Final Transversal de Desarrollo Frontend I, PFY2201. El objetivo es mostrar un catálogo dinámico, filtrado por categoría, un formulario de contacto y componentes React.”

## 2. Diseño y estructura (0:30–1:10)

“Este es el inicio. La barra de navegación lleva a Inicio, Catálogo y Contacto. Usé etiquetas semánticas como header, nav, main, section, article y footer. Bootstrap 5 aporta la navegación, los contenedores, los botones y la distribución adaptable; CSS personalizado define colores, tipografías, efectos y CSS Grid para las tarjetas. Las portadas están guardadas localmente como SVG.”

Muestra la página en pantalla completa y luego reduce el ancho del navegador para mostrar la adaptación móvil.

## 3. Catálogo y JavaScript (1:10–2:15)

“Los videojuegos se almacenan como objetos en `js/videojuegos.js`, con id, nombre, categoría, precio, descripción e imagen. En `app.js`, React recorre la lista y genera las tarjetas. Puedo filtrar por categoría y buscar por texto. Los precios se presentan en pesos chilenos usando `Intl.NumberFormat`.”

Demuestra dos categorías, una búsqueda y el estado sin resultados. Después agrega un juego al carrito para mostrar el cambio del contador.

## 4. Componentes React y estado (2:15–3:10)

“La interfaz se divide en componentes reutilizables: Navbar, Hero, GameCard, GameList, Catalogo, AddGameForm, ContactForm y Footer. Los datos pasan entre componentes mediante props y el estado se gestiona con `useState`; `useMemo` calcula la lista filtrada. Para mostrar la administración, activo el modo administrador, agrego un producto y luego, si corresponde, elimino uno. Estos cambios son temporales y se mantienen solo durante la sesión.”

Demuestra agregar y eliminar un producto.

## 5. Validación del formulario (3:10–4:00)

“En Contacto, el formulario solicita nombre, correo y mensaje. Valida que los campos no estén vacíos, que el correo tenga un formato válido y que el mensaje tenga al menos diez caracteres. Cuando hay errores, los informa junto al campo; al completar los datos, muestra una confirmación. Como es una demo frontend, no se envía un correo real.”

Prueba primero el envío vacío y después completa un ejemplo de prueba. No muestres datos personales reales.

## 6. Código, documentación y cierre (4:00–4:40)

“Los estilos están en `css/styles.css`, los datos iniciales en `js/videojuegos.js` y la lógica y componentes React en `js/app.js`. El archivo README incluye instrucciones para ejecutar el proyecto, estructura, tecnologías y pruebas manuales. El proyecto se puede subir a GitHub y publicar con GitHub Pages. Con esto concluyo la presentación de Pixel Vault.”

## Lista rápida antes de grabar

- [ ] Abrir el proyecto mediante Live Server o un servidor local.
- [ ] Comprobar que las imágenes SVG carguen.
- [ ] Mostrar filtro, búsqueda, carrito y modo administrador.
- [ ] Mostrar errores y confirmación del formulario.
- [ ] Mostrar brevemente los archivos de código y el README.
- [ ] Guardar la grabación en formato MP4 y revisar que se escuche bien.
