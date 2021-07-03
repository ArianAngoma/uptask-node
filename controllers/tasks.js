const Tasks = require('../models/tasks');
const Projects = require('../models/projects');

const addTask = async (req, res, next) => {
    const {url} = req.params;
    const {task} = req.body;

    console.log(task);

    // Obtener proyecto
    const {id} = await Projects.findOne({
        where: {
            url
        }
    })

    // Insertar en la base de datos
    const resp = await Tasks.create({name: task, projectId: id})
    if (!resp) return next();

    res.redirect(`/projects/${url}`);
}

const changeStateTask = async (req, res, next) => {
    const {id} = req.params;
    const task = await Tasks.findOne({
        where: {
            id
        }
    });

    // Cambiar state
    (task.state === 0) ? task.state = 1 : task.state = 0;
    const resp = await task.save();

    if (!resp) return next();

    res.send('Actualizado');
}

module.exports = {
    addTask,
    changeStateTask
}