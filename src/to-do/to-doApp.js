import todoStore, { Filters } from '../store/todo.store';
import html from '../to-do/to-doApp.html?raw'
import { renderFooter } from './presentation/render-footer/render-footer';
import { renderForm } from './presentation/render-form/render-form';
import { renderListTodo } from './presentation/render-list-to-do/render-list-to-do';
import { backgroundColorCategory } from './utils/backgroundColorCategory';
import { renderTodos } from './utils/render-todos';

const ElementsIds = {
    TodoList: '#todos',
    inputTodo: '#todo-input',
    ClearCompleted: '.btnFilter-delete'
}
export const displayTodos = () => {
    const { statusFilter, categoryFilter } = todoStore.getCurrentFilter();
    const todos = todoStore.getTodos(statusFilter, categoryFilter);
    renderTodos(ElementsIds.TodoList, todos);
}
export const toDoApp = (element) => {

    let editingTodoId = null;

    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        element.append(app);

        const containerElement = app.querySelector('.container');

        renderForm(containerElement);
        renderListTodo(containerElement);
        renderFooter(containerElement);

        displayTodos();
    })();


    const todoInput = app.querySelector(ElementsIds.inputTodo);
    const toggleEditOrDelete = document.querySelector(ElementsIds.TodoList);

    todoInput.addEventListener("keydown", (event) => {
        if (event.key !== "Enter") return;
        if (event.target.value.trim().length === 0) return;


        event.preventDefault();
        const category = event.target.parentElement.children[1].value;
        const description = event.target.value;

        if (editingTodoId) {

            const categoryNew = event.target.parentElement.children[1].value;
            todoStore.editTodo(editingTodoId, categoryNew, description);
            editingTodoId = null;
        } else {
            todoStore.addTodo(category, description);
        }
        displayTodos();
        event.target.value = "";
    });

    toggleEditOrDelete.addEventListener("click", (event) => {
        if (event.target.id === 'toggle-delete') {
            todoStore.deleteTodo(event.target.dataset.id);
            displayTodos();
        }
    });

    toggleEditOrDelete.addEventListener("click", (event) => {
        if (event.target.id === 'toggle-edit') {

            const id = event.target.dataset.id;

            const description = event.target.parentElement.parentElement.children[2].textContent;

            const categoryValue = event.target.parentElement.parentElement.children[1].getAttribute('value');

            document.querySelector(ElementsIds.inputTodo).value = description;

            const selector = document.querySelector('#color-picker');
            const options = selector.querySelectorAll('option');

            options.forEach(option => {
                option.removeAttribute('selected');
            });

            options.forEach((option, index) => {
                if (option.value === categoryValue) {
                    option.setAttribute('selected', 'selected');
                    selector.selectedIndex = index;
                }
            });

            const h1 = document.querySelector('header > h1');
            const input = document.querySelector('#todo-input');
            const picker = document.querySelector('#color-picker');

            h1.style.textShadow = `4px 4px 0px ${categoryValue}`;
            input.style.boxShadow = `6px 6px 0px -1px ${categoryValue}`;
            input.style.outlineColor = categoryValue;
            picker.style.backgroundColor = categoryValue;


            editingTodoId = id;
        }
    });

    const btnFilterCategory = document.querySelector('#category');
    const filtersPendingCompleted = document.querySelectorAll('#filters');
    const filterDelete = document.querySelector('.btnFilter-delete');

    filtersPendingCompleted.forEach(element => {

        element.addEventListener('click', (element) => {
            filtersPendingCompleted.forEach(el => el.classList.remove('click'));
            element.target.classList.add('click');
            switch (element.target.value) {
                case 'Completed':
                    todoStore.setFilter(Filters.Completed, todoStore.getCurrentFilter().categoryFilter);
                    break;
                case 'Pending':
                    todoStore.setFilter(Filters.Pending, todoStore.getCurrentFilter().categoryFilter);
                    break;
                case 'all':
                    todoStore.setFilter(Filters.All, todoStore.getCurrentFilter().categoryFilter);
            }

            displayTodos();
        });
    });
    filterDelete.addEventListener('click', (event) => {
        event.target.classList.add('click');
        todoStore.deleteCompleted();
        displayTodos();
        setTimeout(() => {
            event.target.classList.remove('click');
        }, 50);
    });
    btnFilterCategory.addEventListener('change', (event) => {
        const category = event.target.value;
        const color = backgroundColorCategory(category);

        todoStore.setFilter(todoStore.getCurrentFilter().statusFilter, category);
        displayTodos();
        event.target.style.backgroundColor = color;
    });

}