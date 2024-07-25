const express = require('express');
const router = express.Router();
const passport = require('passport');

// Ruta para el login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err); }
        if (!user) { 
            return res.render('login', { error: 'Nombre de usuario o contraseña incorrectos' });
        }
        req.logIn(user, (err) => {
            if (err) { return next(err); }
            return res.redirect('/createpost'); // Redirige a la página para crear un post
        });
    })(req, res, next);
});

// Ruta para mostrar la página de login
router.get('/login', (req, res) => {
    res.render('login'); // Puedes agregar un mensaje de error aquí si es necesario
});

module.exports = router;
