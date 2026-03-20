import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const BookView = () => {
    const { id, username } = useParams(); // Get the book ID and username from the URL

    const [book, setBook] = useState(null);

    // Fetch book details from the backend
    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://192.168.153.128:9000/view/${id}`);
                setBook(response.data);
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchBook();
    }, [id]);

    // If book details are still loading
    if (!book) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    return (
        <div>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#0026a3" }}>
                <div className="container">
                    <a className="navbar-brand" href="/">
                        BookStore
                    </a>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link to={`/home/${username}`} className="nav-link">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={`/store/${username}`} className="nav-link">
                                Books
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={`/wishlist/${username}`} className="nav-link">
                                Wishlist
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={`/orders/${username}`} className="nav-link">
                                My Orders
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">
                                Logout ({username})
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Book Details */}
            <div className="container my-5">
                <div className="text-center mb-4">
                    {/* Image Section */}
                    <img
                        src={`http://192.168.153.128:9000/${book.image}`}
                        alt={book.title}
                        className="img-fluid shadow-sm mb-2"
                        style={{ maxHeight: '400px', objectFit: 'cover' }}
                    />
                    <p className="text-muted">Book ID: {book._id}</p>
                </div>

                {/* Info and Description Section */}
                <div className="row">
                    {/* Description */}
                    <div className="col-md-7 mb-4">
                        <h4>Description</h4>
                        <hr />
                        <p style={{ textAlign: 'justify' }}>{book.description}</p>
                    </div>
                    <div className="col-md-1">
                    </div>
                    {/* Info */}
                    <div className="col-md-4">
                        <h4>Info</h4>
                        <hr />
                        <ul className="list-unstyled">
                            <li><strong>Title:</strong> {book.title}</li>
                            <li><strong>Author:</strong> {book.author}</li>
                            <li><strong>Genre:</strong> {book.genre}</li>
                            <li><strong>Price:</strong> ₹{book.price}</li>
                            <li><strong>Seller:</strong> {book.sellerName}</li>
                        </ul>
                    </div>
                </div>

                {/* Buy Now Button */}
                <div className="text-center mt-4">
                    <Link to={`/orderitem/${book._id}/${username}`} className="btn btn-primary px-4">Buy Now</Link>
                </div>
            </div>
        </div>
    );
};

export default BookView;
