import { Todo } from "../to-do/models/Todo";
import todoIndexedDB from "./todo.indexedDB";

export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending',
    Work: 'Trabajo',
    Personal: 'Personal',
    Urgent: 'Urgente',
    Creative: 'Creativo',
    Leisure: 'Ocio',
    Study: 'Estudio'
}

const state = {
    todos: [],
    // Filtro de estado (All, Completed, Pending)
    statusFilter: Filters.All,
    // Filtro de categoría (Trabajo, Ocio, etc.)
    categoryFilter: Filters.All
}


const initStore = async() => {

    await todoIndexedDB.openDB();
    await loadStore();
}

const loadStore = async () => {
    try {
        const todosFromDB = await todoIndexedDB.getTodosDB();
        
        if (todosFromDB.length === 0) {
            return; 
        }
    
        todosFromDB.forEach(todo => {
            const{id, category, description, done} = todo;
          
            state.todos.push({ id, category, description, done });
        });

        
    } catch (error) {
        console.error("Error al cargar los todos desde IndexedDB:", error);
    }
};

const addTodo = async(category, description) => {
    if (!category) throw new Error('Categoria no valida');
    if (!description) throw new Error('Descripcion no valida');
    const newTodo = new Todo(category, description);
    state.todos.push(newTodo);
    await todoIndexedDB.saveTodoDB(newTodo);
    
}


const toggleTodo = async(todoId) => {
    const todo = state.todos.find(todo => todo.id === todoId);

    if (todo) {
        todo.done = !todo.done;
        await todoIndexedDB.updateTodoDB(todo.id, { done: todo.done });
    }
};

const deleteTodo = async(todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);
    await todoIndexedDB.deleteTodoDB(todoId);
}

const editTodo = async(todoId, newCategory, newDescription) => {
    if(newCategory === "#a0c8ff"){
        newCategory = 'Trabajo';
    }else if(newCategory === "#a8e5a4"){
        newCategory = 'Personal';
    }else if(newCategory === "#f7919a"){
        newCategory = 'Urgente';
    }else if(newCategory === "#c6a2f0"){
        newCategory = 'Creativo';
    }else if(newCategory === "#ffeb99"){
        newCategory = 'Ocio';
    }else if(newCategory === "#f3b3c1"){
        newCategory = 'Estudio';
    }

    const todoIndex = state.todos.findIndex(todo => todo.id === todoId);
    
    state.todos[todoIndex].category = newCategory;
    state.todos[todoIndex].description = newDescription;

    await todoIndexedDB.updateTodoDB(todoId, {category: newCategory, description: newDescription});
};

const deleteCompleted = async () => {
    const completedTodos = state.todos.filter(todo => todo.done);
    
    state.todos = state.todos.filter(todo => !todo.done);
    
    for (const todo of completedTodos) {
        await todoIndexedDB.deleteTodoDB(todo.id); 
    }
};

const getTodos = (statusFilter = Filters.All, categoryFilter = Filters.All) => {
    
    return state.todos.filter(todo => {
        const statusMatch =
            statusFilter === Filters.All ||
            (statusFilter === Filters.Completed && todo.done) ||
            (statusFilter === Filters.Pending && !todo.done);

        const categoryMatch =
            categoryFilter === Filters.All || todo.category === categoryFilter;

        return statusMatch && categoryMatch;
    });
};

const setFilter = (newStatusFilter = Filters.All, newCategoryFilter = Filters.All) => {
    state.statusFilter = newStatusFilter;
    state.categoryFilter = newCategoryFilter;
};

const getCurrentFilter = () => {
    return {
        statusFilter: state.statusFilter,
        categoryFilter: state.categoryFilter
    };
};

export default {
    initStore,
    loadStore,
    addTodo,
    toggleTodo,
    deleteTodo,
    deleteCompleted,
    setFilter,
    getCurrentFilter,
    getTodos,
    editTodo
}