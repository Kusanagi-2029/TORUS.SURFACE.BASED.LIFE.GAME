/**
 * Модуль, отвечающий за инициализацию кнопок шаблонов.
 */

/**
 * Функция инициализации кнопок шаблонов.
 * @param {Canvas} canvasGrid - Объект канваса.
 * @param {GameRunner} gameRunner - Объект запуска игры.
 * @param {Object} fillFunctions - Объект функций заполнения.
 */
export function initializePresetsButtons(canvasGrid, gameRunner, fillFunctions) {
    const fillFunctionsArray = fillFunctions.reverse();
    fillFunctionsArray.forEach((preset) => {
        const button = document.createElement('button');
        button.textContent = preset[0];
        button.addEventListener('click', () => {
            gameRunner.stop();
            canvasGrid.reset();
            gameRunner.clearGenerationInfo();
            canvasGrid.fill(preset[1]);
        });
        document.getElementById('btn_draw_life').after(button);

        // Если есть кнопка с таким текстом, то присвоить css-класс hardCalculate
        if (button.textContent.trim() === 'Тяжеловесная Случайность') {
            button.classList.add('hardCalculate');
        }

    });
}