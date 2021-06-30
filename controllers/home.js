const home = (req, res) => {
    res.render('index', {
        namePage: 'Proyectos'
    })
}

module.exports = {
    home
}