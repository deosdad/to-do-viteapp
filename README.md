# To-Do App

Este proyecto es una aplicación de lista de tareas (To-Do) que permite a los usuarios agregar, editar, eliminar y marcar tareas como completadas. Además, ofrece la posibilidad de categorizar las tareas por colores y filtrarlas según su estado y categoría. El proyecto incluye persistencia mediante IndexedDB, lo que permite guardar las tareas localmente en el navegador para que no se pierdan al recargar la página.

## Tabla de Contenidos
1. [Descripción](#descripción)
2. [Características](#características)
3. [Instalación](#instalación)
4. [Uso](#uso)
5. [Contribuciones](#contribuciones)
6. [Licencia](#licencia)

## Descripción

El objetivo de este proyecto es poner en práctica mis habilidades en JavaScript, HTML/CSS e IndexedDB, además de proporcionar una herramienta simple y eficaz para la gestión de tareas diarias. Permite organizar las tareas en diferentes categorías, asignadas a colores específicos, y filtrar según el estado de la tarea. La persistencia de datos se gestiona a través de IndexedDB, lo que asegura que las tareas se mantengan guardadas incluso después de cerrar o recargar la página.

## Características

- **Añadir tareas**: Permite agregar tareas con un nombre y asignarlas a una categoría específica.
- **Categorías con colores**: Cada categoría tiene un color asociado para una mejor organización:
  - Azul (#a0c8ff): Trabajo
  - Verde (#a8e5a4): Personal
  - Rojo (#f7919a): Urgente
  - Morado (#c6a2f0): Creativo
  - Amarillo (#ffeb99): Ocio
  - Rosa (#f3b3c1): Estudio
- **Editar tareas**: Se pueden modificar los detalles de una tarea existente.
- **Eliminar tareas**: Permite eliminar tareas de la lista.
- **Marcar tareas como completadas**: Se pueden marcar como hechas y visualizarlas separadamente.
- **Filtrar tareas**: Se pueden filtrar por estado (completado, pendiente o todas) y por categoría.
- **Persistencia con IndexedDB**:Las tareas se guardan localmente en el navegador para asegurar que no se pierdan al recargar la página o al cerrar la aplicación.

## Instalación

Para instalar y ejecutar este proyecto, sigue los pasos a continuación:

1. Clona el repositorio en tu máquina local.
2. Accede a la carpeta del proyecto.
3. Ejecuta `npm install` para instalar las dependencias.
4. Ejecuta `npm run dev` para iniciar el servidor de desarrollo.

## Uso

Una vez instalada la aplicación, sigue estos pasos:

1. **Añadir una tarea**: Ingresa el nombre de la tarea y selecciona una categoría.
2. **Editar una tarea**: Modifica cualquier dato de una tarea existente.
3. **Eliminar una tarea**: Borra una tarea que ya no sea necesaria.
4. **Marcar como completada**: Haz clic en una tarea para marcarla como finalizada.
5. **Filtrar tareas**: Usa los filtros para mostrar solo las tareas completadas, pendientes o todas, y por categorías específicas.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas mejorar el proyecto, siéntete libre de hacer un fork del repositorio y enviar un pull request con tus mejoras.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

