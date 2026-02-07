// Smooth scrolling para los enlaces del menú
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.transform = 'translateY(0)';
        return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer para animaciones al hacer scroll (EXCLUYENDO pillar-cards)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animación SOLO a service-card, blog-card y card (NO a pillar-card)
const animateElements = document.querySelectorAll('.service-card, .blog-card, .card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// FLIP CARDS de pilares - Esta es la animación principal
const pillarCards = document.querySelectorAll('.pillar-card');
pillarCards.forEach(card => {
    // Hacer las cards visibles inmediatamente
    card.style.opacity = '1';
    
    // Agregar evento de click para voltear
    card.addEventListener('click', function() {
        this.classList.toggle('flipped');
    });
});

// Animación de testimonios al hacer scroll
const testimonioObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animate-in');
            }, index * 200);
        }
    });
}, {
    threshold: 0.2
});

const testimonioCards = document.querySelectorAll('.testimonio-card');
testimonioCards.forEach(card => {
    testimonioObserver.observe(card);
});

// Animación de la sección "¿Qué incluyen nuestros servicios?"
const servicesInfoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, {
    threshold: 0.3
});

const servicesInfo = document.querySelector('.services-info');
if (servicesInfo) {
    servicesInfoObserver.observe(servicesInfo);
}

// Efecto parallax suave en el hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Animación de los iconos flotantes
const floatingIcons = document.querySelectorAll('.icon');
floatingIcons.forEach((icon, index) => {
    icon.style.animation = `float ${3 + index}s ease-in-out infinite`;
    icon.style.animationDelay = `${index * 0.5}s`;
});

// Efecto hover en las tarjetas de servicio
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Resaltar el enlace activo del menú
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Agregar clase active al CSS
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Animación de entrada para el hero
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent) {
        heroContent.style.animation = 'fadeInLeft 1s ease forwards';
    }
    if (heroImage) {
        heroImage.style.animation = 'fadeInRight 1s ease forwards';
    }
});

console.log('🎨 Terabitia - Página cargada con éxito!');

// Load recent blogs dynamically
async function loadRecentBlogs() {
    const blogGrid = document.querySelector('.blog-grid');
    
    try {
        console.log('📚 Intentando cargar blogs...');
        const response = await fetch('blogs.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const blogs = await response.json();
        console.log('✅ Blogs cargados:', blogs);
        
        // Sort by date (most recent first)
        blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Get last 3 blogs
        const recentBlogs = blogs.slice(0, 3);
        
        // Update blog grid
        if (blogGrid && recentBlogs.length > 0) {
            blogGrid.innerHTML = recentBlogs.map(blog => `
                <article class="blog-card">
                    <h3>${blog.title}</h3>
                    <p>${blog.description}</p>
                    <a href="${blog.url}" class="blog-link">Leer más →</a>
                </article>
            `).join('');
        } else if (blogGrid) {
            blogGrid.innerHTML = `
                <article class="blog-card">
                    <h3>Próximamente</h3>
                    <p>Estamos preparando contenido increíble para ti. ¡Vuelve pronto!</p>
                </article>
            `;
        }
    } catch (error) {
        console.error('❌ Error cargando blogs:', error);
        // Show fallback content if fetch fails
        if (blogGrid) {
            blogGrid.innerHTML = `
                <article class="blog-card">
                    <h3>El juego libre y el aprendizaje en la primera infancia</h3>
                    <p>Descubre cómo el juego libre y no estructurado potencia el desarrollo cognitivo, emocional y social de los niños.</p>
                    <a href="juego-libre-aprendizaje-primera-infancia.html" class="blog-link">Leer más →</a>
                </article>
            `;
        }
    }
}

// Load blogs when page loads
if (document.querySelector('.blog-grid')) {
    loadRecentBlogs();
}

// Newsletter Form Handler
const newsletterForm = document.getElementById('newsletter-form');
const newsletterMessage = document.getElementById('newsletter-message');
const nombreInput = document.getElementById('nombre');
const emailInput = document.getElementById('email');
const nombreError = document.getElementById('nombre-error');
const emailError = document.getElementById('email-error');

// Función para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Limpiar errores al escribir
if (nombreInput) {
    nombreInput.addEventListener('input', () => {
        nombreInput.classList.remove('error');
        nombreError.classList.remove('show');
    });
}

if (emailInput) {
    emailInput.addEventListener('input', () => {
        emailInput.classList.remove('error');
        emailError.classList.remove('show');
    });
}

if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        console.log('📬 Formulario enviado');
        
        // Limpiar mensajes previos
        newsletterMessage.style.display = 'none';
        nombreError.classList.remove('show');
        emailError.classList.remove('show');
        nombreInput.classList.remove('error');
        emailInput.classList.remove('error');
        
        const submitBtn = newsletterForm.querySelector('button[type="submit"]');
        const nombre = nombreInput.value.trim();
        const email = emailInput.value.trim();
        
        // Validaciones
        let hasError = false;
        
        if (!nombre || nombre.length < 2) {
            nombreInput.classList.add('error');
            nombreError.textContent = 'Por favor ingresa tu nombre completo';
            nombreError.classList.add('show');
            hasError = true;
        }
        
        if (!email) {
            emailInput.classList.add('error');
            emailError.textContent = 'Por favor ingresa tu correo';
            emailError.classList.add('show');
            hasError = true;
        } else if (!isValidEmail(email)) {
            emailInput.classList.add('error');
            emailError.textContent = 'Por favor ingresa un correo válido (ejemplo@correo.com)';
            emailError.classList.add('show');
            hasError = true;
        }
        
        if (hasError) {
            console.log('❌ Errores de validación');
            return;
        }
        
        // Deshabilitar botón mientras se envía
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        
        try {
            // SheetDB - API configurada
            const sheetDBURL = 'https://sheetdb.io/api/v1/ex6fuolvqkzpx';
            
            console.log('🚀 Enviando a SheetDB');
            console.log('📝 Datos:', { nombre, email });
            
            const response = await fetch(sheetDBURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: [{
                        Nombre: nombre,
                        Email: email,
                        Fecha: new Date().toLocaleString('es-CO')
                    }]
                })
            });
            
            const result = await response.json();
            console.log('📥 Respuesta:', result);
            
            if (response.ok && result.created === 1) {
                console.log('✅ Guardado en Google Sheet');
                newsletterMessage.textContent = '¡Gracias por suscribirte, ' + nombre + '! 🎉 Pronto recibirás noticias nuestras.';
                newsletterMessage.className = 'newsletter-message success';
                newsletterMessage.style.display = 'block';
                newsletterForm.reset();
            } else {
                throw new Error('Error al guardar');
            }
            
        } catch (error) {
            console.error('❌ Error:', error);
            newsletterMessage.textContent = '❌ Hubo un error al enviar. Por favor intenta de nuevo o contáctanos por WhatsApp.';
            newsletterMessage.className = 'newsletter-message error';
            newsletterMessage.style.display = 'block';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Suscribirme';
            
            // Ocultar mensaje después de 8 segundos
            setTimeout(() => {
                newsletterMessage.style.display = 'none';
            }, 8000);
        }
    });
}
