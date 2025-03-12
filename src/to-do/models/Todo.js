import {v4 as uuid} from 'uuid';

const colorsToCategory = {
    '#a0c8ff': 'Trabajo',
    '#a8e5a4': 'Personal',
    '#f7919a': 'Urgente',
    '#c6a2f0': 'Creativo',
    '#ffeb99': 'Ocio',
    '#f3b3c1': 'Estudio'
};

export class Todo {
    constructor(category, description) {
        this.id = uuid();
        this.category = colorsToCategory[category];
        this.description = description;
        this.done = false;
    }
}