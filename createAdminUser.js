const mongoose = require('mongoose');
const User = require('./models/userModel');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost/tuBaseDeDatos', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
/*
const createAdmin = async () => {
    try {
        const username = 'admin';
        const password = 'adminpassword'; // Cambia esto por la contraseña que quieras

        // Verifica si el usuario ya existe
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log('El usuario ya existe.');
            mongoose.connection.close();
            return;
        }
*/

        // Crea el nuevo usuario
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            password: hashedPassword
        });

        await user.save();
        console.log('Usuario administrador creado.');
    } catch (err) {
        console.error('Error al crear el usuario administrador:', err);
    } finally {
        mongoose.connection.close();
    }
};

createAdmin();
