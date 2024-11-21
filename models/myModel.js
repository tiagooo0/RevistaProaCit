const mongoose = require('mongoose');

// Creación del Schema para los comentarios
const commentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Un comentario debe tener un autor"]
    },
    content: {
        type: String,
        required: [true, "El comentario debe tener contenido"]
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Creación del Schema Post
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Un post debe tener un título"]
    },
    description: {
        type: String,
        required: [true, "Un post debe tener una descripción"]
    },
    content: {
        type: String,
        required: [true, "Un post debe tener un contenido"]
    },
    date: {
        type: Date,
        default: Date.now
    },
    categories: {
        type: [String],
        required: [true, "Un post debe tener al menos una categoría"]
    },
    imageUrl: {
        type: String,
        required: false
    },
    videoUrl: {
        type: String,
        required: false
    },
    comments: [commentSchema] // Relación con los comentarios
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
