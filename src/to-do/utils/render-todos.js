import todoStore from "../../store/todo.store";
import { colorChecked } from "./color-checked";
const colorsToCategory = {
    '#a0c8ff': 'Trabajo',
    '#a8e5a4': 'Personal',
    '#f7919a': 'Urgente',
    '#c6a2f0': 'Creativo',
    '#ffeb99': 'Ocio',
    '#f3b3c1': 'Estudio'
};

let element;


export const renderTodos = (elementId, todos = []) => {
    let color;
    if(!element)
         element = document.querySelector(elementId);

    if(!element)
        throw new Error(`Element: ${elementId} no existe`);

    // Limpiar el contenedor antes de agregar los nuevos elementos
    element.innerHTML = "";
   
    todos.forEach(todo => {

        if(todo.category === "Trabajo"){
            color = '#a0c8ff';
        }else if(todo.category === "Personal"){
            color = '#a8e5a4';
        }else if(todo.category === "Urgente"){
            color = '#f7919a';
        }else if(todo.category === "Creativo"){
            color = '#c6a2f0';
        }else if(todo.category === "Ocio"){
            color = '#ffeb99';
        }else if(todo.category === "Estudio"){
            color = '#f3b3c1';
        }

        const div = document.createElement('DIV');
        div.id = "todo"; 
        div.dataset.id = todo.id;

        // Aplicar el color dinámico del todo
        div.innerHTML = `
            <div class="triangulo-derecha-todo"></div>
            <div class="color-category-${todo.id}"id="color-box-todo" value="${color}" style="background-color: ${color};"></div>
            <p class="color-input-${todo.id}"id="todo-txt" style="box-shadow: ${color} 6px 6px 0px -1px;">${todo.description}</p>
            <div id="selectors">
                <input class="color-toggle-${todo.id}"style="box-shadow: ${color} 4px 2px 0px 0px;" id="toggle-todo" title="Marcar como acabado" class="toggle-todo" type="checkbox" data-id="${todo.id}" ${todo.done ? 'checked' : ''}>
                <button class="color-edit-${todo.id}"style="box-shadow: ${color} 4px 2px 0px 0px;" id="toggle-edit" title="Editar To-Do" class="toggle-todo"
                    type="button" data-id="${todo.id}">E</button>
                <button class="color-delete-${todo.id}"style="box-shadow: ${color} 4px 2px 0px 0px;" id="toggle-delete" title="Eliminar To-Do" class="toggle-todo"
                type="button" data-id="${todo.id}">X</button>
            </div>
        `;

        // Añadir el todo renderizado al contenedor
        element.appendChild(div);
    });

    colorChecked();
}
