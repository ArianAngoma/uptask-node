const {validationResult} = require("express-validator");
const Projects = require("../models/projects");

const validateFields = async (req, res, next) => {
    let namePage;
    const projects = await Projects.findAll();
    const url = req.url.replace('/', '');
    switch (url) {
        case 'new-project':
            namePage = 'Nuevo Proyecto'
            break;
        default:
            namePage = 'UpTask'
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.render(url, {
        namePage,
        errors: errors.array(),
        projects
    })
    next();
}

module.exports = {
    validateFields
}