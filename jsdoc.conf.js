// jsdoc.conf.js
module.exports = {
    /**
     * Источники: все .js и .jsx файлы в папке src
     */
    source: {
        include: ['src'],
        includePattern: '\\.(js|jsx)$', // Обрабатывает .js и .jsx
        excludePattern: '(node_modules/|\\.test\\.(js|jsx)$|\\.stories\\.(js|jsx)$)'
    },

    /**
     * Пути вывода
     */
    opts: {
        destination: 'docs',           // Куда генерировать
        encoding: 'utf8',
        recursive: true,               // Рекурсивно входить в подпапки
        template: 'node_modules/minami', // Минималистичный шаблон
        readme: './README.md',         // Подключить README
        package: './package.json'      // Подключить package.json
    },

    /**
     * Плагины
     */
    plugins: [
        'plugins/markdown',           // Поддержка Markdown в JSDoc
        'node_modules/jsdoc-react-component' // Лучшее отображение React-компонентов
    ],

    /**
     * Настройки шаблонов
     */
    templates: {
        default: {
            outputSourceFiles: true,
            includeDate: false,
            useLongnameInNav: true,
            methodClassMembers: true,
            indexTitle: 'Документация ShopMaster'
        },
        cleverLinks: true,
        monospaceLinks: true,
        theme: 'spacelab'
    },

    /**
     * Поддержка React и JSX
     * (работает с jsdoc-babel)
     */
    babel: {
        presets: [
            ['@babel/preset-env', { targets: { node: '12' } }],
            '@babel/preset-react'  // Для JSX
        ]
    },

    /**
     * Дополнительные настройки
     */
    tags: {
        allowUnknownTags: true
    },
    markdown: {
        idInHeadings: true
    }
};