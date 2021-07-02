const {Router} = require('express');
const {check} = require('express-validator');
const {projectsHome, formProjects, newProject, projectByUrl, formEditProject, editProject} = require("../controllers/projects");
const {validateFields} = require('../middlewares/validate-fields');

const router = Router();

router.get('/', projectsHome);

router.get('/new-project', formProjects);

router.post('/new-project', [
    check('name').trim().notEmpty().withMessage('Nombre requerido').matches(/^[a-z\d\-_\s]+$/i).withMessage('Nombre inválido'),
    validateFields
], newProject);

// Listar proyectos
router.get('/projects/:url', projectByUrl);

// Actualizar proyecto
router.get('/project/edit/:id', formEditProject);
router.post('/new-project/:id', [
    check('name').trim().notEmpty().withMessage('Nombre requerido').matches(/^[a-z\d\-_\s]+$/i).withMessage('Nombre inválido'),
    validateFields
], editProject);

module.exports = router;