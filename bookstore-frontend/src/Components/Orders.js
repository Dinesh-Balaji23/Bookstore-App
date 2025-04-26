import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const OrdersPage = () => {
  const { username } = useParams(); // Get username from the URL
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options); // Format as DD/MM/YYYY
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/orders/${username}`);
        setOrders(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [username]);

  if (loading) return <p className="text-center mt-5">Loading orders...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#0026a3' }}>
        <div className="container">
          <a className="navbar-brand" href="/">BookStore</a>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link to={`/home/${username}`} className="nav-link">Home</Link></li>
            <li className="nav-item"><Link to={`/store/${username}`} className="nav-link">Books</Link></li>
            <li className="nav-item"><Link to={`/wishlist/${username}`} className="nav-link">Wishlist</Link></li>
            <li className="nav-item"><Link to={`/orders/${username}`} className="nav-link active">My Orders</Link></li>
            <li className="nav-item"><Link to="/login" className="nav-link">Logout ({username})</Link></li>
          </ul>
        </div>
      </nav>

      {/* Page Content */}
      <div className="container mt-5">
        <h2 className="text-center mb-4">
          My Orders
        </h2>
        {orders.map((order) => (
          <div
            key={order._id}
            className="card mb-4"
            style={{
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              margin: "0 auto", // Center the card horizontally
              maxWidth: "800px", // Limit the card width
            }}
          >
            <div className="d-flex align-items-center">
              {/* Image */}
              <div style={{ width: "120px", marginRight: "20px" }}>
                <img
                  src={`http://localhost:9000/${order.bookImage}`}
                  alt={order.bookTitle}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </div>

              {/* Order Details */}
              <div style={{ flex: 1 }}>
                <p>
                  <strong>Product Name:</strong> {order.bookTitle}
                </p>
                <p>
                  <strong>Order ID:</strong> {order._id}
                </p>
                <p>
                  <strong>Address:</strong> {order.flatNo}, {order.city},{" "}
                  {order.state}, {order.pincode}
                </p>
                <p>
                  <strong>Seller:</strong> {order.sellerName}
                </p>
                <p>
                  <strong>Booking Date:</strong> {formatDate(order.bookingDate)}
                </p>
                <p>
                  <strong>Delivery By:</strong> {formatDate(order.deliveryBy)}
                </p>
                <p>
                  <strong>Price:</strong> ₹{order.price}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    style={{
                      color: order.status === "Pending" ? "orange" : "green",
                    }}
                  >
                    {order.status}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <footer className="bg-dark text-white py-4">
        <div className="container text-center">
          <button className="btn btn-warning mb-3" style={{ fontWeight: "bold" }}>
            Contact Us
          </button>
          <p>"Embark on a literary journey with our book haven – where every page turns into an adventure!"</p>
          <p>Call At: 127-865-586-67</p>
          <p>&copy; 2024 BookStore. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default OrdersPage;
