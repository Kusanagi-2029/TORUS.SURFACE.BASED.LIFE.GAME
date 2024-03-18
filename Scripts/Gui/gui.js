/**
 * Модуль, отвечающий за инициализацию интерфейса пользователя.
 */

/**
 * Функция инициализации интерфейса пользователя.
 * @param {Canvas} canvasGrid - Объект канваса.
 * @param {GameRunner} gameRunner - Объект запуска игры.
 * @param {Function} createLifeMap - Функция создания Map'ы жизни.
 */
export function initializeGUI(canvasGrid, gameRunner, createLifeMap) {

    // Задать размеры канваса
    canvasGrid.height = window.innerHeight * 0.5;
    canvasGrid.width = window.innerWidth * 0.75;
    canvasGrid.canvasCellSize = 2;
    canvasGrid.update();
    canvasGrid.fill(createLifeMap);

    // Добавить обработчик события для кнопки сворачивания/разворачивания таблицы
    const collapsibleTableButton = document.querySelector('.collapsible');
    const tableContent = document.querySelector('.content');
    collapsibleTableButton.addEventListener('click', () => {
        tableContent.classList.toggle('active');
        if (tableContent.classList.contains('active')) {
            collapsibleTableButton.textContent = 'Свернуть таблицу';
            collapsibleTableButton.classList.remove('collapsed');
        } else {
            collapsibleTableButton.textContent = 'Развернуть таблицу';
            collapsibleTableButton.classList.add('collapsed');
        }
    });

    // Добавить обработчик события для кнопки сворачивания/разворачивания таблицы
    const collapsibleRulesButton = document.querySelector('.collapsible-rules');
    const rulesContent = document.querySelector('.content-rules');
    collapsibleRulesButton.addEventListener('click', () => {
        rulesContent.classList.toggle('active');
        if (rulesContent.classList.contains('active')) {
            collapsibleRulesButton.textContent = 'Свернуть правила';
            collapsibleRulesButton.classList.remove('collapsed');
        } else {
            collapsibleRulesButton.textContent = 'Развернуть правила';
            collapsibleRulesButton.classList.add('collapsed');
        }
    });

    /** Самовызывающаяся Функция-Задержка в 1 секунду для отображения с начала игры */
    (function delayedRun() {
        const delay = setTimeout(() => {
            gameRunner.run();
        }, 1000);
        return () => clearTimeout(delay);
    })();
}