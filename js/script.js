import Slider from './simpleSlider.js';

window.addEventListener('load', function () {
    const menuItems = document.querySelectorAll('.header__link'),
        arrLeft = document.querySelector('.trainers__arrows-left'),
        arrRight = document.querySelector('.trainers__arrows-right'),
        // carouselItems = document.querySelectorAll('.trainers__carousel-item'),
        //,carouselWrapper = document.querySelector('.trainers__wrapper')
        links = document.querySelectorAll('a'),
        sections = document.querySelectorAll('section'),
        hamburger = document.querySelector('.hamburger'),
        menu = document.querySelector('.header__nav');
    let carouselIndex = 0,
        menuIndex = 0;

    function menuActive(it) {
        menuItems.forEach((item, i) => {
            menuItems.forEach(item => item.classList.remove('header__link-active'));
        });
        menuItems[it].classList.add('header__link-active');
    };
    // Меню
    menuItems.forEach((item, i) => {
        item.addEventListener('click', function (event) {
            event.preventDefault(); // Предотвращаем стандартное действие ссылки
            // Удаляем класс promo__link-active у всех пунктов меню
            menuItems.forEach(item => item.classList.remove('promo__link-active'));
            // Добавляем класс promo__link-active к текущему пункту меню
            this.classList.add('promo__link-active');
            menuActive(i);
            menu.classList.remove('header__nav-active');
        });
    });

    hamburger.addEventListener('click', () => {
        menu.classList.toggle('header__nav-active');
        hamburger.classList.toggle('hamburger_active');
    });

    links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Предотвращаем стандартное действие ссылки
            const targetId = this.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            // Прокручиваем страницу к этой секции
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
            if (targetId == 'promo') {
                menuItems.forEach((item, i) => {
                    if (i == 0) { item.classList.add('promo__link-active') }
                    else { item.classList.remove('promo__link-active') }
                });
            }
        });
    });


    // Карусель trainers
    const itemImgs = document.querySelectorAll('.trainers__carousel-imgtop > *'),
        itemText = document.querySelectorAll('.trainers__carousel-text'),
        itemName = document.querySelectorAll('.trainers__carousel-name'),
        itemRank = document.querySelectorAll('.trainers__carousel-rank');
    const countItems = itemImgs.length;

    function updateOpacity(it, state) {
        setTimeout(() => {
            itemImgs.forEach((item, i) => {
                if (i === it) {
                    console.log(it, state);
                    state === 'none' ? item.classList.add('hidden') : item.classList.remove('hidden');
                }
            })
        }, 500);
    }

    function updateCarousel() {
        itemImgs.forEach((item, i) => {
            item.classList.toggle('no-display', i !== carouselIndex);
            updateOpacity(carouselIndex, 'yes');
        });
        itemText.forEach((item, i) => {
            item.classList.toggle('no-display', i !== carouselIndex);
        });
        itemName.forEach((item, i) => {
            item.classList.toggle('no-display', i !== carouselIndex);
        });
        itemRank.forEach((item, i) => {
            item.classList.toggle('no-display', i !== carouselIndex);
        });

        // состояние стрелок
        arrLeft.classList.toggle(
            'trainers__arrows-active',
            carouselIndex > 0
        );

        arrRight.classList.toggle(
            'trainers__arrows-active',
            carouselIndex < countItems - 1
        );
    }

    function moveCarousel(direction) {
        updateOpacity(carouselIndex, 'none');

        if (direction === 'next' && carouselIndex < countItems - 1) {
            carouselIndex++;
        }

        if (direction === 'prev' && carouselIndex > 0) {
            carouselIndex--;
        }

        updateCarousel();
    }

    arrRight.addEventListener('click', () => moveCarousel('next'));
    arrLeft.addEventListener('click', () => moveCarousel('prev'));


    // Карусель для programs
    let programSlider = null;

    const sliderProgramConfig = {
        wrapper: '.programs__carousel',
        centralItem: 2,
        dots: {
            panelClass: 'programs__dots',           // обертка точек
            activeClass: 'programs__dot-active'     // активный класс точки
        }
    };

    function handleProgramSlider() {
        const isMobile = window.innerWidth <= 768;

        if (isMobile && !programSlider) {
            // включаем
            programSlider = new Slider(sliderProgramConfig);
        }

        if (!isMobile && programSlider) {
            // выключаем
            programSlider.destroy(); // метод должен быть в классе Slider
            programSlider = null;
        }
    }

    handleProgramSlider();
    window.addEventListener('resize', handleProgramSlider);

    // Прокрутка сайта - управление меню
    const observerOptions = {
        root: null, // следим относительно окна браузера
        rootMargin: '0px',
        threshold: 0.6 // секция считается активной, когда видно 60% её площади
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');

                // Удаляем класс активности у всех ссылок
                menuItems.forEach((link) => {
                    link.classList.remove('header__link-active');
                });

                // Добавляем класс ссылке, которая ведет на текущую секцию
                const activeLink = this.document.querySelector(`[href="#${id}"]`);
                if (activeLink) {
                    activeLink.parentElement.classList.add('header__link-active');
                }

                console.log(id); // Для проверки в консоли
            }
        });
    }, observerOptions);

    // запускаем наблюдение за всеми секциями
    document.querySelectorAll('section').forEach((section) => {
        observer.observe(section);
    });
});