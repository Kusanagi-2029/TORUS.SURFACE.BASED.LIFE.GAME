/**
 * Модуль, отвечающий за инициализацию горячих клавиш.
 */

/**
 * Функция инициализации горячих клавиш.
 */
export function initializeHotkeysHandler() {
    // Создание объекта для хранения привязок горячих клавиш к элементам DOM
    const hotKeys = {};

    // Выбор всех элементов DOM, у которых есть атрибут data-hot-key
    const hotKeyElements = document.querySelectorAll('[data-hot-key]');

    // Итерация по выбранным элементам DOM для горячих клавиш
    hotKeyElements.forEach((element) => {
        // Получение значения атрибута data-hot-key текущего элемента
        const hotKeyAttribute = element.dataset.hotKey;

        // Преобразование значения атрибута горячей клавиши в верхний регистр для всплывающей подсказки
        const hotKeyTooltip = `(${hotKeyAttribute.toUpperCase()})`;

        // Установка всплывающей подсказки для текущего элемента DOM
        element.title = hotKeyTooltip;

        // Приведение значения горячей клавиши к нижнему регистру
        const hotKey = hotKeyAttribute.toLowerCase();

        // Проверка наличия привязки для данной горячей клавиши
        if (hotKey in hotKeys) {
            // В случае конфликта привязок выбрасывается исключение
            throw new Error(`Конфликт привязки горячей клавиши с клавишей ${hotKey}`);
        }

        // Установка привязки между горячей клавишей и текущим элементом DOM
        hotKeys[hotKey] = element;
    });

    // Добавление обработчика события keypress для всего окна
    window.addEventListener('keypress', (event) => {
        // Получение символа, соответствующего нажатой клавише, и преобразование его в нижний регистр
        const pressedKey = event.key.toLowerCase();

        // Поиск соответствующего элемента DOM по горячей клавише в объекте hotKeys
        const hotKeyElement = hotKeys[pressedKey];

        // Если найден элемент DOM для указанной горячей клавиши
        if (hotKeyElement) {
            // Вызов события click для найденного элемента
            hotKeyElement.click();
        }
    });
}