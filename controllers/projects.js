const Projects = require('../models/projects');
const Tasks = require('../models/tasks');

const projectsHome = async (req, res) => {
    const projects = await Projects.findAll();
    res.render('index', {
        namePage: 'Proyectos',
        projects
    })
}

const formProjects = async (req, res) => {
    const projects = await Projects.findAll();
    res.render('new-project', {
        namePage: 'Nuevo Proyecto',
        projects
    })
}

const newProject = async (req, res) => {
    try {
        const {name} = req.body;

        // Insertar en la DB
        await Projects.create({name});

        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
}

const projectByUrl = async (req, res, next) => {
    const {url} = req.params;

    const [projects, project] = await Promise.all([
        Projects.findAll(),
        Projects.findOne({
            where: {
                url
            }
        })
    ])

    if (!project) return next();

    // Consultar Tasks de Project actual
    const tasks =  await Tasks.findAll({
        where: {
            projectId: project.id
        },
        // JOIN
        include: [
            {model: Projects}
        ]
    })

    res.render('tasks', {
        namePage: 'Tareas del Proyecto',
        projects,
        project,
        tasks
    })
}

const formEditProject = async (req, res) => {
    const {id} = req.params;
    const [projects, project] = await Promise.all([
        Projects.findAll(),
        Projects.findOne({
            where: {
                id
            }
        })
    ])
    res.render('new-project', {
        namePage: 'Editar Proyecto',
        projects,
        project
    })
}

const editProject = async (req, res) => {
    try {
        const {name} = req.body;
        const {id} = req.params;

        // Actualizar en la DB
        await Projects.update({name}, {
            where: {
                id
            }
        });

        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
}

const deleteProject = async (req, res, next) => {
    const {url} = req.params;
    const resp = await Projects.destroy({
        where: {
            url
        }
    });

    if (!resp) return next();

    res.send('Proyecto eliminado correctamente')
}

module.exports = {
    projectsHome,
    formProjects,
    newProject,
    projectByUrl,
    formEditProject,
    editProject,
    deleteProject
}