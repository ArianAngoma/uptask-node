import Swal from "sweetalert2";
import axios from "axios";

// Referencias HTML
const btnDelete = document.querySelector('#eliminar-proyecto');

if (btnDelete) {
    btnDelete.addEventListener('click', (e) => {
        const urlProject = e.target.dataset.projectUrl;
        Swal.fire({
            title: '¿Deseas borrar este proyecto?',
            text: 'Un proyecto eliminado no se puede recuperar',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar',
            cancelButtonText: 'No, cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Enviar petición a axios
                const url = `${location.origin}/projects/${urlProject}`;
                axios.delete(url, {params: {urlProject}})
                    .then(resp => {
                        Swal.fire(
                            'Proyecto eliminado',
                            resp.data,
                            'success'
                        ).then(() => {
                            window.location.href = '/';
                        });
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Hubo un error',
                            text: 'No se pudo eliminar el proyecto'
                        }).then(() => {
                            window.location.href = '/';
                        });
                    })
            }
        })
    })
}

export default btnDelete;

