/**
 * Модуль, отвечающий за инициализацию размера поля.
 */

/**
 * Инициализирует размер поля.
 * @param {Canvas} canvasGrid - Объект канваса.
 * @param {GameRunner} gameRunner - Объект запуска игры.
 */
export function initializeFieldSize(canvasGrid, gameRunner) {
    // Получить ссылки на поля ввода ширины и высоты
    const widthInput = document.getElementById('field-width');
    const heightInput = document.getElementById('field-height');

    /**
     * Обновляет размеры полей ввода ширины и высоты в соответствии с размерами окна.
     */
    function updateWindowSize() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        widthInput.value = windowWidth;
        heightInput.value = windowHeight;
    }

    // Инициализация размеров полей ввода
    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);

    // Добавить обработчики события input для полей ввода ширины и высоты
    widthInput.addEventListener('input', function () {
        // Получаем минимальное и максимальное значение для поля ввода ширины
        const minValue = parseInt(this.min);
        const maxValue = parseInt(this.max);
        let value = parseInt(this.value);

        // Проверяем, является ли введенное значение числом
        if (isNaN(value)) {
            // Если введенное значение не является числом, устанавливаем минимальное значение
            value = minValue;
        } else {
            // Если введенное значение является числом, ограничиваем его диапазон значений
            value = Math.min(Math.max(value, minValue), maxValue);
        }

        // Устанавливаем значение поля ввода в диапазоне от минимального до максимального значения
        this.value = value;
    });

    heightInput.addEventListener('input', function () {
        // Получаем минимальное и максимальное значение для поля ввода высоты
        const minValue = parseInt(this.min);
        const maxValue = parseInt(this.max);
        let value = parseInt(this.value);

        // Проверяем, является ли введенное значение числом
        if (isNaN(value)) {
            // Если введенное значение не является числом, устанавливаем минимальное значение
            value = minValue;
        } else {
            // Если введенное значение является числом, ограничиваем его диапазон значений
            value = Math.min(Math.max(value, minValue), maxValue);
        }

        // Устанавливаем значение поля ввода в диапазоне от минимального до максимального значения
        this.value = value;
    });

    // Добавить обработчик события click для кнопки применения размера
    document.getElementById('btn_apply_size').addEventListener('click', () => {
        // Получаем новые значения ширины и высоты поля из полей ввода
        const newWidth = parseInt(widthInput.value);
        const newHeight = parseInt(heightInput.value);

        // Останавливаем игровой процесс
        gameRunner.stop();

        // Устанавливаем новые размеры поля
        canvasGrid.width = newWidth;
        canvasGrid.height = newHeight;

        // Обновляем отображение поля на канвасе
        canvasGrid.update();
    });

    // Добавить обработчики события click для кнопок изменения размера поля относительно экрана
    const sizeButtons = document.querySelectorAll('[data-size-x]');
    sizeButtons.forEach((element) => {
        const fx = parseFloat(element.dataset.sizeX);
        const fy = parseFloat(element.dataset.sizeY);
        element.addEventListener('click', () => {
            // Останавливаем игровой процесс
            gameRunner.stop();
            // Очищаем информацию о поколении
            gameRunner.clearGenerationInfo();

            // Устанавливаем новые размеры поля относительно размеров окна браузера
            canvasGrid.height = window.innerHeight * fy;
            canvasGrid.width = window.innerWidth * fx - 12; // Учитываем ширину скролла
            // Обновляем отображение поля на канвасе
            canvasGrid.update();
        });
    });
}