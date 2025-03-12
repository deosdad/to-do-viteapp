export function updateColors(color, elements) {
    const { header, colorPicker, input } = elements;

    if (header) header.style.textShadow = `4px 4px 0px ${color}`;
    if (colorPicker) colorPicker.style.backgroundColor = color;
    if (input) input.style.boxShadow = `6px 6px 0px -1px ${color}`;
    if (input) input.style.outlineColor = color;
}
