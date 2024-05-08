window.addEventListener('load', function() {
    const menuItems = document.querySelectorAll('.promo__link');

    menuItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault(); // Предотвращаем стандартное действие ссылки
            // Удаляем класс promo__link-active у всех пунктов меню
            menuItems.forEach(item => item.classList.remove('promo__link-active'));
            // Добавляем класс promo__link-active к текущему пункту меню
            this.classList.add('promo__link-active');
        });
    });
});