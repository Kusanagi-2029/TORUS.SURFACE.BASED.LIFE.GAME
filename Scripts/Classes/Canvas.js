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
        /** По умолчанию ячейка canvas - элементарный квадрат - равен 1, но лишь в конструкторе - игра начинается с размера ячейки 2 для лучшей оптимизации*/
        this.canvasCellSize = 1;
        /** Цвет фона канвас-поля */
        this.bgColor = '#1c1c1c';
        /** Цвет КЛЕТОК - элементов канвас-поля */
        this.fgColor = 'cyan';
        this.canvas = document.getElementById('grid');
        this.context = this.canvas.getContext('2d');
        this.prev = '';
        this.game = game;
        this.cellSize = 1;

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
        const pw = this.canvas.width;
        const ph = this.canvas.height;
        const w = this.game.width;
        const h = this.game.height;
        this.context.fillStyle = this.bgColor;
        this.context.fillRect(0, 0, pw, ph);

        // Отрисовка внутренних линий
        this.drawInnerLines(w, h);

        // Отрисовка внешних границ
        this.drawOuterLines(w, h);
    }

    /**
     * Отрисовать внутренние линии.
     * @param {number} w - Ширина поля.
     * @param {number} h - Высота поля.
     */
    drawInnerLines(w, h) {
        this.borderStrategies.forEach(strategy => {
            if (this.canvasCellSize >= strategy.step && this.canvasCellSize < strategy.step * 5) {
                strategy.draw(this.context, this.canvasCellSize, w, h, true);
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
            if (this.canvasCellSize >= strategy.step && this.canvasCellSize < strategy.step * 5) {
                strategy.draw(this.context, this.canvasCellSize, w, h, true);
                strategy.draw(this.context, this.canvasCellSize, w, h, false);
            }
        });
    }

    /** 
     * Обновить размеры и отрисовать поле.
     */
    update() {
        let extra = 2;
        this.cellSize = this.canvasCellSize;
        if (this.canvasCellSize > 2) {
            extra = 1;
            this.cellSize = this.canvasCellSize - 1;
        }
        const w = Math.floor((this.width - extra) / this.canvasCellSize);
        const h = Math.floor((this.height - extra) / this.canvasCellSize);
        this.game.width = w;
        this.game.height = h;
        this.game.initialize();
        const pw = w * this.canvasCellSize + extra;
        const ph = h * this.canvasCellSize + extra;
        this.canvas.width = pw;
        this.canvas.height = ph;
        this.context = this.canvas.getContext('2d');
        this.reset();
    }

    /** 
     * Обработать касание для ручной отрисовки.
     * @param {number} x - Позиция по горизонтали.
     * @param {number} y - Позиция по вертикали.
     */
    handleTouch(x, y) {
        const cellX = Math.floor((x - 1 + this.canvas.width) % this.canvas.width / this.canvasCellSize);
        const cellY = Math.floor((y - 1 + this.canvas.height) % this.canvas.height / this.canvasCellSize);
        const hash = `${cellX}:${cellY}`;
        if (hash === this.prevHash) {
            return;
        }
        this.prevHash = hash;
        const cellState = this.game.invertCellState(cellX, cellY);
        this.context.fillStyle = [this.bgColor, 'DeepPink'][cellState]; // Для вводимой пользователем клетки задан цвет DeepPink 
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
        const t1 = performance.now();
        const [w, off, on] = this.game.performStep();
        const t2 = performance.now();
        this.context.fillStyle = this.bgColor;
        for (i = 0; i < off.length; ++i) {
            const t = off[i];
            this.context.fillRect((t % w) * this.canvasCellSize + 1, Math.floor(t / w) * this.canvasCellSize + 1, this.cellSize, this.cellSize);
        }
        this.context.fillStyle = this.fgColor;
        for (i = 0; i < on.length; ++i) {
            const t = on[i];
            this.context.fillRect((t % w) * this.canvasCellSize + 1, Math.floor(t / w) * this.canvasCellSize + 1, this.cellSize, this.cellSize);
        }
        const t3 = performance.now();
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
        this.reset();
        this.context.fillStyle = this.fgColor;
        const presetCells = func(this.game.width, this.game.height);
        presetCells.forEach((v) => {
            if (v.x >= 0 && v.x < this.game.width && v.y >= 0 && v.y < this.game.height) {
                if (this.game.invertCellState(v.x, v.y) !== 1) {
                }
                this.context.fillRect(v.x * this.canvasCellSize + 1, v.y * this.canvasCellSize + 1, this.cellSize, this.cellSize);
            }
        });
    }
}