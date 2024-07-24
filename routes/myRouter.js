const express = require('express');
const router = express.Router();
const User = require('../models/userModel'); // Asegúrate de que el path sea correcto

const passport = require('passport');
const postController = require('../controllers/myController');

// Mostrar el formulario para crear un nuevo post
router.get('/create', isAuthenticated, postController.createPostForm);
router.get('/', postController.inicio);

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
    successRedirect: '/create', // Redirige al formulario para crear un nuevo post
    failureRedirect: '/login',
    failureFlash: true
}));
// Mostrar el formulario de registro
//router.get('/register', (req, res) => {
  //  res.render('register');
// });

// Manejar el registro
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username, password });
        await user.save();
        res.redirect('/login');
    } catch (err) {
        res.redirect('/register');
    }
});

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
// pagina 404
router.use((req, res) => {
    res.status(404).render('404');
});

module.exports = router;
