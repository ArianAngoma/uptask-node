const {Router} = require('express');
const {check} = require('express-validator');
const {projectsHome, formProjects, newProject} = require("../controllers/projects");
const {validateFields} = require('../middlewares/validate-fields');

const router = Router();

router.get('/', projectsHome);

router.get('/new-project', formProjects);

router.post('/new-project', [
    check('name').not().isEmpty().withMessage('Nombre requerido').trim().escape().withMessage('Nombre inválido'),
    validateFields
], newProject);

module.exports = router;