// Карусель с использованием свойств Grid. Количество элементов > 2
window.addEventListener('load', function() {
    const mainBlock = '.programs__carousel'; // Идентификатор основного окна слайдера
    const mainWindow = document.querySelector(mainBlock),
          carouselItemsClass = mainWindow.children[0].classList.value, // Класс обертки с элементами
          carouselItemClass = document.querySelector('.'+carouselItemsClass).children[0].classList.value, // Класс элементов внутри обертки
          itemCount = document.querySelectorAll('.'+carouselItemClass).length; // Количество элементов слайдера (> 2)

    let arrayOrders = [0,1,2,3];
    // Определяем параметры для работы
    // arrayOrders.push(arrayOrders.shift()); // меняем ордеры при перемещении влево
    // arrayOrders.unshift(arrayOrders.pop()); // меняем ордеры при перемещении вправо

    const setParams = () => {
        document.querySelectorAll('.'+carouselItemClass).forEach((item, i) => {
            item.style.order = arrayOrders[i];
        });
    };
    setParams();
    
    let startX, endX, currentIndex = 1;
    let wrapper = document.querySelector('.' + carouselItemsClass);

    const setForIndex = (i) => {
        console.log(i+'!');
        // wrapper.style.transform = '';
        const fullWidth = document.querySelector('.' + carouselItemsClass).offsetWidth,
              itemWidth = document.querySelector('.' + carouselItemClass).offsetWidth,
              carouselWidth = document.querySelector(mainBlock).offsetWidth,
              gap = (fullWidth - itemWidth * itemCount) / (itemCount - 1);
        // const wrapper = document.querySelector('.' + carouselItemsClass);
        const interval = i * itemWidth + gap * i - (carouselWidth - itemWidth) / 2;

        wrapper.style.transition = `2s all`;

        wrapper.style.transform = `translateX(${-interval}px)`;
        // wrapper.style.transition = `2s all`;
    };
    setForIndex(currentIndex);

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
                // setForIndex(currentIndex-1);
                console.log('rig');
            }
            else {
                currentIndex++;
                console.log('rig-non');
            }
        }
        else if (startX - endX < 0) {
            
            if (currentIndex === 1) {
                arrayOrders.push(arrayOrders.shift());
                // setForIndex(currentIndex+1);
                console.log('lef');
            }
            else {
                currentIndex--;
                console.log('left-non');
            }
        }
        setParams();

        // document.querySelectorAll('.'+carouselItemClass).forEach((item, i) => {
        //     item.style.order = arrayOrders[i];
        // });
        console.log(currentIndex);
        // console.log(arrayOrders);
        setForIndex(currentIndex);
    });
});