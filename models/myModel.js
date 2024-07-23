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
    imageUrl: {
        type: String,
    },
});

// Creación del modelo Post
const Post = mongoose.model("Post", postSchema, "content.post");

module.exports = Post;
