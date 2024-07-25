const Post = require('../models/myModel');
const moment = require('moment');

// Mostrar el formulario para crear un nuevo post
exports.createPostForm = (req, res) => {
    res.render('createPost');
};

exports.inicio = (req, res) => {
    res.status(200).render('index');
};

// Manejar la creación de un nuevo post
exports.createPost = async (req, res) => {
    try {
        const { title, description, content, categories, imageUrl, videoUrl } = req.body;
        const post = new Post({
            title,
            description,
            content,
            date: moment().toDate(),
            categories,
            imageUrl,
            videoUrl // Nuevo campo añadido
        });
        await post.save();
        res.redirect('/'); // Redirige a la página de inicio o a donde quieras
    } catch (err) {
        console.error(err);
        res.status(400).send("Error creando el post");
    }
};


// Mostrar posts por categoría
exports.postsByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        const posts = await Post.find({ categories: category });
        res.render('postsByCategory', { posts, category });
    } catch (err) {
        res.status(400).send("Error al obtener los posts");
    }
};

// Mostrar un post individual
exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.render('postDetail', { post });
    } catch (err) {
        res.status(400).send("Error al obtener el post");
    }
};
