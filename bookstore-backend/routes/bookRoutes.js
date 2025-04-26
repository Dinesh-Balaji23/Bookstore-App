const express = require('express');
const multer = require('multer');
const {
    addBook,
    getAllBooks,
    getBookById,
    updateBookByTitle,
    deleteBookById, getBooksBySeller
} = require('../controllers/bookControllers');

const router = express.Router();

// Set up multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Store images in the `uploads` directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });

// Add a new book
router.post('/addbooks/:username', upload.single('image'), addBook);

// Get all books
router.get('/store', getAllBooks);

// Get a book by ID
router.get('/view/:id', getBookById);

// Update a book by title
router.put('/books/update/:title', updateBookByTitle);

router.delete('/myproducts/:id', deleteBookById);

router.get('/myproducts/:username', getBooksBySeller);

module.exports = router;