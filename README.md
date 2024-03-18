# TORUS.SURFACE.BASED.LIFE.GAME
Игра "Жизнь" с использованием эмуляции поверхности тора

# Начало работы с приложением

- [Начало работы с приложением](#begining)
- [Запуск проекта](#start) 
	- [Демонстрационное видео](#demoVideo)
	- [How-to](#how_to) 
		- [Правила игры](#rules) 
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
 
  **Начало работы с приложением** [begining]
  Приложение встречает пользователя предзаготовленным шаблоном распределения "ЖИЗНЬ" и начинает отрабатывать по правилам Игры "Жизнь" через 1 секунду после полной отрисовки на странице:
  ![image](https://github.com/Kusanagi-2029/TORUS.SURFACE.BASED.LIFE.GAME/assets/71845085/2a614153-e8bd-41b5-a9a7-e530256986f3)

<a name="begining"><h1>Начало работы с приложением</h1></a>
<a name="start"><h2>Запуск проекта</h2></a>

<a name="demo_video"><h2>Демонстрационное видео</h2></a>
<a name="how_to"><h2>How-to</h2></a>
<a name="rules"><h3>Правила игры</h3></a>
<a name="generation_controls_buttons"><h4>Кнопки управления</h4></a>
<a name="input_manual"><h4>Размер поля - Ручной Ввод через Input-Поле</h4></a>
<a name="input_auto_screen"><h4>Размер поля - Авто относительно размера Экрана Браузера</h4></a>

<a name="cell_size_buttons"><h4>Кнопки размеров ячейки Canvas</h4></a>
<a name="metrics"><h4>Метрики</h4></a>
<a name="delays_buttons"><h4>Кнопки Задержки</h4></a>
<a name="presets_buttons"><h4>Кнопки Шаблонов</h4></a>
<a name="techs"><h2>О технической реализации проекта</h2></a>
<a name="git_flow"><h3>Git Flow</h3></a>
<a name="main_stack"><h3>Основной стек</h3></a>
<a name="ram_stability"><h3>[Устойчивость по нагрузке на ОЗУ</h3></a>
<a name="torus_surface"><h3>[Поверхность Тора</h3></a>
<a name="neighbours_def"><h3>Условия определения соседей</h3></a>
<a name="game_stop"><h3>Условия прекращения игры</h3></a>
<a name="patterns"><h3>Паттерны</h3></a>
