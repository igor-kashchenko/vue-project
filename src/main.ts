import 'bulma/css/bulma.css';

import { library } from '@fortawesome/fontawesome-svg-core';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { faUser, faPenToSquare, faTrash, faEnvelope } from '@fortawesome/free-solid-svg-icons';

library.add(faUser, faPenToSquare, faTrash, faEnvelope);

import { createApp } from 'vue';
import App from './App.vue';

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app');
