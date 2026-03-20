import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Wishlists = () => {
  const { username } = useParams();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    axios
      .get(`http://192.168.153.128:9000/store/${username}`) // Fetch user's wishlist
      .then((response) => {
        if (response.data && response.data.books) {
          setWishlist(response.data.books);
        } else {
          console.error('Invalid wishlist data from server.');
        }
      })
      .catch((error) => console.log(error));
  }, [username]);

  const handleRemoveFromWishlist = (bookId) => {
    axios
      .post('http://192.168.153.128:9000/store/remove', {
        username,
        bookId,
      })
      .then((response) => {
        if (response.data && Array.isArray(response.data.books)) {
          setWishlist(response.data.books);
        } else {
          console.error('Invalid data received after removing item.');
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: '#0026a3' }}
      >
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
              <Link to={`/wishlist/${username}`} className="nav-link active">
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
      <div className="container mt-4">
        <h1 className="text-center mb-4">Wishlist</h1>
        <div className="row g-4">
          {wishlist.length === 0 ? (
            <p className="text-center">Your wishlist is empty.</p>
          ) : (
            wishlist.map((book, index) => (
              <div key={book._id || index} className="col-md-4 mb-4">
                <div className="card shadow-lg border border-light rounded-3 h-100 overflow-hidden">
                  <img
                    src={`http://192.168.153.128:9000/${book.image}`}
                    alt={book.title}
                    className="card-img-top rounded-3"
                    style={{
                      width: '100%',
                      height: '300px',
                      objectFit: 'contain',
                      maxHeight: '300px',
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{book.title}</h5>
                    <p className="card-text">
                      <strong>Author:</strong> {book.author}
                    </p>
                    <p className="card-text">
                      <strong>Genre:</strong> {book.genre}
                    </p>
                    <p className="card-text">
                      <strong>Price:</strong> ₹{book.price}
                    </p>
                    <p className="card-text">
                      <strong>Seller:</strong> {book.sellerName}
                    </p>
                  </div>
                  <div className="card-footer d-flex justify-content-between">
                    <Link
                      to={`/view/${book._id}/${username}`}
                      className="btn btn-secondary"
                    >
                      View
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemoveFromWishlist(book._id)}
                    >
                      Remove from Wishlist
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlists;