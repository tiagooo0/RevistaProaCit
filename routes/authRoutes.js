const express = require('express');
const router = express.Router();
const passport = require('passport');

// Ruta para el login
router.post('/login', passport.authenticate('local', {
    successRedirect: '/createpost', // Redirige a la página para crear un post
    failureRedirect: '/login',
    failureFlash: true // Asegúrate de haber configurado connect-flash para manejar mensajes de error
}));

module.exports = router;
