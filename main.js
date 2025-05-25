
// ===== SERVICES SECTION ANIMATIONS =====

// Función para inicializar las animaciones de la sección de servicios
function initServicesAnimations() {
    // Configuración del Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Crear el observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observar todas las tarjetas de servicio
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        observer.observe(card);
    });
}

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    initServicesAnimations();
});

// También inicializar si el script se carga después del DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initServicesAnimations);
} else {
    initServicesAnimations();
}

        let currentSlide = 0;
        const totalSlides = 4;
        const autoPlayInterval = 5000; // 5 seconds
        let autoPlayTimer;
        let progressTimer;

        const carouselWrapper = document.getElementById('carouselWrapper');
        const indicators = document.querySelectorAll('.indicator');
        const progressFill = document.getElementById('progressFill');

        function updateCarousel() {
            const translateX = -currentSlide * 100;
            carouselWrapper.style.transform = `translateX(${translateX}%)`;
            
            // Update indicators
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });

            // Update active item for animation
            const items = document.querySelectorAll('.feature-item');
            items.forEach((item, index) => {
                item.classList.toggle('active', index === currentSlide);
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
            resetAutoPlay();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
            resetAutoPlay();
        }

        function goToSlide(index) {
            currentSlide = index;
            updateCarousel();
            resetAutoPlay();
        }

        function startAutoPlay() {
            autoPlayTimer = setInterval(nextSlide, autoPlayInterval);
            startProgressBar();
        }

        function stopAutoPlay() {
            clearInterval(autoPlayTimer);
            clearInterval(progressTimer);
            progressFill.style.width = '0%';
        }

        function resetAutoPlay() {
            stopAutoPlay();
            startAutoPlay();
        }

        function startProgressBar() {
            let progress = 0;
            const increment = 100 / (autoPlayInterval / 100);
            
            progressTimer = setInterval(() => {
                progress += increment;
                progressFill.style.width = progress + '%';
                
                if (progress >= 100) {
                    progress = 0;
                }
            }, 100);
        }

        // Touch/Swipe support
        let startX = 0;
        let isDragging = false;

        carouselWrapper.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            stopAutoPlay();
        });

        carouselWrapper.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });

        carouselWrapper.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            
            if (Math.abs(diffX) > 50) { // Minimum swipe distance
                if (diffX > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            } else {
                startAutoPlay();
            }
            
            isDragging = false;
        });

        // Pause autoplay on hover
        const carouselContainer = document.querySelector('.carousel-container');
        carouselContainer.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer.addEventListener('mouseleave', startAutoPlay);

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        });

        // Initialize
        updateCarousel();
        startAutoPlay();

        // Intersection Observer for performance
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startAutoPlay();
                } else {
                    stopAutoPlay();
                }
            });
        });

        observer.observe(document.querySelector('.features'));