const express = require('express');
const router = express.Router();
const home = require('../controllers/home');
const login = require('../controllers/login');

//login
router.get('/login',login.login);
router.post('/logiar',login.logiar);
router.get('/registro',login.registro);
router.post('/registrar',login.registrar);
router.get('/logout',login.logout)

//home
router.get('/',home.home);

//nav
router.get('/perfil',home.perfil);
router.get('/editar_perfil/:dato',home.editar_perfil);

//editar perfil
router.post('/updateName/:id',home.updateName);
router.post('/updateEmail/:id',home.updateEmail);
router.post('/updatePhone/:id',home.updatePhone);

module.exports = router;