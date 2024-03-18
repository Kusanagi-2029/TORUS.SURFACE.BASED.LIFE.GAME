/**
 * Главный файл приложения, инициализирующий все компоненты игры.
 */
// Классы
import { Canvas } from './Classes/Canvas.js';
import { GameRunner } from './Classes/GameRunner.js';
import { LifeGame } from './Classes/LifeGame.js';

// Общие доп.файлы
import { delays } from './Shared/delays.js';
import { fillFunctions } from './Shared/presets.js';
import { createLifeMap } from './Shared/mapFunctions.js';

// GUI - отрисовка, работа с Canvas'ом
import { initializeGUI } from './Gui/gui.js';
import { initializeFieldSize } from './Gui/fieldSize.js';

// Обработчики пользовательских действий
import { initializeHotkeysHandler } from './Gui/UiHandlers/hotkeysHandler.js';
import { initializeMouseEventsHandler } from './Gui/UiHandlers/mouseEventsHandler.js';

// Кнопки
import { initializeLifeButton } from './Gui/Buttons/lifeButton.js';
import { initializeDelayButtons } from './Gui/Buttons/delayButtons.js';
import { initializePresetsButtons } from './Gui/Buttons/presetsButtons.js';
import { initializeCellSizeButtons } from './Gui/Buttons/cellSizeButtons.js';
import { initializeGenerationControlsButtons } from './Gui/Buttons/generationControlsButtons.js';

// Ожидание загрузки документа
document.addEventListener('DOMContentLoaded', () => {

    /** Глобальная переменная для хранения времени создания нового поколения */
    const newGenerationCreationTime = 0;

    /** Создание экземпляра Canvas, представляющего игровое поле */
    let canvasGrid = new Canvas(new LifeGame(newGenerationCreationTime));

    /** Создание экземпляра GameRunner, управляющего выполнением игры */
    let gameRunner = new GameRunner(canvasGrid, newGenerationCreationTime);

    // Инициализация всех компонентов игры
    initializeGUI(canvasGrid, gameRunner, createLifeMap);
    initializeFieldSize(canvasGrid, gameRunner);

    initializeHotkeysHandler();
    initializeMouseEventsHandler(canvasGrid, gameRunner);

    initializeLifeButton(canvasGrid, gameRunner, createLifeMap);
    initializeDelayButtons(gameRunner, delays);
    initializePresetsButtons(canvasGrid, gameRunner, fillFunctions);
    initializeCellSizeButtons(canvasGrid, gameRunner);
    initializeGenerationControlsButtons(canvasGrid, gameRunner);
});