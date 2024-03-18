/** 
 * Класс, представляющий игру "Жизнь".
 * Осуществляет управление игровым полем, обновление состояния клеток и выполнение шага игры.
 * Содержит основную логику игры "Жизнь" Джона Конвея. 
 */
export class LifeGame {
    /**
     * Создать экземпляр игры "Жизнь".
     * @param {number} newGenerationCreationTime - Время создания нового поколения.
     */
    constructor(newGenerationCreationTime) {
        // Параметры игры
        this.newGenerationCreationTime = newGenerationCreationTime;

        // Размеры игрового поля
        this.width = undefined;
        this.height = undefined;

        // Массивы для хранения состояния клеток и счетчиков соседей
        this.cellStates = undefined;
        this.neighborCounts = undefined;

        // Массив соседей для каждой клетки
        this.neighbors = undefined;

        // Объект для хранения кандидатов на изменение состояния клеток
        this.stateChangeCandidates = undefined;

        // Счетчик поколений
        this.generationCount = 0;

        // Размер видимой области поля по умолчанию
        this.defaultVisibleWidth = 100;
        this.defaultVisibleHeight = 100;
    }

    /** 
     * Сброс состояния игры до начального.
     */
    reset() {
        // Заполнить массивы состояния клеток и счетчиков соседей нулями
        this.cellStates.fill(0);
        this.neighborCounts.fill(0);
        // Сбросить объект кандидатов на изменение состояния клеток
        this.stateChangeCandidates = {};
        // Сбросить счетчик поколений
        this.generationCount = 0;
    }

    /** 
     * Инициализация игрового поля и соседей для клеток.
     */
    initialize() {
        // Вычислить общее количество клеток на игровом поле
        const square = this.width * this.height;
        // Создать массивы для хранения состояния клеток и счетчиков соседей
        this.cellStates = new Uint8Array(square);
        this.neighborCounts = new Uint8Array(square);
        this.neighbors = Array(square);

        // Вычислить соседей для каждой клетки на игровом поле
        for (let y = 0; y < this.height; ++y) {
            for (let x = 0; x < this.width; ++x) {
                // Вызвать метод computeNeighbors для вычисления соседей клетки с координатами (x, y)
                this.neighbors[x + this.width * y] = this.computeNeighbors(x, y);
            }
        }

        // Сбросить состояние игры
        this.reset();
    }

    /** 
     * Вычисление соседей для клетки с заданными координатами.
     * @param {number} x - Координата по оси X.
     * @param {number} y - Координата по оси Y.
     * @returns {Array} - Массив с индексами соседних клеток.
     */
    computeNeighbors(x, y) {
        const neighborsAround = [];
        // Пройти по соседям клетки с координатами (x, y)
        for (let b = -1; b <= 1; ++b) {
            for (let a = -1; a <= 1; ++a) {
                if (a !== 0 || b !== 0) { // Исключить текущую клетку из списка соседей
                    // Вычислить координаты соседней клетки с учетом поверхности Тора
                    const nx = (x + a + this.width) % this.width;
                    const ny = (y + b + this.height) % this.height;
                    // Вычислить индекс соседней клетки и добавить его в массив
                    neighborsAround.push(nx + this.width * ny);
                }
            }
        }
        // Вернуть массив с индексами соседних клеток
        return neighborsAround;
    }

    /** 
     * Обновление состояния клетки по заданным индексу, значению и изменению счетчика соседей.
     * @param {number} i - Индекс клетки.
     * @param {number} newState - Новое значение состояния клетки (0 или 1).
     * @param {number} neighborDelta - Изменение счетчика соседей (-1 или 1).
     */
    updateCellState(i, newState, neighborDelta) {
        let neighborIndex;
        this.cellStates[i] = newState;
        this.stateChangeCandidates[i] = undefined;

        // Увеличить или уменьшить счетчик соседей для текущей клетки и соседних клеток
        const neighborIndices = this.neighbors[i];
        if (neighborIndices) {
            for (let j = 0; j < neighborIndices.length; ++j) {
                neighborIndex = neighborIndices[j];
                this.neighborCounts[neighborIndex] += neighborDelta;
                this.stateChangeCandidates[neighborIndex] = undefined;
            }
        }
    }

    /** 
     * Реализация ПОВЕРХНОСТИ ТОРА
     * Инверсия состояния клетки по заданным координатам.
     * @param {number} x - Координата по оси X.
     * @param {number} y - Координата по оси Y.
     * @returns {number} - Новое состояние клетки (0 или 1).
     */
    invertCellState(x, y) {
        // Проверить, выходят ли координаты клетки за границы поля по оси X или Y
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            // Если выходят, то производим "оборачивание" координат на противоположную сторону поля,
            // чтобы реализовать поверхность Тора
            x = (x + this.width) % this.width;
            y = (y + this.height) % this.height;
        }
        // Вычислить индекс клетки в одномерном массиве, представляющем игровое поле
        const cellIndex = x + this.width * y;
        // Получить текущее состояние клетки (0 или 1)
        const currentState = this.cellStates[cellIndex];
        // Инвертировать состояние клетки: если текущее состояние 1, сделать 0, и наоборот
        const newState = currentState ? 0 : 1;
        // Обновить состояние клетки на игровом поле
        this.updateCellState(cellIndex, newState, newState === 0 ? -1 : 1);
        // Возвратить новое состояние клетки
        return newState;
    }


    /** 
     * Выполнение одного шага игры.
     * @returns {Array} - Массив с информацией о шаге игры: [ширина поля, клетки, которые нужно убить, клетки, которые нужно оживить].
     */
    performStep() {
        this.generationCount++;

        /** Клетки, которые нужно убить */
        const cellsToKill = Object.keys(this.stateChangeCandidates).filter(k => {
            const currentState = this.cellStates[k];
            const neighborCount = this.neighborCounts[k];
            return currentState && (neighborCount < 2 || neighborCount > 3);
        });

        /** Клетки, которые нужно оживить */
        const cellsToRevive = Object.keys(this.stateChangeCandidates).filter(k => {
            const currentState = this.cellStates[k];
            const neighborCount = this.neighborCounts[k];
            return !currentState && neighborCount === 3;
        });

        cellsToKill.forEach(cellIndex => this.updateCellState(cellIndex, 0, -1)); // Обновить состояние клеток, которые нужно убить
        cellsToRevive.forEach(cellIndex => this.updateCellState(cellIndex, 1, 1)); // Обновить состояние клеток, которые нужно оживить

        return [this.width, cellsToKill, cellsToRevive];
    }
}