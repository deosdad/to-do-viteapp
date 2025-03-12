import './style.css'
import { toDoApp } from './to-do/to-doApp';

import store from "./store/todo.store";

async function initApp() {
    await store.initStore(); // Asegura que IndexedDB cargue antes de inicializar la app
    const element = document.querySelector('#app');
    toDoApp(element);
}

initApp(); // Ejecuta la función de inicialización
