const {validationResult} = require("express-validator");

const validateFields = (req, res, next) => {
    let namePage;
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
        errors: errors.array()
    })
    next();
}

module.exports = {
    validateFields
}