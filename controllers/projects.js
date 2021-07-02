const Projects = require('../models/projects');

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

    res.render('tasks', {
        namePage: 'Tareas del Proyecto',
        projects,
        project
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

module.exports = {
    projectsHome,
    formProjects,
    newProject,
    projectByUrl,
    formEditProject,
    editProject
}