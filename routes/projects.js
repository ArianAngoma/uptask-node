const {validateJWT} = require("../middlewares/validate-jwt");
const {Router} = require('express');
const {check} = require('express-validator');
const {projectsHome, formProjects, newProject, projectByUrl, formEditProject, editProject, deleteProject} = require("../controllers/projects");
const {validateFields} = require('../middlewares/validate-fields');

const router = Router();

router.get('/', [
    validateJWT
],projectsHome);

router.get('/new-project', [
    validateJWT
], formProjects);

router.post('/new-project', [
    validateJWT,
    check('name').trim().notEmpty().withMessage('Nombre requerido').matches(/^[a-z\d\-_\s]+$/i).withMessage('Nombre inválido'),
    validateFields
], newProject);

// Listar proyectos
router.get('/projects/:url', [
    validateJWT
], projectByUrl);

// Actualizar proyecto
router.get('/project/edit/:id', [
    validateJWT
], formEditProject);
router.post('/new-project/:id', [
    validateJWT,
    check('name').trim().notEmpty().withMessage('Nombre requerido').matches(/^[a-z\d\-_\s]+$/i).withMessage('Nombre inválido'),
    validateFields
], editProject);

// Eliminar proyecto
router.delete('/projects/:url', [
    validateJWT
], deleteProject);

module.exports = router;