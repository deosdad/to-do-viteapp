import todoStore from "../../store/todo.store";
import { displayTodos, toDoApp } from "../to-doApp";

export const colorChecked = () => {
    // Seleccionamos todos los checkboxes
    const toggleTodos = document.querySelectorAll("#toggle-todo");

    const todos = todoStore.getTodos(); // Obtener la lista de todos actualizada

    // Iteramos sobre todos los checkboxes y les asignamos el evento
    toggleTodos.forEach(function (toggleTodo) {
        const todoDiv = toggleTodo.closest('#todo'); // Encuentra el contenedor de la tarea correspondiente
        const todoTxt = todoDiv.querySelector("#todo-txt");
        const colorBox = todoDiv.querySelector("#color-box-todo");

        const todoId = toggleTodo.dataset.id;
        const todo = todos.find(t => t.id === todoId); // Buscar el todo correspondiente

        // Al cargar la página, revisamos el estado del checkbox en el store
        if (todo && todo.done) {
            const backgroundColor = window.getComputedStyle(colorBox).backgroundColor;
            const hexColor = rgbToHex(backgroundColor);
            todoTxt.style.textDecoration = `line-through 4px ${hexColor}`;
            toggleTodo.style.color = hexColor;
            toggleTodo.checked = true; // Asegurar que el checkbox esté marcado
        }

        toggleTodo.addEventListener("change", function () {
            // Obtener el color de fondo de color-box-todo (lo calculamos cada vez que cambia el estado del checkbox)
            const backgroundColor = window.getComputedStyle(colorBox).backgroundColor;
            if (this.checked) {
                // Convertir el color RGB a hexadecimal
                const hexColor = rgbToHex(backgroundColor);
                // Subrayar el texto y aplicar el color dinámico del color de fondo
                todoTxt.style.textDecoration = `line-through 4px ${hexColor}`;
                toggleTodo.style.color = hexColor; // Cambiar el color del checkbox
                todoStore.toggleTodo(todoId); // Actualizar en el store
                displayTodos();
            } else {
                // Quitar el subrayado
                todoTxt.style.textDecoration = "none";
                toggleTodo.style.color = ""; // Resetear color del checkbox
                todoStore.toggleTodo(todoId); // Actualizar en el store
                displayTodos();
            }
        });

        
    });

    // Función para convertir RGB a Hex
    function rgbToHex(rgb) {
        const rgbArr = rgb.match(/\d+/g); // Extrae los valores RGB en un array
        return `#${((1 << 24) | (parseInt(rgbArr[0]) << 16) | (parseInt(rgbArr[1]) << 8) | parseInt(rgbArr[2])).toString(16).slice(1).toUpperCase()}`;
    }
};
