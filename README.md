# Terabitia - Página Web

## 🎨 Descripción
Página web completa para Terabitia basada en el diseño de Lovable, con animaciones y navegación funcional.

## 📁 Archivos incluidos
- `index.html` - Estructura HTML completa
- `styles.css` - Estilos y animaciones CSS
- `script.js` - JavaScript para interactividad y animaciones

## 🚀 Características implementadas

### Navegación
- Menú de navegación fijo con efecto de ocultación al hacer scroll
- Smooth scrolling a todas las secciones
- Resaltado del enlace activo según la sección visible
- Enlaces funcionales: Inicio, Nosotros, Servicios, Testimonios, Blog, Contáctanos

### Animaciones JavaScript
- Animaciones de entrada al cargar la página
- Efecto parallax en la imagen del hero
- Iconos flotantes animados
- Animaciones al hacer scroll (Intersection Observer)
- Efecto hover mejorado en tarjetas
- Partículas de fondo animadas
- Cursor personalizado (opcional)
- Header que se oculta/muestra al hacer scroll

### Secciones incluidas
1. **Hero** - Presentación principal con llamados a la acción
2. **Nosotros** - ¿Qué es Terabitia? con pilares y misión/visión
3. **Servicios** - Talleres personalizados, grupales y de inglés
4. **Blog** - Artículos y recursos
5. **Testimonios** - Reseñas de clientes
6. **CTA** - Llamado a acción con WhatsApp
7. **Footer** - Información de contacto

## 📝 Instrucciones de uso

### 1. Agregar tu logo
Reemplaza el archivo `logo.png` con tu logo de Terabitia. El logo debe estar en formato PNG con fondo transparente.

### 2. Agregar imágenes
Necesitas agregar las siguientes imágenes a la carpeta:
- `logo.png` - Logo de Terabitia
- `hero-image.jpg` - Imagen principal del hero (niños jugando)
- `service1.jpg` - Imagen para talleres personalizados
- `service2.jpg` - Imagen para talleres grupales
- `service3.jpg` - Imagen para taller de inglés

### 3. Configurar WhatsApp
En el archivo `index.html`, busca esta línea:
```html
<a href="https://wa.me/1234567890" class="btn btn-whatsapp" target="_blank">
```
Reemplaza `1234567890` con tu número de WhatsApp (incluye código de país sin +).

### 4. Abrir la página
Simplemente abre el archivo `index.html` en tu navegador web.

## 🎯 Personalización

### Colores
Puedes cambiar los colores principales en `styles.css`:
```css
:root {
    --primary-color: #E85D4A;    /* Rojo/naranja principal */
    --secondary-color: #2DB89F;   /* Verde/turquesa */
    --bg-cream: #F5E6D3;          /* Fondo crema */
    --bg-light: #FFF8F0;          /* Fondo claro */
}
```

### Contenido
Todo el contenido está en español y puede ser editado directamente en el archivo `index.html`.

## 🌐 Responsive
La página es completamente responsive y se adapta a dispositivos móviles, tablets y desktop.

## ✨ Efectos especiales
- Smooth scrolling
- Parallax en hero
- Animaciones de entrada
- Hover effects
- Partículas flotantes
- Cursor personalizado
- Header inteligente

¡Tu página está lista para usar! 🎉
