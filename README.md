# TORUS.SURFACE.BASED.LIFE.GAME
Игра "Жизнь" с использованием эмуляции поверхности тора

# Начало работы с приложением

- [Начало работы с приложением](#begining)
  - [Поддержка Мобильных устройств](#mobile_access)
- [Запуск проекта](#start) 
	- [Демонстрационное видео](#demo_video)
	- [How-to](#how_to) 
		- [Правила игры](#rules)
  		- [Горячие клавиши](#hotkeys) 
		- [Кнопки управления](#generation_controls_buttons)
    		- [Размер поля - Ручной Ввод через Input-Поле](#input_manual)
   		- [Размер поля - Авто относительно размера Экрана Браузера](#input_auto_screen)
    		- [Кнопки размеров ячейки Canvas](#cell_size_buttons)
    		- [Метрики](#metrics)
   		- [Кнопки Задержки](#delays_buttons)
    		- [Кнопки Шаблонов](#presets_buttons)
  - [О технической реализации проекта](#techs) 
	  - [Git Flow](#git_flow) 
	  - [Основной стек](#main_stack)
	  - [Устойчивость по нагрузке на ОЗУ](#ram_stability)
    - [Поверхность Тора](#torus_surface)
    - [Условия определения соседей](#neighbours_def)
    - [Условия прекращения игры](#game_stop)
    - [Паттерны](#patterns)
 
<a name="begining"><h1>Начало работы с приложением</h1></a>
  Приложение встречает пользователя предзаготовленным шаблоном распределения "ЖИЗНЬ" и начинает отрабатывать по правилам Игры "Жизнь" через 1 секунду после полной отрисовки на странице:
  ![image](https://github.com/Kusanagi-2029/TORUS.SURFACE.BASED.LIFE.GAME/assets/71845085/2a614153-e8bd-41b5-a9a7-e530256986f3)

> [!Tip]
> 1. Сначала задаются размеры,
> 2. Затем - Выбирается Шаблон,
> 3. Затем кнопка "Пуск"  - запуск игры,
> 4. Выбор скорости отрисовки (генерации) поколения через кнопки "Задержка" - работает как ДО, так и ПОСЛЕ Пуска игры.
> ![image](https://github.com/Kusanagi-2029/TORUS.SURFACE.BASED.LIFE.GAME/assets/71845085/19ae07a7-7cf8-4fe4-b04a-9bc57b8990f0)

> [!NOTE]
> - Клетки из шаблонов и клетки, рождающиеся при генерации помечены цветом CYAN - лазурные.
> - Клетки, которые отрисовывает пользователь - DeepPink - розовые.
> - При размере ячейки Canvas 25х25 (наиболее легковесный) - здесь можно чётко увидеть клетки и посмотреть, что правила для живой/мёртвой клетки работают корректно:
> - На скрине ниже видны отчётливо клетки, по правилам игры, №1 и №2 умрут, №3 сохранит жизнь, №4 родится:
> ![image](https://github.com/Kusanagi-2029/TORUS.SURFACE.BASED.LIFE.GAME/assets/71845085/a3f45ce7-c5de-4c1d-8e3f-80adc8eb36c0)




<a name="mobile_access"><h2>Поддержка Мобильных устройств</h2></a>
Если приложение задеплоить, оно будет работать и с мобильными устройствами - отзывчиво:
![image](https://github.com/Kusanagi-2029/TORUS.SURFACE.BASED.LIFE.GAME/assets/71845085/f95d6541-cac5-4b15-8a2d-ebe2855dcf77)
![image](https://github.com/Kusanagi-2029/TORUS.SURFACE.BASED.LIFE.GAME/assets/71845085/881cf7aa-53b8-430b-8fca-0793d594fba8)

<a name="start"><h2>Запуск проекта</h2></a>
Так как файлов скриптов много, и они разделены на модули, то CORS просто не позволит прогрузить всё через index.html - нужно установить:
1) [VS Code](https://code.visualstudio.com/)
2) [Live Server VS Code Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

<a name="demo_video"><h2>Демонстрационное видео</h2></a>
К сожалению, GitHub не даёт загрузить файлы > 10 МБ, плохое качество, поэтому оно залито на YouTube:

1. Демо большей части функционала:
https://youtu.be/6J9Wy2caaEE

2. Демо работы **размер поля 5000х5000 и размер ячейки Canvas 1х1** и **размер поля 10000х10000 и размер ячейки Canvas 2х2** при одной и той же **Тяжеловесной случайности**:
https://youtu.be/bPMbANaG1VA

<a name="how_to"><h2>How-to</h2></a>
<a name="rules"><h3>Правила игры</h3></a>
В данном проекте логика работы игры "Жизнь" Джона Конвея была реализована на основе данного источника:
1) [Правила игры "Жизнь" № 1](https://ru.wikipedia.org/w/index.php?title=Игра_«Жизнь»&oldid=132904452)
Сами правила:
- Место действия игры — размеченная на клетки плоскость, которая может быть безграничной, ограниченной или замкнутой.
Каждая клетка на этой поверхности имеет восемь соседей, окружающих её, и может находиться в двух состояниях: быть «живой» (заполненной) или «мёртвой» (пустой).
- Распределение живых клеток в начале игры называется первым поколением. 
Каждое следующее поколение рассчитывается на основе предыдущего по таким правилам:
	- в пустой (мёртвой) клетке, с которой соседствуют три живые клетки, зарождается жизнь;
	- если у живой клетки есть две или три живые соседки, то эта клетка продолжает жить; в противном случае (если живых соседей меньше двух или больше трёх) клетка умирает («от одиночества» или «от перенаселённости»).
- Игра прекращается, если
	- на поле не останется ни одной «живой» клетки;
	- конфигурация на очередном шаге в точности (без сдвигов и поворотов) повторит себя же на одном из более ранних шагов (складывается периодическая конфигурация)
	- при очередном шаге ни одна из клеток не меняет своего состояния (частный случай предыдущего правила, складывается стабильная конфигурация)

Игрок не принимает активного участия в игре. Он лишь расставляет или генерирует начальную конфигурацию «живых» клеток, которые затем изменяются согласно правилам. Несмотря на простоту правил, в игре может возникать огромное разнообразие форм.

Пользователь может просмотреть их, нажав на клавишу "И" или ЛКМ на кнопку "Показать/Скрыть правила":
![image](https://github.com/Kusanagi-2029/TORUS.SURFACE.BASED.LIFE.GAME/assets/71845085/5c5c53d2-11ed-4c0d-a0fc-c7b5eab1f69c)
![image](https://github.com/Kusanagi-2029/TORUS.SURFACE.BASED.LIFE.GAME/assets/71845085/b7a228a5-e023-4f2c-bd35-a606a1a110b2)

<a name="hotkeys"><h4>Горячие клавиши</h4></a>
Список горячих клавиш таков:

- Правила:
	- И - Развернуть Правила 
- Управление:
	- Ц - Пуск - Старт Работы игры - нужен для того, чтобы запускать выбранные шаблоны, приложение после остановки, приложение после отрисовки на ЛКМ своих клеток (приложение ставится на Паузу в этот момент)
	- Ы - Стоп (Далее на Пуск можно возобновить автогенерацию, если логика позволяет, или Пошагово).
	- А - Пошагово - Пауза автоматического режима генерации поколений и пошаговая генерация (счётчик времени генерации нового поколения не работает)
	- Ч - Очистить Canvas-поле и свернуть все раскрывающиеся элементы
- Размер Canvas-Поля:
	- П - Применить текущий размер экрана браузера к размеру Canvas-поля
- Размер ячейки Canvas (размерность квадрата, в котором будет отрисовываться клетка):
	- К - 1х1 Наиболее тяжеловесный для отрисовки (плотность максимальная - наибольшее количество точек-клеток)
	- Е - 2х2 (По умолчанию)
	- Н - 5х5
	- Г - 10х10
	- Ш - 25х25 (наиболее легковесный) - здесь можно чётко увидеть клетки и посмотреть, что правила для живой/мёртвой клетки работают корректно
- Метрики: 
	- C - Свернуть/Развернуть Таблицу:
- Шаблон Жизнь:
	- М - Отрисовка Шаблона "Жизнь"
> [!TIP]
> При наведении на некоторые кнопки можно увидеть горячую клавишу (Кириллица):
> ![image](https://github.com/Kusanagi-2029/TORUS.SURFACE.BASED.LIFE.GAME/assets/71845085/8506ecc3-11e5-4611-8711-62c986d677e8)

<a name="generation_controls_buttons"><h4>Кнопки управления</h4></a>
	- Ц - Пуск - Старт Работы игры
	- Ы - Стоп
	- А - Пауза автоматического режима генерации поколений и пошаговая генерация (счётчик времени генерации нового поколения не работает)
	- Ч - Очистить Canvas-поле и свернуть все раскрывающиеся элементы
> [!IMPORTANT]
> - При значениях размера поля **5000х5000 и размере ячейки Canvas 1х1** или **размера поля 10000х10000 и размере ячейки Canvas 2х2** при одной и той же **Тяжеловесной случайности** может быть блокировка интерфейса или ожидание работы браузера, но всё работает (логика игры, запись метрик в таблицу, горячие клавиши, отрисовка своих клеток) - просто генерация поколений может быть от 10 до 50 секунд, но Call Stack всё ещё не будет переполнен в Chromium-основных браузерах!
> - размер поля 10000х10000 и размер ячейки Canvas 2х2:
> ![image](https://github.com/Kusanagi-2029/TORUS.SURFACE.BASED.LIFE.GAME/assets/71845085/62bd3e6f-ae2a-4ea1-9608-24ddb603c16b)
> ![image](https://github.com/Kusanagi-2029/TORUS.SURFACE.BASED.LIFE.GAME/assets/71845085/aed7fbd4-3d31-47ad-b8dd-f92f537825d5)
> - размер поля 5000х5000 и размер ячейки Canvas 1х1:
> ![image](https://github.com/Kusanagi-2029/TORUS.SURFACE.BASED.LIFE.GAME/assets/71845085/91d76b69-c848-4463-ba7f-1021fdd538b2)
> ![image](https://github.com/Kusanagi-2029/TORUS.SURFACE.BASED.LIFE.GAME/assets/71845085/fdaab6ff-e5c1-4116-b9ef-aca279289341)
 
<a name="input_manual"><h4>Размер поля - Ручной Ввод через Input-Поле</h4></a>
Есть 2 способа ввести размер Canvas-поля: 
- через ручной ввод в Input-поля;
- через нажатие на кнопку размера относительно экрана браузера.
 Ручной ввод в Input-поля реализован таким образом, что пользователь может ввести как с клавиатуры, так и через стрелочки в input-полях минимальное значение = 1 максимальное = 10000. Ввести можно только целые положительные цифры.
![image](https://github.com/Kusanagi-2029/TORUS.SURFACE.BASED.LIFE.GAME/assets/71845085/d8052447-93a0-45dc-9b9e-04e40b0e5308)

Нужно ввести значения, а далее нажать кнопку "Применить" или клавишу "П".
> [!IMPORTANT]
> Будет работать отрисовка поля только начиная со значения 2, единица нужна для корректного ввода значений 1 - 10 - 100 - 1111 и т.д.

<a name="input_auto_screen"><h4>Размер поля - Авто относительно размера Экрана Браузера</h4></a>
Выбрать и нажать одну из кнопок:
![image](https://github.com/Kusanagi-2029/TORUS.SURFACE.BASED.LIFE.GAME/assets/71845085/438d2497-943d-4114-b312-328823b211f7)
Далее выбрать доп.параметры, шаблон и нажать кнопку "Пуск".

<a name="cell_size_buttons"><h4>Кнопки размеров ячейки Canvas</h4></a>
- Размер ячейки Canvas (размерность квадрата, в котором будет отрисовываться клетка):
	- К - 1х1 Наиболее тяжеловесный для отрисовки (плотность максимальная - наибольшее количество точек-клеток)
![image](https://github.com/Kusanagi-2029/TORUS.SURFACE.BASED.LIFE.GAME/assets/71845085/4b6ae6f0-5bae-44a8-af26-fa5c2fcd0868)

	- Е - 2х2 (По умолчанию)
![image](https://github.com/Kusanagi-2029/TORUS.SURFACE.BASED.LIFE.GAME/assets/71845085/a5b37a84-0692-48af-8b46-c1bb07b3b41a)
   
	- Н - 5х5
![image](https://github.com/Kusanagi-2029/TORUS.SURFACE.BASED.LIFE.GAME/assets/71845085/556e358e-a7b5-4c61-9ccb-9ded100a35ff)
   
	- Г - 10х10
![image](https://github.com/Kusanagi-2029/TORUS.SURFACE.BASED.LIFE.GAME/assets/71845085/4674317e-d2c5-4074-8a7e-03bf25c51a25)

	- Ш - 25х25 (наиболее легковесный) - здесь можно чётко увидеть клетки и посмотреть, что правила для живой/мёртвой клетки работают корректно
![image](https://github.com/Kusanagi-2029/TORUS.SURFACE.BASED.LIFE.GAME/assets/71845085/0948d200-3312-4c86-9560-84f58d302632)
![image](https://github.com/Kusanagi-2029/TORUS.SURFACE.BASED.LIFE.GAME/assets/71845085/b1634e0a-d344-4e63-b1d4-34c2d92ba8c6)

<a name="metrics"><h4>Метрики</h4></a>
Горячая клавиша:
После Пуска программы происходит:
- подсчёт № поколения,
- время генерации этого нового поколения,
- запись этих метрик в таблицу для наглядности (как в журнал логирования).
- C - Свернуть/Развернуть Таблицу:
![image](https://github.com/Kusanagi-2029/TORUS.SURFACE.BASED.LIFE.GAME/assets/71845085/d57bf36c-69f5-44d8-bcb4-4e408d7e3a32)

Если по логике происходит остановка программы, завершение игры, то пользователь видит, на каком поколении она была завершена:
![image](https://github.com/Kusanagi-2029/TORUS.SURFACE.BASED.LIFE.GAME/assets/71845085/56a4514a-a908-4188-966f-3e6e68102ce3)

<a name="delays_buttons"><h4>Кнопки Задержки</h4></a>
1. Скорость обновления монитора - самый быстрый режим, отключение задержки (начальное состояние скорости).
2. 0.1/0.5/1 сек. - генерация идёт раз в 0.1/0.5/1 сек.

![image](https://github.com/Kusanagi-2029/TORUS.SURFACE.BASED.LIFE.GAME/assets/71845085/1690f3f7-79d7-4b26-9f4e-77018be322b7)

<a name="presets_buttons"><h4>Кнопки Шаблонов</h4></a>

**Шаблоны:**

Отрисовываются в presets.js с генератором случ.чисел xors:
```js
/**
 * Использование генераторов случайных чисел с более высокой производительностью:
 * Вместо использования Math.random() для каждой ячейки можно использовать более быстрый и 
 * менее предсказуемый генератор случайных чисел, такой как Xorshift или Marsaglia xorshift.
 * 
 * Функция-Генератор псевдослучайных чисел с использованием Xorshift
 */
function xorshift(seed) {
    let x = seed; // Инициализация переменной x значением seed

    return () => { // Возврат анонимной функции
        // Применение операций сдвига и побитового исключающего ИЛИ к переменной x
        x ^= x << 13; // Побитовое исключающее ИЛИ с левым сдвигом на 13 битов
        x ^= x >> 17; // Побитовое исключающее ИЛИ с правым сдвигом на 17 битов
        x ^= x << 5; // Побитовое исключающее ИЛИ с левым сдвигом на 5 битов
        // Нормализация числа от 0 до 1 и возврат его значения
        return ((x < 0 ? ~x + 1 : x) % 100) / 100;
    };
}
```

Предзаготовлено 6 шаблонов:
1. Жизнь - по умолчанию запускается при открытии приложения через 1 секунду и может вызваться через горячую клавишу "М".
![image](https://github.com/Kusanagi-2029/TORUS.SURFACE.BASED.LIFE.GAME/assets/71845085/97f17974-d9c0-4857-bf44-e2c22274adaf)

2. Прямоугольная Случайность:
![image](https://github.com/Kusanagi-2029/TORUS.SURFACE.BASED.LIFE.GAME/assets/71845085/0fa9c75a-d733-4608-a7c3-c4dc9b618d18)

3. Тяжеловесная Случайность (максимальное количество клеток-точек):
![image](https://github.com/Kusanagi-2029/TORUS.SURFACE.BASED.LIFE.GAME/assets/71845085/357f5e82-3b68-4fe6-bc10-67603435efd4)

4. Прямоугольная Хаотичная Случайность (каждый новый прямоугольник появляется в хаотичном месте и хаотичного размера):
![image](https://github.com/Kusanagi-2029/TORUS.SURFACE.BASED.LIFE.GAME/assets/71845085/934f6735-27bf-4984-94e7-7ca524a04f4e)

5. Астероид - движется влево и вниз - "падает" - максимально наглядна работа Поверхности Тора:
![image](https://github.com/Kusanagi-2029/TORUS.SURFACE.BASED.LIFE.GAME/assets/71845085/c00fdcf4-1d67-4aa1-bc69-34b9afd7b854)
![image](https://github.com/Kusanagi-2029/TORUS.SURFACE.BASED.LIFE.GAME/assets/71845085/2bf8e2c3-71f4-406e-84ad-0399afa79770)
![image](https://github.com/Kusanagi-2029/TORUS.SURFACE.BASED.LIFE.GAME/assets/71845085/2c8a0878-2154-4d3d-91fd-4678f085427e)

6. Ракета (Обратный Астероид) - "летит" вправо и вверх:
![image](https://github.com/Kusanagi-2029/TORUS.SURFACE.BASED.LIFE.GAME/assets/71845085/ba9c115e-b949-407e-b2d0-e4d5e5f18de9)

<a name="techs"><h2>О технической реализации проекта</h2></a>

<a name="git_flow"><h3>Git Flow</h3></a>
В проекте реализован git flow - develop-ветка - рабочая, main - основная, разделение типов коммитов на feature|fix|и т.д.

<a name="main_stack"><h3>Основной стек</h3></a>
1. Код написан исключительно на чистых JS (EcmaScript 8, 2017), HTML5, CSS3.
2. Код подробно задокументирован, в т.ч. при помощи __JSDoc__.
Пример задокументированного кода:
```js
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
```

<a name="ram_stability"><h3>Устойчивость по нагрузке на ОЗУ</h3></a>
Выдерживает по ОЗУ "Тяжеловесную Случайность"(максимальное число элементов) сложность canvas-поля в 10000 х 10000 при 2х2 или 5000 х 5000 при 1х1
Если ПРИ больших ПОЛЯХ возникает бага с позиционированием при ручном задании жизни клеток - ОТСКРОЛЛЬТЕ МАКСИМАЛЬНО НАВЕРХ И МАКСИМАЛЬНО ВЛЕВО - важно, что задавать клетки вручную нужно исключительно, если canvas-поле ПОЛНОСТЬЮ вмещается в область экрана!

> - При значениях размера поля **5000х5000 и размере ячейки Canvas 1х1** или **размера поля 10000х10000 и размере ячейки Canvas 2х2** при одной и той же **Тяжеловесной случайности** может быть блокировка интерфейса или ожидание работы браузера, но всё работает (логика игры, запись метрик в таблицу, горячие клавиши, отрисовка своих клеток) - просто генерация поколений может быть от 10 до 50 секунд, но Call Stack всё ещё не будет переполнен в Chromium-основных браузерах!
> - размер поля 10000х10000 и размер ячейки Canvas 2х2:
> ![image](https://github.com/Kusanagi-2029/TORUS.SURFACE.BASED.LIFE.GAME/assets/71845085/62bd3e6f-ae2a-4ea1-9608-24ddb603c16b)
> ![image](https://github.com/Kusanagi-2029/TORUS.SURFACE.BASED.LIFE.GAME/assets/71845085/aed7fbd4-3d31-47ad-b8dd-f92f537825d5)
> - размер поля 5000х5000 и размер ячейки Canvas 1х1:
> ![image](https://github.com/Kusanagi-2029/TORUS.SURFACE.BASED.LIFE.GAME/assets/71845085/91d76b69-c848-4463-ba7f-1021fdd538b2)
> ![image](https://github.com/Kusanagi-2029/TORUS.SURFACE.BASED.LIFE.GAME/assets/71845085/fdaab6ff-e5c1-4116-b9ef-aca279289341)

<a name="torus_surface"><h3>[Поверхность Тора</h3></a>
Реализация поверхности Тора содержится в методе invertCellState класса `LifeGame`. Этот метод обрабатывает инверсию состояния клетки по заданным координатам, учитывая граничные условия, характерные для Поверхности Тора.
```javascript
    /** 
     * Реализация ПОВЕРХНОСТИ ТОРА
     * Инверсия состояния клетки по заданным координатам.
     * @param {number} x - Координата по оси X.
     * @param {number} y - Координата по оси Y.
     * @returns {number} - Новое состояние клетки (0 или 1).
     */
    invertCellState(x, y) {
        // Проверяем, выходят ли координаты клетки за границы поля по оси X или Y
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            // Если выходят, то производим "оборачивание" координат на противоположную сторону поля,
            // чтобы реализовать поверхность Тора
            x = (x + this.width) % this.width;
            y = (y + this.height) % this.height;
        }
        // Вычисляем индекс клетки в одномерном массиве, представляющем игровое поле
        const cellIndex = x + this.width * y;
        // Получаем текущее состояние клетки (0 или 1)
        const currentState = this.cellStates[cellIndex];
        // Инвертируем состояние клетки: если текущее состояние 1, делаем 0, и наоборот
        const newState = currentState ? 0 : 1;
        // Обновляем состояние клетки на игровом поле
        this.updateCellState(cellIndex, newState, newState === 0 ? -1 : 1);
        // Возвращаем новое состояние клетки
        return newState;
    }
```
В этом методе, если координаты клетки выходят за границы поля по оси X или Y, то они "оборачиваются" на противоположную сторону поля. Например, если x равно -1, то клетка воспринимается как находящаяся на крайней правой позиции поля, а если x равно this.width, то клетка воспринимается как находящаяся на крайней левой позиции поля, и аналогично для координаты y. Таким образом, реализуется поверхность Тора для игрового поля.

<a name="neighbours_def"><h3>Условия определения соседей (дополненик к Поверхности Тора)</h3></a>
Определение соседей клеток по Поверхности Тора реализовано в методе computeNeighbors() класса `LifeGame`:
```javascript
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
```

<a name="game_stop"><h3>Условия прекращения игры</h3></a>
Реализовано в классе GameRunner:
```javascript
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
```

<a name="patterns"><h3>Паттерны</h3></a>
1. Код разбит на модули - Паттерн "Модуль":
> [!TIP]
> Паттерн "Модуль" (Module pattern) в программировании - это шаблон проектирования, который позволяет организовать код в модули, делая его более структурированным и модульным. Этот паттерн используется для создания пространства имен и инкапсуляции кода, чтобы избежать конфликтов имён и ненужных глобальных переменных.

Например, код класса `LifeGame`:
```js
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
```
Данный код демонстрирует реализацию паттерна "Модуль" в JavaScript:

1. **Пространство имен**: Класс `LifeGame` служит модулем, который инкапсулирует логику игры "Жизнь". Он объединяет все методы и переменные, относящиеся к этой игре, внутри себя.

2. **Инкапсуляция**: Внутри класса `LifeGame` объявлены свойства, которые используются для хранения состояния игры, а также методы, которые управляют этим состоянием. Доступ к этим данным и методам осуществляется только через интерфейс класса, что обеспечивает их инкапсуляцию.

3. **Публичный интерфейс**: Класс `LifeGame` экспортируется из модуля, что позволяет другим частям приложения использовать его. Публичный интерфейс класса включает в себя конструктор, методы `reset()`, `initialize()`, `performStep()` и другие, которые могут вызываться извне модуля.

4. **Приватные поля и методы**: В этой реализации нет явного использования приватных полей и методов. Однако, переменные, объявленные в конструкторе класса, могут считаться приватными, так как они не являются доступными извне класса напрямую.

Таким образом, класс `LifeGame` в данном коде представляет собой модуль, который реализует логику игры "Жизнь" и следует принципам паттерна "Модуль".

2. в Canvas.js:
> [!TIP]
> Применён Паттерн Стратегия (Strategy)
> Паттерн Стратегия позволяет определить семейство алгоритмов, инкапсулировать каждый из них и сделать их взаимозаменяемыми. Он позволяет стратегии быть независимыми от клиентов, которые их используют. В данном случае, класс BorderDrawStrategy является реализацией этого паттерна. Он инкапсулирует логику отрисовки границ клеток на канвасе в зависимости от выбранной стратегии.

Код класса `BorderDrawStrategy`:
```js
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
```
Класс `BorderDrawStrategy` представляет различные стратегии отрисовки границ клеток на канвасе. Эти стратегии инкапсулируются в отдельные объекты и могут быть подменены во время выполнения программы.

Примеры стратегий включают в себя рисование границ с разными цветами, шагами и толщинами.

Класс `Canvas` использует эти стратегии для отрисовки внутренних и внешних границ клеток на канвасе. При этом он не зависит от конкретной реализации отрисовки границ, так как вместо этого использует интерфейс стратегий, предоставляемый классом `BorderDrawStrategy`.

Таким образом, применение класса `BorderDrawStrategy` для реализации различных стратегий отрисовки границ подтверждает использование паттерна Стратегия.
