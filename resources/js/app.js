import { App, plugin } from '@inertiajs/inertia-vue'
import Vue from 'vue'

Vue.use(plugin)

import Layout from "./Layout/Layout";

new Vue({
    render: h => h(App, {
        props: {
            initialPage: JSON.parse(app.dataset.page),
            resolveComponent: (name) => {
                const module = require(`./Pages/${name}`);
                if (!module.default.layout) {
                    module.default.layout = Layout
                }
                return module.default
            }
        },
    }),
}).$mount('#app');
