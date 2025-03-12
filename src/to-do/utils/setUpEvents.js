import { updateColors } from './updateColors.js';

export function setupEventListeners(elements) {
    const { colorPicker, input } = elements;
    let selectedColor = colorPicker.value;

    updateColors(selectedColor, elements);

    colorPicker.addEventListener("change", function () {
        selectedColor = this.value;
        updateColors(selectedColor, elements);
    });

    
}
