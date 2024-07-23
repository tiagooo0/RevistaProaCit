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
        const { title, description, categories, imageUrl } = req.body;
        const post = new Post({
            title,
            description,
            date: moment().toDate(),
            categories, // Asegúrate de que esto es un array
            imageUrl, // Nueva URL de la imagen
        });
        await post.save();
        res.redirect('/'); // Redirige a la página de inicio o a donde quieras
    } catch (err) {
        res.status(400).send("Error creando el post");
    }
};

// Mostrar posts por categoría
exports.postsByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        const posts = await Post.find({ categories: category });
        console.log(posts); // Verifica los datos aquí
        res.render('postsByCategory', { posts, category });
    } catch (err) {
        res.status(400).send("Error al obtener los posts");
    }
};
