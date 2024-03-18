/**
 * Модуль, содержащий вспомогательные функции.
 */

/** 
 * Функция, создающая Map'у для слова "Жизнь".
 * @param {number} w - Ширина области для создания Map'ы.
 * @param {number} h - Высота области для создания Map'ы.
 * @returns {array} - Map'а для слова "Жизнь".
 */
export function createLifeMap(w, h) {
    const cells = [];

    const lifeWordMap = [
        [1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0],
        [0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
        [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1],
    ];

    const cellSize = Math.min(Math.floor(w / 23), Math.floor(h / 5));
    const cellWidth = cellSize * 23;
    const cellHeight = cellSize * 5;
    const cellOffsetX = Math.floor((w - cellWidth) / 2);
    const cellOffsetY = Math.floor((h - cellHeight) / 2);

    for (let y = 0; y < 5; ++y) {
        for (let x = 0; x < 23; ++x) {
            if (lifeWordMap[y][x]) {
                fillCell(cells, cellOffsetX, cellOffsetY, x, y, cellSize);
            }
        }
    }
    return cells;
}

/** 
 * Функция, заполняющая ячейки Map'ы.
 * @param {array} cells - Массив ячеек.
 * @param {number} offsetX - Смещение по оси x.
 * @param {number} offsetY - Смещение по оси y.
 * @param {number} x - Координата x ячейки.
 * @param {number} y - Координата y ячейки.
 * @param {number} cellSize - Размер ячейки.
 */
function fillCell(cells, offsetX, offsetY, x, y, cellSize) {
    const posX = offsetX + x * cellSize;
    const posY = offsetY + y * cellSize;
    for (let j = 0; j < cellSize; ++j) {
        const z = y * cellSize + j;
        const p = Math.pow(((z / cellSize / 5) * 2 - 1), 2) * 0.4 + 0.2;
        for (let i = 0; i < cellSize; ++i) {
            if (Math.random() < p) {
                cells.push({ x: posX + i, y: posY + j });
            }
        }
    }
}

/**
 * Функция, заполняющая Map'у по заданному шаблону.
 * @param {object} params - Параметры заполнения Map'ы.
 * @param {array} mapTemplate - Шаблон Map'ы.
 * @returns {function} - Функция для заполнения Map'ы по заданным размерам.
 */
export function fillMap(params, mapTemplate) {
    return (width, height) => {
        const output = [];
        const mapWidth = mapTemplate[0].length;
        const mapHeight = mapTemplate.length;
        const roomWidth = width - mapWidth;
        const roomHeight = height - mapHeight;
        const squareSize = Math.min(roomWidth, roomHeight);
        const squareCornerX = Math.floor((roomWidth - squareSize) / 2);
        const squareCornerY = Math.floor((roomHeight - squareSize) / 2);
        let offsetX = Math.floor(roomWidth / 2);
        let offsetY = Math.floor(roomHeight / 2);

        adjustOffset(params, squareCornerX, squareCornerY, roomWidth, roomHeight, offsetX, offsetY);

        for (let y = 0; y < mapHeight; ++y) {
            for (let x = 0; x < mapWidth; ++x) {
                if (mapTemplate[y][x]) {
                    output.push({ x: x + offsetX, y: y + offsetY });
                }
            }
        }
        return output;
    };
}

/**
 * Функция, регулирующая смещение Map'ы в зависимости от параметров.
 * @param {object} params - Параметры смещения Map'ы.
 * @param {boolean} useSquareCorner - Используется ли квадратный угол для смещения.
 * @param {number} squareCornerX - Координата x угла квадрата.
 * @param {number} squareCornerY - Координата y угла квадрата.
 * @param {number} roomWidth - Ширина комнаты.
 * @param {number} roomHeight - Высота комнаты.
 * @param {number} offsetX - Смещение по оси x.
 * @param {number} offsetY - Смещение по оси y.
 */
function adjustOffset(params, squareCornerX, squareCornerY, roomWidth, roomHeight, offsetX, offsetY) {
    if (params.top !== undefined) {
        offsetY = params.top;
        if (params.useSquareCorner) {
            offsetY += squareCornerY;
        }
    }
    if (params.bottom !== undefined) {
        offsetY = roomHeight - params.bottom;
        if (params.useSquareCorner) {
            offsetY -= squareCornerY;
        }
    }
    if (params.left !== undefined) {
        offsetX = params.left;
        if (params.useSquareCorner) {
            offsetX += squareCornerX;
        }
    }
    if (params.right !== undefined) {
        offsetX = roomWidth - params.right;
        if (params.useSquareCorner) {
            offsetX -= squareCornerX;
        }
    }
}