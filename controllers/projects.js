const Projects = require('../models/projects')

const projectsHome = (req, res) => {
    res.render('index', {
        namePage: 'Proyectos'
    })
}

const formProjects = (req, res) => {
    res.render('new-project', {
        namePage: 'Nuevo Proyecto'
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

module.exports = {
    projectsHome,
    formProjects,
    newProject
}