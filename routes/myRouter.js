const express = require('express');
const router = express.Router();
const postController = require('../controllers/myController.js');

router.route('/').get(postController.inicio);

// Formulario para crear un nuevo post
router.get('/create', postController.createPostForm);

// Manejar la creación de un nuevo post
router.post('/create', postController.createPost);

// Mostrar posts por categoría
router.get('/category/:category', postController.postsByCategory);

// Mostrar un post individual
router.get('/post/:id', postController.getPost);

module.exports = router;
