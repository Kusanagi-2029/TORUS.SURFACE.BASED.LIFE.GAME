/**
 * Класс, представляющий стратегию отрисовки границ клеток на канвасе.
 */
class BorderDrawStrategy {
    /**
     * Создать экземпляр стратегии отрисовки границ.
     * @param {string} color - Цвет границ.
     * @param {number} step - Шаг отрисовки границ.
     * @param {number} thickness - Толщина границ.
     */
    constructor(color, step, thickness) {
        this.color = color;
        this.step = step;
        this.thickness = thickness;
    }

    /**
     * Отрисовать границы клеток.
     * @param {CanvasRenderingContext2D} context - Контекст канваса.
     * @param {number} size - Размер клетки.
     * @param {number} width - Ширина поля.
     * @param {number} height - Высота поля.
     * @param {boolean} isVertical - Флаг вертикальной ориентации.
     */
    draw(context, size, width, height, isVertical) {
        context.fillStyle = this.color;
        const max = isVertical ? width : height;
        for (let i = 0; i < max; ++i) {
            if (i % this.step === 0) {
                const xPos = isVertical ? i : 0;
                const yPos = isVertical ? 0 : i;
                const lineWidth = isVertical ? this.thickness : size * width;
                const lineHeight = isVertical ? size * height : this.thickness;
                context.fillRect(xPos * size, yPos * size, lineWidth, lineHeight);
            }
        }
    }
}

/**
 * Класс для отрисовки канвас-графики.
 */
export class Canvas {
    /**
     * Создать экземпляр канваса.
     * @param {LifeGame} game - Игровое поле.
     */
    constructor(game) {
        this.width = 100;
        this.height = 100;
        /** По умолчанию ячейка canvas - элементарный квадрат - равен 1х1, но лишь в конструкторе - игра начинается с размера ячейки 2х2 для лучшей производительности*/
        this.canvasCellSize = 1;
        /** Цвет фона канвас-поля */
        this.bgColor = '#1c1c1c';
        /** Цвет КЛЕТОК - элементов канвас-поля */
        this.fgColor = 'cyan';
        this.canvas = document.getElementById('grid'); // Получаем элемент канваса из DOM
        this.context = this.canvas.getContext('2d'); // Получаем контекст рисования на канвасе
        this.prev = ''; // Предыдущее состояние
        this.game = game; // Игровое поле
        this.cellSize = 1; // Размер клетки для отрисовки

        // Создаем контекст канваса и стратегии отрисовки границ
        this.context = this.createContext();
        this.borderStrategies = [
            new BorderDrawStrategy('Indigo', 5, 1),
            new BorderDrawStrategy('blue', 10, 2),
            new BorderDrawStrategy('red', 25, 4)
        ];
    }

    /**
     * Создать контекст канваса.
     * @returns {CanvasRenderingContext2D} Контекст канваса.
     */
    createContext() {
        return this.canvas.getContext('2d');
    }

    /** 
     * Сбросить канвас.
     */
    reset() {
        // Сброс игры
        this.game.reset();

        // Получаем текущие размеры канваса
        const pw = this.canvas.width;
        const ph = this.canvas.height;

        // Получаем размеры поля
        const w = this.game.width;
        const h = this.game.height;

        // Заполняем канвас цветом фона
        this.context.fillStyle = this.bgColor;
        this.context.fillRect(0, 0, pw, ph);

        // Отрисовываем внутренние линии
        this.drawInnerLines(w, h);

        // Отрисовываем внешние границы
        this.drawOuterLines(w, h);
    }

    /**
     * Отрисовать внутренние линии.
     * @param {number} w - Ширина поля.
     * @param {number} h - Высота поля.
     */
    drawInnerLines(w, h) {
        this.borderStrategies.forEach(strategy => {
            // Проверяем, подходит ли размер ячейки канваса для текущей стратегии
            if (this.canvasCellSize >= strategy.step && this.canvasCellSize < strategy.step * 5) {
                // Вызываем метод отрисовки границ для вертикальной ориентации
                strategy.draw(this.context, this.canvasCellSize, w, h, true);
                // Вызываем метод отрисовки границ для горизонтальной ориентации
                strategy.draw(this.context, this.canvasCellSize, w, h, false);
            }
        });
    }

    /**
     * Отрисовать внешние границы.
     * @param {number} w - Ширина поля.
     * @param {number} h - Высота поля.
     */
    drawOuterLines(w, h) {
        this.borderStrategies.forEach(strategy => {
            // Проверяем, подходит ли размер ячейки канваса для текущей стратегии
            if (this.canvasCellSize >= strategy.step && this.canvasCellSize < strategy.step * 5) {
                // Вызываем метод отрисовки границ для вертикальной ориентации
                strategy.draw(this.context, this.canvasCellSize, w, h, true);
                // Вызываем метод отрисовки границ для горизонтальной ориентации
                strategy.draw(this.context, this.canvasCellSize, w, h, false);
            }
        });
    }

