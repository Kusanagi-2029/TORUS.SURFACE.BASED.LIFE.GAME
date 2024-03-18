/**
 * Модуль, отвечающий за инициализацию событий мыши.
 */

/**
 * Функция инициализации событий мыши.
 * @param {Canvas} canvasGrid - Объект канваса.
 * @param {GameRunner} gameRunner - Объект запуска игры.
 */
export function initializeMouseEventsHandler(canvasGrid, gameRunner) {
    const grid = document.getElementById('grid');

    // Отследить событие mousedown на элементе grid
    grid.addEventListener('mousedown', (e) => {
        // Останавить игру
        gameRunner.stop();

        // Получить позицию касания мыши относительно верхнего левого угла канваса
        const rect = grid.getBoundingClientRect(); // Получить прямоугольник канваса
        const offsetX = e.pageX - window.scrollX - rect.left; // Получить координату X с учетом скролла
        const offsetY = e.pageY - window.scrollY - rect.top; // Получить координату Y с учетом скролла

        // Вызвать метод handleTouch() объекта canvasGrid для обработки касания
        canvasGrid.handleTouch(offsetX, offsetY, false);
    });

    // Отследить событие mouseup на элементе grid
    grid.addEventListener('mouseup', () => {
        // Сбросить предыдущее касание
        canvasGrid.handleTouchReset();
    });

    // Отследить событие mousemove на элементе grid
    grid.addEventListener('mousemove', (e) => {
        // Проверить, нажата ли левая кнопка мыши
        if (e.buttons > 0) {
            // Останавить игру
            gameRunner.stop();

            // Получить позицию касания мыши относительно верхнего левого угла канваса
            const rect = grid.getBoundingClientRect(); // Получить прямоугольник канваса
            const offsetX = e.pageX - window.scrollX - rect.left; // Получить координату X с учетом скролла
            const offsetY = e.pageY - window.scrollY - rect.top; // Получить координату Y с учетом скролла

            // Вызвать метод handleTouch() объекта canvasGrid для обработки нажатия на клетку ЛКМ/Касанием на телефоне
            canvasGrid.handleTouch(offsetX, offsetY, true);
        }
    });
}