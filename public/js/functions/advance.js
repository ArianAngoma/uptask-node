import Swal from 'sweetalert2';

export const updateAdvance = () => {
    // Seleccionar las tareas existentes
    const tasks = document.querySelectorAll('li.task');

    if (tasks.length) {
        // Seleccionar las tareas completadas
        const tasksComplete = document.querySelectorAll('i.completo');

        // Calcular el avance
        const advance = Math.round((tasksComplete.length / tasks.length) * 100);

        // Mostrar el avance
        const percentage = document.querySelector('#porcentaje');
        percentage.style.width = advance + '%';

        if (advance === 100) {
            Swal.fire(
                'Completaste el Proyecto',
                'Felicidades, has terminado tus tareas',
                'success'
            )
        }
    }
}