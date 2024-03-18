import { delays } from '../Shared/delays.js';

/**
 * Класс, представляющий объект GameRunner для управления игрой и отображением информации о поколениях.
 */
export class GameRunner {
    /**
     * Создать экземпляр запуска игры - GameRunner'a.
     * @param {Canvas} canvas - Объект Canvas, представляющий игровое поле.
     * @param {number} newGenerationCreationTime - Время создания нового поколения.
     */
    constructor(canvas, newGenerationCreationTime) {
        this.newGenerationCreationTime = newGenerationCreationTime;
        this.canvas = canvas;
        /** Флаг работы игры */
        this.isRunning = false;
        this.metricsCalcTime = 0;
        this.generationCount = 0;
        this.delay = delays[0].func;
    }

    /**
     * Выполняет один шаг игры и обновляет информацию о поколении.
     * @return {void}
     */
    step() {
        const stepResult = this.canvas.step();
        this.newGenerationCreationTime = stepResult.calcTime;
        this.metricsCalcTime = this.newGenerationCreationTime;
        this.updateGenerationInfo();

        /** Проверка условий остановки игры:
         *  - Игра прекращается, если
         *   - на поле не останется ни одной «живой» клетки;
         *   - конфигурация на очередном шаге в точности (без сдвигов и поворотов) повторит себя же на одном из более ранних шагов (складывается периодическая конфигурация)
         *   - при очередном шаге ни одна из клеток не меняет своего состояния (частный случай предыдущего правила, складывается стабильная конфигурация)
         */
        if (
            stepResult.updated === 0 || // нет изменений
            this.isConfigurationRepeated() || // повторяющаяся конфигурация
            this.isStableConfiguration() // стабильная конфигурация
        ) {
            this.stop();

            /** Вывести надпись о том, на каком поколении завершена автоматическая генерация/игра по правилам:*/
            const stopGameInfoElement = document.getElementById('stop-game-info');
            if (stopGameInfoElement) {
                stopGameInfoElement.textContent = `Игра (автоматическая генерация) завершена по правилам на поколении №: ${this.canvas.game.generationCount}`;
            }

            return;
        }

        /* Метод step() проверяет значение isRunning, прежде чем запланировать следующий шаг, что предотвращает продолжение выполнения игры после её остановки.
        Если игра заупущена, он также вызывает delay, передавая в него функцию обратного вызова this.step(). 
        Этот delay используется для планирования следующего шага игры. */
        if (this.isRunning) {
            this.delay(() => { this.step(); });
        }
    }

    /**
     * Обновляет информацию о текущем поколении на основе значений в canvas.
     * @return {void}
     */
    updateGenerationInfo() {
        const generationInfoElement = document.getElementById('generation-info');
        if (generationInfoElement) {
            generationInfoElement.textContent = `Поколение №: ${this.canvas.game.generationCount}`;
        }

        const generationTableBody = document.getElementById('generation-table-body');
        if (generationTableBody) {
            const newRow = document.createElement('tr');
            const generationNumberCell = document.createElement('td');
            generationNumberCell.textContent = this.canvas.game.generationCount;
            const generationTimeCell = document.createElement('td');
            generationTimeCell.textContent = `${this.metricsCalcTime.toFixed(2)} мс`;

            newRow.appendChild(generationNumberCell);
            newRow.appendChild(generationTimeCell);
            generationTableBody.appendChild(newRow);
        }

        const generationTimeElement = document.getElementById('generation-time');
        if (generationTimeElement) {
            generationTimeElement.innerHTML = `<br> Время генерации нового поколения: ${this.metricsCalcTime.toFixed(2)} мс`;
        }
    }

    /**
     * Очистить информацию о текущем поколении.
     * @return {void}
     */
    clearGenerationInfo() {
        /** Очистка строки "Поколение №:" */
        const generationInfoElementToClear = document.getElementById('generation-info');
        if (generationInfoElementToClear) {
            generationInfoElementToClear.textContent = `Информация о номере поколения...`;
        }

        /** Очистка строки "Время генерации нового поколения" */
        document.getElementById('generation-time').innerHTML = (
            `<br> Временная метрика по генерации нового поколения...`
        );

        /** Очистка значения № поколения по завершению игры после её перезапуска */
        const stopGameInfoElement = document.getElementById('stop-game-info');
        if (stopGameInfoElement) {
            stopGameInfoElement.textContent = `Ожидание запуска игры...`;
        }

        /** Свернуть таблицу */
        const tableContent = document.querySelector('.content');
        tableContent.classList.remove('active'); // удаление класса "Активный" 

        const collapsibleTableButton = document.querySelector('.collapsible');
        collapsibleTableButton.textContent = 'Развернуть таблицу';
        collapsibleTableButton.classList.add('collapsed'); // добавление класса "Свёрнутый"

        /** Свернуть правила*/
        const rulesContent = document.querySelector('.content-rules');
        rulesContent.classList.remove('active'); // удаление класса "Активный" 

        const collapsibleRulesButton = document.querySelector('.collapsible-rules');
        collapsibleRulesButton.textContent = 'Развернуть правила';
        collapsibleRulesButton.classList.add('collapsed');

        /** Очистка таблицы "Поколение - Время генерации" */
        const generationTableBodyToClear = document.getElementById('generation-table-body');
        // Удаление всех строк из tbody
        while (generationTableBodyToClear.firstChild) {
            generationTableBodyToClear.removeChild(generationTableBodyToClear.firstChild);
        }
    }

    /**
     * Проверить, повторяется ли конфигурация на поле.
     * @return {boolean} - true, если конфигурация повторяется, иначе false.
     */
    isConfigurationRepeated() {
        const currentConfiguration = this.canvas.game.cellStates.join(''); // Получить текущую конфигурацию клеток на поле и преобразовать ее в строку
        const previousConfigurations = this.canvas.game.previousConfigurations || []; // Получить массив предыдущих конфигураций из объекта игры в Canvas, если он существует
        const isRepeated = previousConfigurations.includes(currentConfiguration); // Проверить, есть ли текущая конфигурация среди предыдущих конфигураций

        if (!isRepeated) { // Если текущая конфигурация не повторяется
            // Сохранить текущую конфигурацию для будущих сравнений
            previousConfigurations.push(currentConfiguration); // Добавить текущую конфигурацию в массив предыдущих конфигураций
            this.canvas.game.previousConfigurations = previousConfigurations; // Обновить массив предыдущих конфигураций в объекте игры в Canvas
        }

        return isRepeated; // Возвратить результат проверки: true, если текущая конфигурация повторяется, и false, если нет
    }

    /**
     * Проверить, является ли конфигурация стабильной.
     * @return {boolean} - true, если конфигурация стабильна, иначе false.
     */
    isStableConfiguration() {
        const cellStates = this.canvas.game.cellStates; // Получить состояния клеток из объекта игры в Canvas
        return cellStates.every(state => state === 0); // Проверить, все ли клетки пустые (в состоянии 0)
    }

    /**
     * Запустить выполнение игры.
     * @return {void}
     */
    run() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.step();
        }
    }

    /**
     * Останавить выполнение игры.
     * @return {void}
     */
    stop() {
        this.isRunning = false;
    }
}