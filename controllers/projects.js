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

module.exports = {
    projectsHome,
    formProjects
}