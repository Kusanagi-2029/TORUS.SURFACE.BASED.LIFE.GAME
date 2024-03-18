/** 
 * Модуль интерактивных кнопок, которые позволяют выбирать размер ячейки 
 * (canvasCellSize) - элементарного квадрата - для объекта canvasGrid 
 * и обновлять его соответствующим образом при клике на кнопки 
 * */

/**
 * Инициализация интерактивных кнопок для выбора размера ячейки canvasCellSize.
 * @param {Canvas} canvasGrid - Объект canvasGrid, представляющий игровое поле.
 * @param {GameRunner} gameRunner - Объект gameRunner, управляющий выполнением игры.
 */
export function initializeCellSizeButtons(canvasGrid, gameRunner) {
    const cellSizeButtons = document.querySelectorAll('[data-cell-size]');
    cellSizeButtons.forEach((element) => {

        // Получение размера ячейки из атрибута data-cell-size и преобразование его в целое число
        const size = parseInt(element.dataset.cellSize, 10);
        element.addEventListener('click', () => {
            gameRunner.stop();

            // Установка нового размера ячейки (элементарного квадрата) для canvasGrid
            canvasGrid.canvasCellSize = size;
            canvasGrid.update();
        });
    });
}