import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrderItem = () => {
  const { id, username } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [formData, setFormData] = useState({
    flatNo: '',
    city: '',
    pincode: '',
    state: '',
  });

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://192.168.153.128:9000/view/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error.message);
      }
    };

    fetchBookDetails();
  }, [id, username]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        bookTitle: book.title,
        username,
        flatNo: formData.flatNo,
        city: formData.city,
        pincode: formData.pincode,
        state: formData.state,
      };
      await axios.post(`http://192.168.153.128:9000/orderitem/${id}/${username}`, orderData);
      alert('Ordered Successfully!')
      navigate(`/orders/${username}`);
    } catch (error) {
      console.error('Error placing order:', error.message);
    }
  };

  if (!book) return null;

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#0026a3' }}>
        <div className="container">
          <a className="navbar-brand" href="/">BookStore</a>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link to={`/home/${username}`} className="nav-link">Home</Link></li>
            <li className="nav-item"><Link to={`/store/${username}`} className="nav-link">Books</Link></li>
            <li className="nav-item"><Link to={`/wishlist/${username}`} className="nav-link">Wishlist</Link></li>
            <li className="nav-item"><Link to={`/orders/${username}`} className="nav-link">My Orders</Link></li>
            <li className="nav-item"><Link to="/login" className="nav-link">Logout ({username})</Link></li>
          </ul>
        </div>
      </nav>
      <div className="card mx-auto p-4 shadow-sm" style={{ maxWidth: '600px', borderRadius: '10px', marginTop: '10px' }}>
        <h3 className="text-center mb-4" style={{ fontWeight: 'bold' }}>Finalize Your Order</h3>
        <form onSubmit={handleSubmit}>
          <h5 className="mb-3">Delivery Address</h5>
          <div className="mb-3">
            <label htmlFor="flatNo" className="form-label">Flat/Apartment Number <span className="text-danger">*</span></label>
            <input
              type="text"
              className="form-control"
              id="flatNo"
              name="flatNo"
              value={formData.flatNo}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Address Details</label>
            <div className="row g-2">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  placeholder="Pincode"
                  required
                />
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="state" className="form-label">State <span className="text-danger">*</span></label>
            <input
              type="text"
              className="form-control"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              placeholder="Enter your state"
              required
            />
          </div>
          <div className="d-flex align-items-center justify-content-end mb-4">
            <div className="text-end">
              <img
                src={`http://192.168.153.128:9000/${book.image}`}
                alt={book.title}
                style={{
                  width: '60px',
                  height: '80px',
                  objectFit: 'cover',
                  borderRadius: '5px',
                }}
              />
              <p className="text-muted mt-2">Book ID: {book._id}</p>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div>
              <p className="mb-1">Price:</p>
              <p className="mb-1">Delivery:</p>
              <p className="mb-1">Total Amount:</p>
            </div>
            <div className="text-end">
              <p className="mb-1">₹{book.price}</p>
              <p className="mb-1">Free</p>
              <p className="mb-1">₹{book.price}</p>
            </div>
          </div>
          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary w-100">Confirm and Order</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderItem;