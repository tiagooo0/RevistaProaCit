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
    content: {
        type: String,
        required: [true, "Un post debe tener un contenido"],
    },
    date: {
        type: Date,
        default: Date.now,
    },
    categories: {
        type: [String],
        required: [true, "Un post debe tener al menos una categoría"],
    },
    imageUrl: {
        type: String,
        required: [true, "Un post debe tener una imagen"],
    },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
