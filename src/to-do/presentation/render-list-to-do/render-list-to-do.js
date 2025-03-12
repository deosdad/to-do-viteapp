import html from './render-list-to-do.html?raw'

export const renderListTodo = (containerElement) => {
    const app = document.createElement('div');
    app.innerHTML = html;
    containerElement.append(app);   
}