import axios from "axios";
import Swal from "sweetalert2";

import {updateAdvance} from '../functions/advance';

// Referencias HTML
const tasks = document.querySelector('.listado-pendientes');

if (tasks) {
    tasks.addEventListener('click', e => {
        if (e.target.classList.contains('fa-check-circle')) {
            const icon = e.target;
            const idTask = icon.parentElement.parentElement.dataset.task;

            const url = `${location.origin}/tasks/${idTask}`;

            axios.patch(url, {idTask}).then(resp => {
                if (resp.status === 200) {
                    icon.classList.toggle('completo');
                    updateAdvance();
                }
            });
        }

        if (e.target.classList.contains('fa-trash')) {
            const taskHTML = e.target.parentElement.parentElement;
            const idTask = taskHTML.dataset.task;
            Swal.fire({
                title: '¿Deseas borrar esta tarea?',
                text: 'Una tarea eliminada no se puede recuperar',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borrar',
                cancelButtonText: 'No, cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    const url = `${location.origin}/tasks/${idTask}`;
                    // Enviar delete por axios
                    axios.delete(url, {params: {idTask}}).then(resp => {
                        if (resp.status === 200) {
                            taskHTML.parentElement.removeChild(taskHTML);

                            Swal.fire(
                                'Tarea Eliminada',
                                resp.data,
                                'success'
                            )
                            updateAdvance();
                        }
                    })
                }
            })
        }
    })
}

export default tasks;