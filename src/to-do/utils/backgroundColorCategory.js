

export const backgroundColorCategory = (category) => {
    const categoryColors = {
        'all': '#f5f5f5',
        'Trabajo': '#a0c8ff',
        'Personal': '#a8e5a4',
        'Urgente': '#f7919a',
        'Creativo': '#c6a2f0',
        'Ocio': '#ffeb99',
        'Estudio': '#f3b3c1'
    };

    return categoryColors[category] || '#f5f5f5';
};