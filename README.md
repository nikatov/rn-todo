# App
- Асинхронная загрузка шрифтов
- Иерархия контекстов
- Отображение `MainLayout`
# MainLayout
- Отрисовка `Navbar`
- Отрисовка одного из экранов Screen: `MainScreen` или `TodoScreen`
# Папка screens
- Содержит экраны `MainScreen` и `TodoScreen`
- Экраны принимают параметры из контекстов
# MainScreen
- Отрисовка списка `Todo`
- Функционал добавления и удаления любого `Todo`
# TodoScreen
- Просмотр, редактирование и удаление конкретного `Todo`
# Папка components
- Хранятся компоненты, овтечающие за отрисовку
- Принимают параметры через props'ы
# Папка ui
- Обертки с наборами стилей для отрисовки компонентов
# Папка context
- содержит папки с контекстами `screen` и `todo`
- В каждой папке содержится `Context`, `Reducer`, `State`
# `*Context`
- Создает контекст, который возвращает `state` и `dispatch` для использование в компонентах `screen` через функцию `useContext`
# `*Reducer`
- Обработчик событий, посылаемых через `dispatch`
# `*State`
- Обертка с `Context.Provider` в которую оборачивается все приложение `App`