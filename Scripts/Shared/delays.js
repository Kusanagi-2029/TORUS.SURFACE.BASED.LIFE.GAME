/**
 * Модуль, содержащий задержки.
 */

/** Массив объектов, содержащих различные методы задержек, которые определяют, как часто выполняется шаг игры. */
export const delays = [
    {
        name: 'Скорость Обновления монитора',
        title: 'Синхронизируется со скоростью обновления Вашего монитора (requestAnimationFrame)',
        func: (func) => {
            const delay = requestAnimationFrame(func);
            return () => cancelAnimationFrame(delay);
        },
    },

    {
        name: 'Задержка в 0.1 c = 100 мс',
        title: 'setTimeout(func, 100)',
        func: (func) => {
            const delay = setTimeout(func, 100);
            return () => clearTimeout(delay);
        },
    },
    {
        name: 'Задержка в 0.5 = 500 мс с',
        title: 'setTimeout(func, 500)',
        func: (func) => {
            const delay = setTimeout(func, 500);
            return () => clearTimeout(delay);
        },
    },
    {
        name: 'Задержка в 1 с = 1000 мс',
        title: 'setTimeout(func, 1000)',
        func: (func) => {
            const delay = setTimeout(func, 1000);
            return () => clearTimeout(delay);
        },
    },
];