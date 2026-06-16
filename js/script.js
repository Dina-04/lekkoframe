const slides = document.querySelectorAll('.carousel__slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.carousel__arrow--prev');
const nextBtn = document.querySelector('.carousel__arrow--next');

let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
  
  currentSlide = index;
}

function nextSlide() {
  showSlide((currentSlide + 1) % slides.length);
}

function prevSlide() {
  showSlide((currentSlide - 1 + slides.length) % slides.length);
}


nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);


dots.forEach((dot, index) => {
  dot.addEventListener('click', () => showSlide(index));
});


setInterval(nextSlide, 6000);




document.addEventListener('DOMContentLoaded', function() {
   
    emailjs.init("j3Tuo79ori2yOzbhp");
    
    const form = document.getElementById('feedbackForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = document.getElementById('submitBtn');
            const btnText = btn.querySelector('.btn-text');
            const btnLoader = btn.querySelector('.btn-loader');
            const status = document.getElementById('formStatus');
            
            
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline';
            btn.disabled = true;
            status.textContent = '';
            
        
            emailjs.sendForm('service_kym0miq', 'template_s8psodl', this)
                .then(() => {
                    status.innerHTML = '<span style="color:#2ecc71;">✓ Сообщение отправлено! Мы свяжемся с вами.</span>';
                    form.reset();
                    form.querySelectorAll('input, textarea').forEach(field => {
                        field.classList.remove('valid', 'invalid');
                    });
                })
                .catch((error) => {
                    status.innerHTML = '<span style="color:#e74c3c;">✗ Ошибка отправки. Попробуйте позже.</span>';
                    console.error('EmailJS error:', error);
                })
                .finally(() => {
                    btnText.style.display = 'inline';
                    btnLoader.style.display = 'none';
                    btn.disabled = false;
                });
        });
    }


    const phoneInput = document.querySelector('input[type="tel"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value;
            
      
            value = value.replace(/[^\d\s\+\(\)\-]/g, '');
            
     
            const plusCount = (value.match(/\+/g) || []).length;
            if (plusCount > 1) {
                value = value.replace(/\+/g, '');
                value = '+' + value;
            }
            
           
            if (value.includes('+') && !value.startsWith('+')) {
                value = value.replace(/\+/g, '');
                value = '+' + value;
            }
            
    
            if (value.length > 20) {
                value = value.substring(0, 20);
            }
            
            e.target.value = value;
        });
    }
});




/* Стрелки 3 секция */

document.addEventListener('DOMContentLoaded', function() {
    
    // Находим все элементы с классом scroll-animate
    const animatedElements = document.querySelectorAll('.scroll-animate');
    
    // Настройки: когда элемент на 20% виден — запускаем анимацию
    const observerOptions = {
        root: null,           // viewport
        rootMargin: '0px',    
        threshold: 0.2        // 20% элемента должно быть видно
    };
    
    // Создаём наблюдатель
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Если элемент появился в зоне видимости
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Отключаем наблюдение после первой анимации
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Начинаем наблюдать за каждым элементом
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
});




/* Плавный скролл */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    if (!target) return;

    const startPosition = window.pageYOffset;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const distance = targetPosition - startPosition;
    
    const duration = 1000; // ← скорость в мс (1500 = 1.5 секунды, чем больше — тем медленнее)
    let startTime = null;

    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // плавное ускорение/замедление
    }

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutQuad(progress);

      window.scrollTo(0, startPosition + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  });
});








/* Модальное окно */



document.addEventListener('DOMContentLoaded', function() {
    // === ОСНОВНАЯ МОДАЛКА ===
    const modal = document.getElementById('modal');
    const openBtns = document.querySelectorAll('.open-modal-btn');
    const closeBtn = document.getElementById('closemodalBtn');
    const overlay = document.getElementById('modalOverlay');
    const form = document.getElementById('bookingForm');

    if (!modal || !closeBtn || !overlay || !form) {  // ← убрали !openBtn
        console.error('Не найдены элементы основной модалки. Проверьте ID в HTML.');
        return;
    }

    function openModal() {
        modal.classList.add('active');
        document.body.classList.add('modal-open');
    }

    function closeModal() {
        modal.classList.remove('active');
        if (!privacyModal.classList.contains('active')) {
            document.body.classList.remove('modal-open');
        }
    }

    // Вешаем обработчик на ВСЕ кнопки с классом .open-modal-btn
    openBtns.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    // === МОДАЛКА ПОЛИТИКИ ===
    const privacyModal = document.getElementById('privacyModal');
    const privacyLink = document.getElementById('privacyLink');
    const closePrivacyBtn = document.getElementById('closePrivacyBtn');
    const privacyOverlay = document.getElementById('privacyOverlay');

    if (privacyModal && privacyLink && closePrivacyBtn && privacyOverlay) {
        function openPrivacyModal(e) {
            e.preventDefault();
            privacyModal.classList.add('active');
            document.body.classList.add('modal-open');
        }

        function closePrivacyModal() {
            privacyModal.classList.remove('active');
            if (!modal.classList.contains('active')) {
                document.body.classList.remove('modal-open');
            }
        }

        privacyLink.addEventListener('click', openPrivacyModal);
        closePrivacyBtn.addEventListener('click', closePrivacyModal);
        privacyOverlay.addEventListener('click', closePrivacyModal);
    }

    // === ЗАКРЫТИЕ ПО ESCAPE ===
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (privacyModal && privacyModal.classList.contains('active')) {
                closePrivacyModal();
            } else if (modal.classList.contains('active')) {
                closeModal();
            }
        }
    });

    // === ОТПРАВКА ФОРМЫ ===
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        console.log('Данные формы:', data);

        const status = document.getElementById('formStatus');
        const btn = form.querySelector('button[type="submit"]');

        if (btn) btn.disabled = true;

        emailjs.sendForm('service_kym0miq', 'template_s8psodl', this)
            .then(() => {
                if (status) {
                    status.innerHTML = '<span style="color:#2ecc71;">✓ Сообщение отправлено! Мы свяжемся с вами.</span>';
                }
                form.reset();
                closeModal();
            })
            .catch((error) => {
                if (status) {
                    status.innerHTML = '<span style="color:#e74c3c;">✗ Ошибка отправки. Попробуйте позже.</span>';
                }
                console.error('EmailJS error:', error);
            })
            .finally(() => {
                if (btn) btn.disabled = false;
            });
    });
});