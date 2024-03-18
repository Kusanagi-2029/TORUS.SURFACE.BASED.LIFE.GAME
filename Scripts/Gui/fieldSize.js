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
        const minValue = parseInt(this.min);
        const maxValue = parseInt(this.max);
        let value = parseInt(this.value);

        if (isNaN(value)) {
            value = minValue;
        } else {
            value = Math.min(Math.max(value, minValue), maxValue);
        }

        this.value = value;
    });

    heightInput.addEventListener('input', function () {
        const minValue = parseInt(this.min);
        const maxValue = parseInt(this.max);
        let value = parseInt(this.value);

        if (isNaN(value)) {
            value = minValue;
        } else {
            value = Math.min(Math.max(value, minValue), maxValue);
        }

        this.value = value;
    });

    // Добавить обработчик события click для кнопки применения размера
    document.getElementById('btn_apply_size').addEventListener('click', () => {
        const newWidth = parseInt(widthInput.value);
        const newHeight = parseInt(heightInput.value);
        gameRunner.stop();
        canvasGrid.width = newWidth;
        canvasGrid.height = newHeight;
        canvasGrid.update();
    });

    // Добавить обработчики события click для кнопок изменения размера поля относительно экрана
    const sizeButtons = document.querySelectorAll('[data-size-x]');
    sizeButtons.forEach((element) => {
        const fx = parseFloat(element.dataset.sizeX);
        const fy = parseFloat(element.dataset.sizeY);
        element.addEventListener('click', () => {
            gameRunner.stop();
            gameRunner.clearGenerationInfo(); // Очистить информацию о поколении.

            canvasGrid.height = window.innerHeight * fy;
            canvasGrid.width = window.innerWidth * fx - 12; // Учтить ширину скролла
            canvasGrid.update();
        });
    });
}