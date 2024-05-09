window.addEventListener('load', function() {
    const menuItems = document.querySelectorAll('.promo__link'),
          arrLeft = document.querySelector('.trainers__arrows-left'),
          arrRight = document.querySelector('.trainers__arrows-right'),
          carouselItems = document.querySelectorAll('.trainers__carousel-item')
          //,carouselWrapper = document.querySelector('.trainers__wrapper')
          ;
    let carouselIndex = 0;

    // Меню
    menuItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault(); // Предотвращаем стандартное действие ссылки
            // Удаляем класс promo__link-active у всех пунктов меню
            menuItems.forEach(item => item.classList.remove('promo__link-active'));
            // Добавляем класс promo__link-active к текущему пункту меню
            this.classList.add('promo__link-active');
        });
    });

    // Карусель
    arrRight.addEventListener('click', () => {
        
        if (carouselIndex+1 < carouselItems.length) {
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
        if (carouselIndex-1 >= 0) {
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
});