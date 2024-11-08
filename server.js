const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv');

// Carga de variables de entorno
dotenv.config({ path: './config.env' });

// Configuración de la base de datos
const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

// Conexión a MongoDB
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to database');
})
.catch(err => {
    console.error('Error connecting to database:', err);
});

// Configuración del puerto
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port} correctamente`);
});
