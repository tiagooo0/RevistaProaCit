const Post = require('../models/myModel');
const moment = require('moment');

// Arreglo de imágenes para mostrar en index.ejs
const images = [
    { filename: 'imagen28.jpeg', name: 'Axel Ramirez', text: 'Valiente, Generoso, Divertido ' },
    { filename: 'imagen19.jpeg', name: 'Bianca Diaz', text: 'Interesante, Divertida, Alegre' },
    { filename: 'imagen17.jpeg', name: 'Camila Gonzales', text: 'Sincera, Amigable, Simpatica' },
    { filename: 'imagen7.jpeg', name: 'Cristian Tello', text: 'Gracioso, Hablador, Valiente' },
    { filename: 'imagen15.jpeg', name: 'Dante Espinoza', text: 'Feliz, Divertido, Gracioso' },
    { filename: 'imagen29.jpeg', name: 'Emanuel Isa', text: 'Optimista, Honesto, Amable' },
    { filename: 'imagen12.jpeg', name: 'Franco Racca', text: 'Bizarro, Feliz, Gracioso' },
    { filename: 'imagen11.jpeg', name: 'Hernan Torres', text: 'Distrido, Gracioso, Sinvergüenza' },
    { filename: 'imagen22.jpeg', name: 'Ingrid Sension', text: 'Alegre, Proactiva, Graciosa' },
    { filename: 'imagen21.jpeg', name: 'Julian Cabrera', text: 'Carismatico, Responsable, Compañero' },
    { filename: 'imagen13.jpeg', name: 'Leandro Rios', text: 'Amigable, Timido, Gran Programador' },
    { filename: 'imagen10.jpeg', name: 'Lorenzo Gallardo', text: 'Sociable, Responsable, Colaborativo' },
    { filename: 'imagen9.jpeg', name: 'Lucas Tuninetti', text: 'Honesto, Inspirador, Analitico' },
    { filename: 'imagen1.jpeg', name: 'Luciana Silber', text: 'Profesora, Liderazgo, Energia' },
    { filename: 'imagen18.jpeg', name: 'Martina Nievas', text: 'Creativa, Sociable, Determinada' },
    { filename: 'imagen3.jpeg', name: 'Mayra Rodriguez', text: 'Creativa, Responsable, Positiva' },
    { filename: 'imagen20.jpeg', name: 'Milagros Colman', text: 'Compañera, Graciosa, Mandona' },
    { filename: 'imagen6.jpeg', name: 'Santiago Avalo', text: 'Comico, Feliz, Humilde' },
    { filename: 'imagen4.jpeg', name: 'Santino Giambartolomei', text: 'Empatico, Trabajador, Disiplinado' },
    { filename: 'imagen14.jpeg', name: 'Santino Heredia', text: 'Solidario, Audaz, Tenaz' },
    { filename: 'imagen5.jpeg', name: 'Thiago Caballerro', text: 'Valiente, Enfocado, Soñador' },
    { filename: 'imagen27.jpeg', name: 'Thiago Jofre', text: 'Empatico, Trabajador, Disciplinado' },
    { filename: 'imagen8.jpeg', name: 'Thiago Sartore', text: 'Timido, Humilde, Tranquilo' },
    { filename: 'imagen2.jpeg', name: 'Tiago Hürst', text: 'Empatico, Trabajador, Inteligente' },
    { filename: 'imagen30.jpeg', name: 'Tomas Williams', text: 'Sincero, Resiliente, Capaz' }
];


// Función para formatear texto con URLs
function formatUrls(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, (url) => {
        return `<a href="${url}" target="_blank">${url}</a>`;
    });
}

// Controlador para la página de inicio
exports.inicio = (req, res) => {
    // Formatear las URLs en el texto de las imágenes
    const formattedImages = images.map(image => {
        image.text = formatUrls(image.text);
        return image;
    });

    res.status(200).render('index', { images: formattedImages });
};

// Mostrar el formulario para crear un nuevo post
exports.createPostForm = (req, res) => {
    res.render('createPost');
};

// Manejar la creación de un nuevo post
exports.createPost = async (req, res) => {
    try {
        const { title, description, content, categories, imageUrl, videoUrl } = req.body;

        // Formatear las URLs en el contenido del post
        const formattedContent = formatUrls(content);

        const post = new Post({
            title,
            description,
            content: formattedContent, // Usamos el contenido formateado
            date: moment().toDate(),
            categories,
            imageUrl,
            videoUrl
        });

        await post.save();
        res.redirect('/');
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

        // Formatear el contenido de cada post
        const formattedPosts = posts.map(post => {
            post.content = formatUrls(post.content);
            return post;
        });

        res.render('postsByCategory', { posts: formattedPosts, category });
    } catch (err) {
        res.status(400).send("Error al obtener los posts");
    }
};

// Mostrar un post individual
exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Formatear el contenido del post individual
        post.content = formatUrls(post.content);

        res.render('postDetail', { post });
    } catch (err) {
        res.status(400).send("Error al obtener el post");
    }
};