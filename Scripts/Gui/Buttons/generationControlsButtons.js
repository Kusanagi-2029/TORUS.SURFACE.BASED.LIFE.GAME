/**
 * Модуль, отвечающий за инициализацию элементов управления поколениями.
 */

/**
 * Функция инициализации Кнопок для управления этапами генерации игры "Жизнь".
 * @param {Canvas} canvasGrid - Объект канваса.
 * @param {GameRunner} gameRunner - Объект запуска игры.
 */
export function initializeGenerationControlsButtons(canvasGrid, gameRunner) {

    document.getElementById('btn_start').addEventListener('click', () => {
        gameRunner.run();

        /** Очистка значения № поколения по завершению игры после её перезапуска */
        const stopGameInfoElement = document.getElementById('stop-game-info');
        if (stopGameInfoElement) {
            stopGameInfoElement.textContent = `Ожидание завершения игры...`;
        }
    });
    document.getElementById('btn_stop').addEventListener('click', () => {
        gameRunner.stop();
        /** Очистка значения № поколения по завершению игры после её перезапуска */
        const stopGameInfoElement = document.getElementById('stop-game-info');
        if (stopGameInfoElement) {
            stopGameInfoElement.textContent = `Игра приостановлена вручную`;
        }
    });
    document.getElementById('btn_step').addEventListener('click', () => { gameRunner.stop(); gameRunner.updateGenerationInfo(); canvasGrid.step(); });
    // document.getElementById('btn_clear').addEventListener('click', () => { gameRunner.stop(); canvasGrid.reset(); });
    document.getElementById('btn_clear').addEventListener('click', () => {
        gameRunner.stop(); // Остановка игры / генерации
        canvasGrid.reset(); // Сброс состояния Canvas
        gameRunner.clearGenerationInfo(); // Очистка информации о поколении.
    });
}