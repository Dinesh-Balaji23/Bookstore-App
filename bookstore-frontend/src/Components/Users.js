import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const UserTable = () => {
  const { username } = useParams();
  const [users, setUsers] = useState([]);
  const [selectedUserOrders, setSelectedUserOrders] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:9000/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleViewOrders = async (userName) => {
    try {
      const response = await axios.get(`http://localhost:9000/orders/${userName}`);
      setSelectedUserOrders(response.data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/users/delete/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/orders/${id}`);
      setSelectedUserOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== id)
      );
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUserOrders(null);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#0026a3" }}>
        <div className="container">
          <a className="navbar-brand" href={`/adminhome/${username}`}>
            BookStore(Admin)
          </a>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to={`/adminhome/${username}`} className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to={`/users/${username}`} className="nav-link active">
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link to={`/sellers/${username}`} className="nav-link">
                Sellers
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/loginadmin" className="nav-link">
                Logout ({username})
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container mt-5">
        <h2 className="text-center mb-4">Users</h2>
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle shadow-sm">
            <thead className="table-dark">
              <tr>
                <th scope="col">Sl/No</th>
                <th scope="col">UserId</th>
                <th scope="col">User Name</th>
                <th scope="col">Email</th>
                <th scope="col">Operation</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <div className="d-flex justify-content-center">
                        <button
                          className="btn btn-primary btn-sm mx-1"
                          onClick={() => handleViewOrders(user.name)}
                        >
                          View
                        </button>
                        <button
                            className="btn btn-danger btn-sm mx-1"
                            onClick={() => handleDeleteUser(user._id)}
                        > Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">User Orders</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                {selectedUserOrders ? (
                  selectedUserOrders.map((order) => (
                    <div
                      key={order._id}
                      className="card mb-4"
                      style={{
                        borderRadius: "10px",
                        padding: "20px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        margin: "0 auto",
                        maxWidth: "800px",
                      }}
                    >
                      <div className="d-flex align-items-center">
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
                            <strong>Booking Date:</strong> {order.bookingDate}
                          </p>
                          <p>
                            <strong>Delivery By:</strong> {order.deliveryBy}
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
                      <div className="text-center mt-3">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteOrder(order._id)}
                        >
                          Delete Order
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Loading...</p>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
