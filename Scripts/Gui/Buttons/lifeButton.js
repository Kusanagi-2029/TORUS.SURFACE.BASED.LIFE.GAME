/**
 * Модуль, отвечающий за инициализацию кнопки "ЖИЗНЬ".
 */

/**
 * Функция инициализации кнопки "ЖИЗНЬ".
 * @param {Canvas} canvasGrid - Объект канваса.
 * @param {GameRunner} gameRunner - Объект запуска игры.
 * @param {Function} createLifeMap - Функция создания Map'ы ЖИЗНЬ.
 */
export function initializeLifeButton(canvasGrid, gameRunner, createLifeMap) {
    document.getElementById('btn_draw_life').addEventListener('click', () => {
        gameRunner.stop();
        canvasGrid.reset();
        gameRunner.clearGenerationInfo();
        canvasGrid.fill(createLifeMap);
    });
}