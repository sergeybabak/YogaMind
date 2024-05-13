window.addEventListener('load', function() {
    const menuItems = document.querySelectorAll('.promo__link'),
          arrLeft = document.querySelector('.trainers__arrows-left'),
          arrRight = document.querySelector('.trainers__arrows-right'),
          carouselItems = document.querySelectorAll('.trainers__carousel-item'),
          //,carouselWrapper = document.querySelector('.trainers__wrapper')
          links = document.querySelectorAll('a'),
          sections = document.querySelectorAll('section')
          ;
    let carouselIndex = 0,
        menuIndex = 0;

    function menuActive(it) {
        menuItems.forEach((item, i) => {
            menuItems.forEach(item => item.classList.remove('promo__link-active'));
        });
        menuItems[it].classList.add('promo__link-active');
    };
    // Меню
    menuItems.forEach((item, i) => {
        item.addEventListener('click', function(event) {
            event.preventDefault(); // Предотвращаем стандартное действие ссылки
            // Удаляем класс promo__link-active у всех пунктов меню
            // menuItems.forEach(item => item.classList.remove('promo__link-active'));
            // Добавляем класс promo__link-active к текущему пункту меню
            // this.classList.add('promo__link-active');
            menuActive(i);
        });
    });

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Предотвращаем стандартное действие ссылки
            const targetId = this.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            // Прокручиваем страницу к этой секции
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
            if (targetId == 'promo') {
                menuItems.forEach((item, i) => {
                    if (i == 0) {item.classList.add('promo__link-active')}
                    else {item.classList.remove('promo__link-active')}
                });
            }
        });
    });

    // Карусель
    arrRight.addEventListener('click', () => {
        setTimeout(() => {arrRight.classList.remove('animat')},500);
        if (carouselIndex+1 < carouselItems.length) {
            arrRight.classList.add('animat');
            carouselIndex++;
            // const widthNow = carouselItems[carouselIndex-1].offsetWidth;
            // carouselWrapper.style.transform = `translateX(-${widthNow}px)`;

            // carouselItems[carouselIndex].removeAttribute('style');
            // setTimeout(() => {
            //     carouselItems[carouselIndex-1].classList.add('hidden');

            //     setTimeout(() => {
            //         carouselItems[carouselIndex-1].style.display = "none";
            //     }, 1500);
                
            //     setTimeout(() => {
            //         carouselItems[carouselIndex].classList.remove('hidden');
            //     }, 2000); 
            // }, 0); 
            carouselItems[carouselIndex].removeAttribute('style');
            carouselItems[carouselIndex-1].classList.add('hidden');
            setTimeout(() => {
                carouselItems[carouselIndex-1].style.display = "none";
            }, 1500);
            setTimeout(() => {
                carouselItems[carouselIndex].classList.remove('hidden');
            }, 2000); 

            arrLeft.classList.add('trainers__arrows-active');
            if (carouselIndex+1 == carouselItems.length) arrRight.classList.remove('trainers__arrows-active');
        }    
    });
    arrLeft.addEventListener('click', () => {
        setTimeout(() => {arrLeft.classList.remove('animat')},500);
        if (carouselIndex-1 >= 0) {
            arrLeft.classList.add('animat');
            carouselIndex--;
            // const widthNow = carouselItems[carouselIndex-1].offsetWidth;
            // carouselWrapper.style.transform = `translateX(-${widthNow}px)`;

            carouselItems[carouselIndex+1].classList.add('hidden');
            setTimeout(() => {
                carouselItems[carouselIndex].removeAttribute('style');
                }, 1500);
            setTimeout(() => {
                carouselItems[carouselIndex].classList.remove('hidden');
                }, 2000);
            
            arrRight.classList.add('trainers__arrows-active');
            if (carouselIndex == 0) arrLeft.classList.remove('trainers__arrows-active');
        }    
    });
    // изменение пункта меню при скроле
    document.addEventListener('scroll', function() {
        var scrollPosition = window.scrollY || document.documentElement.scrollTop;
    
        sections.forEach(function(section, i) {
            var sectionTop = section.offsetTop;
            var clientHeight = document.documentElement.clientHeight;

            if (scrollPosition >= sectionTop - clientHeight / 2) {
                if (menuIndex != i) {
                    menuIndex = i;
                    menuActive(menuIndex);
                }
            }
        });
        if (scrollPosition > 200) {
            document.querySelector('.promo__header').classList.add('promo__header-fixed');
        }
        else {
            document.querySelector('.promo__header').classList.remove('promo__header-fixed');
        }
    });
});