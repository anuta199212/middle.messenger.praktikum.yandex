[`Sprint_4`](https://github.com/anuta199212/middle.messenger.praktikum.yandex/pull/4) pull request.

# Введение

[`middle.messenger.praktikum.yandex`](https://github.com/anuta199212/middle.messenger.praktikum.yandex) — проект по созданию мессенджера.

## Настройка проекта

1. Скачать репозиторий (git clone [`URL`](https://github.com/anuta199212/middle.messenger.praktikum.yandex))
2. Установить зависимости (`npm install` в директории проекта)

## Запуск и сборка проекта

#### Запуск в режиме разработки

```
npm run dev
```

#### Сборка проекта

```
npm run build
```

#### Запуск проекта

```
npm run start
```

#### Запуск тестов

```
npm run test
```

#### Запуск проверок линтера

```
npm run eslint
```

## Структура проекта

```
static          - статические ресурсы: картинки, иконки, прочее
src\
    api\          - классы API для отпавки запросов на сервер
    components\   - частичные шаблоны (кнопки, инпуты)
    controllers\  - классы контроллеров
    pages\        - шаблоны страниц
    data\         - данные для формирования элементов шаблонов
    hocs\         - классы HOC
    typings\      - типы
    utils\        - экспортируемые для переиспользования классы и функции, базовый класс компонентов
```

## Используемые инструменты

1. Typescript
2. Handlebars
3. Sass
4. Express
5. Stylelint
6. ESLint
7. Webpack
8. Docker

## **Ссылка на макет в Figma**

[Макет](https://www.figma.com/file/BrNECnizIJE0fYCNMVUZPJ/MessageApp?node-id=3%3A481)

## **Ссылка на приложение в heroku**

[Приложение](https://message-app-practicum.herokuapp.com/)
