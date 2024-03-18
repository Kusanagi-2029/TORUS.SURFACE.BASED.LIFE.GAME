/**
 * Модуль, отвечающий за инициализацию кнопок задержки.
 */

/**
 * Функция инициализации кнопок задержки.
 * @param {GameRunner} gameRunner - Объект запуска игры.
 * @param {Object} delays - Объект задержек.
 */
export function initializeDelayButtons(gameRunner, delays) {
    const delaysArray = delays.reverse();
    delaysArray.forEach((t) => {
        const button = document.createElement('button');
        button.textContent = t.name;
        button.title = t.title;
        button.addEventListener('click', () => {
            gameRunner.delay = t.func;
        });
        document.getElementById('generation-delay').after(button);
    });
}