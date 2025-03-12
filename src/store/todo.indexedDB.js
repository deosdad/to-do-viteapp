const dbName = 'To-Do-App';
const version = 1;
const database = {
    db: null
}

/**


const openDB = async () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, version);

        // Crear el almacén de objetos para los "to-dos" con autoIncrement
        request.onupgradeneeded = (e) => { 
            const db = e.target.result;
            // Crear el almacén de objetos, 'keyPath' no es necesario ya que se usará autoIncrement
            const objectStore = db.createObjectStore('to-dos', { autoIncrement: true });
        };

        request.onsuccess = (event) => {
            database.db = event.target.result;
            resolve(database.db);
        };

        request.onerror = () => {
            reject('Error al abrir la base de datos');
        };
    });
};*/
const openDB = async () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, version);

        request.onupgradeneeded = (e) => { 
            const db = e.target.result;

            // Crear el almacén de objetos para los gastos
            const objectStore = db.createObjectStore('to-dos', { keyPath: 'id', autoIncrement: false });
            objectStore.createIndex('category', 'category', { unique: false });
            objectStore.createIndex('description', 'description', { unique: false });
            objectStore.createIndex('done', 'done', { unique: false });
        };

        request.onsuccess = (event) => {
            database.db = event.target.result;
            resolve(database.db);
        };

        request.onerror = () => {
            reject('Error al abrir la base de datos');
        };
    });
}; 

const saveTodoDB = async(todo) => {

    if (!database.db) {
        await openDB();  
    }

    return new Promise((resolve, reject) => {
        const transaction = database.db.transaction('to-dos', 'readwrite');
        const objectStore = transaction.objectStore('to-dos');
        const request = objectStore.add(todo);

        request.onsuccess = () => {
            resolve('To-do agregado correctamente');
        };

        request.onerror = (e) => {
            reject('No se pudo agregar el To-do');
        };
    });
}

const getTodosDB = async () => {

    if (!database.db) {
        await openDB();  
    }

    return new Promise((resolve, reject) => {
        const transaction = database.db.transaction('to-dos', 'readonly');
        const objectStore = transaction.objectStore('to-dos');
        const request = objectStore.getAll();

        request.onsuccess = (e) => {
            resolve(e.target.result);
        };

        request.onerror = (e) => {
            reject('No se pudieron obtener los to-dos');
        };
    });
};

const deleteTodoDB = async(id) => {

    if (!database.db) {
        await openDB();  
    }

    return new Promise((resolve, reject) => {
        const transaction = database.db.transaction('to-dos', 'readwrite');
        const objectStore = transaction.objectStore('to-dos');
        const request = objectStore.delete(id);

        request.onsuccess = () => {
            resolve('To-do eliminado correctamente');
        };

        request.onerror = (e) => {
            reject('No se pudo eliminar el To-do');
        };
    });
}

const updateTodoDB = async(id, datosActualizados) => {

    if (!database.db) {
        await openDB();  
    }
    return new Promise((resolve, reject) => {
        const transaction = database.db.transaction('to-dos', 'readwrite');
        const objectStore = transaction.objectStore('to-dos');
        const request = objectStore.get(id);
        request.onsuccess = (e) => {
            const todo = e.target.result;
            if (todo) {
                
                const updatedGTodo = { ...todo, ...datosActualizados };
                const updateRequest = objectStore.put(updatedGTodo);
                updateRequest.onsuccess = () => resolve('To-do actualizado correctamente');
                updateRequest.onerror = (error) => reject('No se pudo actualizar el to-do');
            } else {
                reject('Gasto no encontrado');
            }
        };

        request.onerror = (e) => {
            reject('Error al obtener el to-do para actualizar');
        };
    }); 
}

export default{
    openDB,
    saveTodoDB,
    getTodosDB,
    deleteTodoDB,
    updateTodoDB
}