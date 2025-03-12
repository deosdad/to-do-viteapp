import html from './render-form.html?raw';
import { setupEventListeners } from '../../utils/setUpEvents';

export const renderForm = (containerElement) => {
    const app = document.createElement('div');
    app.innerHTML = html;
    containerElement.append(app);


    const elements = {
        colorPicker: document.querySelector("#color-picker"),
        header: document.querySelector('header h1'),
        input: document.querySelector("#todo-input"),
    };

    setupEventListeners(elements);

};