    /** 
     * Обновить размеры и отрисовать поле.
     */
    update() {
        // Инициализация переменной для дополнительного пространства
        let extra = 2;

        // Устанавливаем размер клетки для рисования на канвасе
        this.cellSize = this.canvasCellSize;

        // Если размер клетки больше 2, устанавливаем дополнительное пространство в 1 пиксель
        if (this.canvasCellSize > 2) {
            extra = 1;
            this.cellSize = this.canvasCellSize - 1;
        }

        // Рассчитываем новую ширину и высоту поля на основе размера ячейки
        const w = Math.floor((this.width - extra) / this.canvasCellSize);
        const h = Math.floor((this.height - extra) / this.canvasCellSize);

        // Устанавливаем новые размеры игрового поля
        this.game.width = w;
        this.game.height = h;

        // Инициализируем игру с новыми размерами
        this.game.initialize();

        // Рассчитываем новые размеры канваса с учетом размеров поля и клетки
        const pw = w * this.canvasCellSize + extra;
        const ph = h * this.canvasCellSize + extra;

        // Устанавливаем новые размеры канваса
        this.canvas.width = pw;
        this.canvas.height = ph;

        // Получаем контекст канваса
        this.context = this.canvas.getContext('2d');

        // Сбрасываем канвас и отрисовываем поле заново
        this.reset();
    }

    /** 
     * Обработать касание для ручной отрисовки.
     * @param {number} x - Позиция по горизонтали.
     * @param {number} y - Позиция по вертикали.
     */
    handleTouch(x, y) {
        // Вычисляем индекс клетки на основе позиции касания
        const cellX = Math.floor((x - 1 + this.canvas.width) % this.canvas.width / this.canvasCellSize);
        const cellY = Math.floor((y - 1 + this.canvas.height) % this.canvas.height / this.canvasCellSize);

        // Создаем уникальный хэш для клетки
        const hash = `${cellX}:${cellY}`;

        // Проверяем, изменилось ли состояние клетки, иначе игнорируем событие
        if (hash === this.prevHash) {
            return;
        }

        // Запоминаем новое состояние клетки
        this.prevHash = hash;

        // Инвертируем состояние клетки в игре и получаем его текущее состояние
        const cellState = this.game.invertCellState(cellX, cellY);

        // Устанавливаем цвет для клетки в зависимости от ее состояния
        this.context.fillStyle = [this.bgColor, 'DeepPink'][cellState]; // Красим клетку в DeepPink, если она включена пользователем
        // Отрисовываем клетку на канвасе
        this.context.fillRect(cellX * this.canvasCellSize + 1, cellY * this.canvasCellSize + 1, this.cellSize, this.cellSize);
    }

    /** 
      * Сбросить предыдущую отметку.
     */
    handleTouchReset() {
        this.prev = '';
    }

    /** 
     * Выполняет один шаг генерации нового поколения игры "Жизнь".
     * Отвечает за обновление состояния клеток на канвасе после одного шага игры.
     * @returns {Object} Объект с информацией о генерации:
     *                   - updated: количество обновленных клеток;
     *                   - calcTime: время, затраченное на вычисление нового поколения;
     *                   - drawTime: время, затраченное на отрисовку обновленных клеток.
     */
    step() {
        let i;
        // Замеряем время начала выполнения шага
        const t1 = performance.now();

        // Выполняем шаг игры и получаем результаты: новое состояние поля, клетки, которые д.б. убиты и оживлены
        const [w, off, on] = this.game.performStep();

        // Замеряем время окончания выполнения шага
        const t2 = performance.now();

        // Устанавливаем цвет фона для выключенных клеток и отрисовываем их на канвасе
        this.context.fillStyle = this.bgColor;
        for (i = 0; i < off.length; ++i) {
            const t = off[i];
            this.context.fillRect((t % w) * this.canvasCellSize + 1, Math.floor(t / w) * this.canvasCellSize + 1, this.cellSize, this.cellSize);
        }

        // Устанавливаем цвет для включенных клеток и отрисовываем их на канвасе
        this.context.fillStyle = this.fgColor;
        for (i = 0; i < on.length; ++i) {
            const t = on[i];
            this.context.fillRect((t % w) * this.canvasCellSize + 1, Math.floor(t / w) * this.canvasCellSize + 1, this.cellSize, this.cellSize);
        }

        // Замеряем время окончания отрисовки
        const t3 = performance.now();

        // Возвращаем информацию о выполненном шаге: количество обновленных клеток и временные затраты на вычисление и отрисовку
        return {
            updated: off.length + on.length,
            calcTime: t2 - t1,
            drawTime: t3 - t2,
        };
    }

    /** 
     * Заполняет клетки на канвасе в соответствии с заданной функцией.
     * @param {function} func - Функция, возвращающая координаты клеток для заполнения.
     */
    fill(func) {
        // Сбрасываем канвас перед заполнением
        this.reset();

        // Устанавливаем цвет для заполнения клеток
        this.context.fillStyle = this.fgColor;

        // Получаем координаты клеток для заполнения из заданной функции
        const presetCells = func(this.game.width, this.game.height);

        // Перебираем координаты клеток и отрисовываем их на канвасе
        presetCells.forEach((v) => {
            // Проверяем, что координаты находятся в пределах игрового поля
            if (v.x >= 0 && v.x < this.game.width && v.y >= 0 && v.y < this.game.height) {
                // Инвертируем состояние клетки в игре и проверяем, что она д.б. включена
                if (this.game.invertCellState(v.x, v.y) === 1) {
                    // Отрисовываем клетку на канвасе
                    this.context.fillRect(v.x * this.canvasCellSize + 1, v.y * this.canvasCellSize + 1, this.cellSize, this.cellSize);
                }
            }
        });
    }
}