const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user'); // Asegúrate de que el modelo de usuario esté en la ruta correcta

// Configura la estrategia de autenticación local
passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await User.findOne({ username });
            if (!user) {
                return done(null, false, { message: 'Usuario no encontrado' });
            }

            // Compara la contraseña (asegúrate de que estás usando una función de comparación segura como bcrypt)
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return done(null, false, { message: 'Contraseña incorrecta' });
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

// Serializa el usuario
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserializa el usuario
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});
