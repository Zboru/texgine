const {createVuePlugin} = require('vite-plugin-vue2');
import path from 'path'
import PurgeIcons from 'vite-plugin-purge-icons'

module.exports = {
    server: {
        port: 3000
    },
    plugins: [
        createVuePlugin(),
        PurgeIcons()
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '/src'),
        },
    }
};
