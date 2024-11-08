// config/passport.js
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userModel'); // Asegúrate de que el path sea correcto

module.exports = function(passport) {
    passport.use(new LocalStrategy(
        { usernameField: 'username' },
        async (username, password, done) => {
            try {
                const user = await User.findOne({ username: username });
                if (!user) {
                    return done(null, false, { message: 'No existe el usuario' });
                }

                const isMatch = await user.matchPassword(password);
                if (!isMatch) {
                    return done(null, false, { message: 'Contraseña incorrecta' });
                }

                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
};
