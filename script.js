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

// Newsletter Form Handler
const newsletterForm = document.getElementById('newsletter-form');
const newsletterMessage = document.getElementById('newsletter-message');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = newsletterForm.querySelector('button[type="submit"]');
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        
        // Deshabilitar botón mientras se envía
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        
        try {
            // AQUÍ PONDRÁS TU URL DE GOOGLE APPS SCRIPT
            const scriptURL = 'TU_URL_AQUI';
            
            const formData = new FormData();
            formData.append('nombre', nombre);
            formData.append('email', email);
            formData.append('fecha', new Date().toLocaleString('es-CO'));
            
            const response = await fetch(scriptURL, {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                newsletterMessage.textContent = '¡Gracias por suscribirte! 🎉 Pronto recibirás noticias nuestras.';
                newsletterMessage.className = 'newsletter-message success';
                newsletterForm.reset();
            } else {
                throw new Error('Error en la respuesta');
            }
        } catch (error) {
            newsletterMessage.textContent = 'Hubo un error. Por favor intenta de nuevo.';
            newsletterMessage.className = 'newsletter-message error';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Suscribirme';
            
            // Ocultar mensaje después de 5 segundos
            setTimeout(() => {
                newsletterMessage.style.display = 'none';
            }, 5000);
        }
    });
}
