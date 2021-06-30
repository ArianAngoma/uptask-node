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

const newProject = (req, res) => {
    const {name} = req.body;

    // Validar si existe errores
    let errors = [];
    if (!name) errors.push({'text': 'Agregar un nombre al proyecto'})
    if (errors.length > 0) res.render('new-project', {
        namePage: 'Nuevo Proyecto',
        errors
    })
}

module.exports = {
    projectsHome,
    formProjects,
    newProject
}