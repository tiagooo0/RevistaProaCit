// models/myModel.js
const mongoose = require('mongoose');

// Creación del Schema Post
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Un post debe tener un título"],
    },
    description: {
        type: String,
        required: [true, "Un post debe tener una descripción"],
    },
    date: {
        type: Date,
        required: [true, "Un post debe tener una fecha"],
    },
    categories: {
        type: [String], // Cambiado a un array de strings
        required: [true, "Un post debe tener al menos una categoría"],
    },
});

// Creación del modelo Post y especificación del nombre de la colección
const Post = mongoose.model("Post", postSchema, ); 
module.exports = Post;
