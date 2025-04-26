import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const SellerOrders = () => {
  const { username } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/sellerorders/${username}`
        );
        setOrders(response.data);
      } catch (err) {
        setError("Failed to fetch orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [username]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#0026a3" }}>
              <div className="container">
                <a className="navbar-brand" href={`/sellerhome/${username}`}>
                  BookStore(Seller)
                </a>
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <Link to={`/sellerhome/${username}`} className="nav-link">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={`/myproducts/${username}`} className="nav-link">
                      My Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={`/addbooks/${username}`} className="nav-link">
                      Add Books
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={`/sellerorders/${username}`} className="nav-link active">
                      Orders
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/loginseller" className="nav-link">
                      Logout ({username})
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
      <div className="container mt-5">
        <h2 className="text-center mb-4">My Orders</h2>
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
                  <strong>Customer Name:</strong> {order.username}
                </p>
                <p>
                  <strong>Address:</strong> {order.flatNo}, {order.city},{" "}
                  {order.state}, {order.pincode}
                </p>
                <p>
                  <strong>Booking Date:</strong>{" "}
                  {new Date(order.bookingDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Delivery By:</strong>{" "}
                  {new Date(order.deliveryBy).toLocaleDateString()}
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
    </div>
  );
};

export default SellerOrders;
