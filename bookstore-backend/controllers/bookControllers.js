const Book = require('../models/books');

// Add a new book
const addBook = async (req, res) => {
    try {
        const { title, author, genre, price, description, sellerName } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: 'Image file is required' });
        }

        const imagePath = req.file.path.replace(/\\/g, '/');

        const newBook = new Book({
            title,
            author,
            genre,
            price,
            description,
            sellerName,
            image: imagePath,
        });

        await newBook.save();

        res.status(201).json({ message: 'Book added successfully', book: newBook });
    } catch (err) {
        res.status(500).json({ message: 'Error adding book', error: err.message });
    }
};

// Get all books
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving books', error: err.message });
    }
};

// Get a book by its ID
const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ message: `Book with ID "${id}" not found` });
        }

        res.status(200).json(book);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving book', error: err.message });
    }
};


// Update a book by title
const updateBookByTitle = async (req, res) => {
    try {
        const { title } = req.params;
        const { author, genre, price, description, sellerName } = req.body;

        const updatedBook = await Book.findOneAndUpdate(
            { title },
            { author, genre, price, description, sellerName },
            { new: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ message: `Book with title "${title}" not found` });
        }

        res.status(200).json({ message: 'Book updated successfully', book: updatedBook });
    } catch (err) {
        res.status(500).json({ message: 'Error updating book', error: err.message });
    }
};

// Delete a book by title
const deleteBookById = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBook = await Book.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).json({ message: `Book with ID "${id}" not found` });
        }

        res.status(200).json({ message: 'Book deleted successfully', book: deletedBook });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting book', error: err.message });
    }
};


const countBooksBySeller = async (req, res) => {
    try {
        const { username } = req.params;

        const bookCount = await Book.countDocuments({ sellerName: username });

        res.status(200).json({ seller: username, bookCount });
    } catch (err) {
        res.status(500).json({ message: 'Error counting books', error: err.message });
    }
};

const getBooksBySeller = async (req, res) => {
    try {
        const { username } = req.params;
        const books = await Book.find({ sellerName: username });

        if (books.length === 0) {
            return res.status(404).json({ message: `No books found for seller "${username}"` });
        }

        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving books', error: err.message });
    }
};

module.exports = { addBook, getAllBooks, getBookById, updateBookByTitle, deleteBookById, countBooksBySeller, getBooksBySeller };