const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [join(__dirname, 'apps/**/src/**/*.{ts,html}'), join(__dirname, 'libs/**/src/**/*.{ts,html}')],
    darkMode: 'class',
};
