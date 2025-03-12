import html from './render-footer.html?raw'

export const renderFooter = (containerElement) => {
    const app = document.createElement('div');
    app.innerHTML = html;
    containerElement.append(app);   
}