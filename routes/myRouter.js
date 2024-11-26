const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const passport = require('passport');
const postController = require('../controllers/myController');

// Página principal con imágenes
router.get('/', postController.inicio);

// Mostrar el formulario para crear un nuevo post
router.get('/create', isAuthenticated, postController.createPostForm);

// Manejar la creación de un nuevo post
router.post('/create', isAuthenticated, postController.createPost);

// Mostrar posts por categoría
router.get('/category/:category', postController.postsByCategory);

// Mostrar un post individual
router.get('/post/:id', postController.getPost);

// Mostrar el formulario de login
router.get('/login', (req, res) => {
    res.render('login');
});

// Ruta para el login
router.post('/login', passport.authenticate('local', {
    successRedirect: '/create',
    failureRedirect: '/login',
    failureFlash: true
}));

// Manejar el logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// Middleware para verificar autenticación
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// Página 404
router.use((req, res) => {
    res.status(404).render('404');
});

module.exports = router;
 
