// Карусель с использованием свойств Grid. Количество элементов > 2
window.addEventListener('load', function() {
    const mainBlock = '.programs__carousel'; // Идентификатор основного окна слайдера
    const mainWindow = document.querySelector(mainBlock),
          carouselItemsClass = mainWindow.children[0].classList.value, // Класс обертки с элементами
          carouselItemClass = document.querySelector('.'+carouselItemsClass).children[0].classList.value, // Класс элементов внутри обертки
          itemCount = document.querySelectorAll('.'+carouselItemClass).length; // Количество элементов слайдера (> 2)

    let arrayOrders = [0,1,2,3];
    let startX, endX, currentIndex = 1;
    let wrapper = document.querySelector('.' + carouselItemsClass);
    // Определяем параметры для работы
    // arrayOrders.push(arrayOrders.shift()); // меняем ордеры при перемещении влево
    // arrayOrders.unshift(arrayOrders.pop()); // меняем ордеры при перемещении вправо

    const setForIndex = (i, mode) => {
        if (mode == 'full') {
            wrapper.style.transition = `2s all`;
        }
        else {
            wrapper.style.transform = '';
        }
        // wrapper.style.transform = '';
        const fullWidth = document.querySelector('.' + carouselItemsClass).offsetWidth,
              itemWidth = document.querySelector('.' + carouselItemClass).offsetWidth,
              carouselWidth = document.querySelector(mainBlock).offsetWidth,
              gap = (fullWidth - itemWidth * itemCount) / (itemCount - 1);
        // const wrapper = document.querySelector('.' + carouselItemsClass);
        const interval = i * itemWidth + gap * i - (carouselWidth - itemWidth) / 2;

        // wrapper.style.transition = `2s all`;

        wrapper.style.transform = `translateX(${-interval}px)`;
        // wrapper.style.transition = `2s all`;
        console.log(mode);
    };

    const setParams = () => {
        document.querySelectorAll('.'+carouselItemClass).forEach((item, i) => {
            item.style.order = arrayOrders[i];
        });
        setForIndex(currentIndex, 'none');
    };
    setParams();
    
    setForIndex(currentIndex, 'full');

    mainWindow.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    mainWindow.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
    });

    mainWindow.addEventListener('touchend', () => {
        // console.log('old: '+currentIndex);
        if (startX - endX > 0) {
            
            if (currentIndex === itemCount - 2) {
                arrayOrders.unshift(arrayOrders.pop());
                currentIndex--;
                setParams();
            }
            currentIndex++;
            setForIndex(currentIndex, 'full');
        }
        else if (startX - endX < 0) {
            
            if (currentIndex === 1) {
                arrayOrders.push(arrayOrders.shift());
                currentIndex++;
                setParams();
            }
            currentIndex--;
            setForIndex(currentIndex, 'full');
        }
        console.log(currentIndex);
        console.log(arrayOrders);
        // setForIndex(currentIndex, 'full');
    });
});