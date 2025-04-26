import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const SellerTable = () => {
  const { username } = useParams();
  const [sellers, setSellers] = useState([]);
  const [selectedSellerBooks, setSelectedSellerBooks] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get("http://localhost:9000/sellers");
        setSellers(response.data);
      } catch (error) {
        console.error("Error fetching sellers:", error);
      }
    };

    fetchSellers();
  }, []);

  const handleViewBooks = async (sellerName) => {
    try {
      const response = await axios.get(`http://localhost:9000/myproducts/${sellerName}`);
      setSelectedSellerBooks(response.data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleDeleteSeller = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/sellers/delete/${id}`);
      setSellers((prevSellers) => prevSellers.filter((seller) => seller._id !== id));
    } catch (error) {
      console.error("Error deleting seller:", error);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/myproducts/${id}`);
      setSelectedSellerBooks((prevBooks) =>
        prevBooks.filter((book) => book._id !== id)
      );
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedSellerBooks(null);
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
              <Link to={`/users/${username}`} className="nav-link">
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link to={`/sellers/${username}`} className="nav-link active">
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
        <h2 className="text-center mb-4">Sellers</h2>
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle shadow-sm">
            <thead className="table-dark">
              <tr>
                <th scope="col">Sl/No</th>
                <th scope="col">Seller ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Operation</th>
              </tr>
            </thead>
            <tbody>
              {sellers.length > 0 ? (
                sellers.map((seller, index) => (
                  <tr key={seller._id}>
                    <td>{index + 1}</td>
                    <td>{seller._id}</td>
                    <td>{seller.name}</td>
                    <td>{seller.email}</td>
                    <td>
                      <div className="d-flex justify-content-center">
                        <button
                          className="btn btn-primary btn-sm mx-1"
                          onClick={() => handleViewBooks(seller.name)}
                        >
                          View Books
                        </button>
                        <button
                          className="btn btn-danger btn-sm mx-1"
                          onClick={() => handleDeleteSeller(seller._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No sellers found
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
                <h5 className="modal-title">Books Sold by Seller</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                {selectedSellerBooks ? (
                  selectedSellerBooks.map((book) => (
                    <div
                      key={book._id}
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
                            src={`http://localhost:9000/${book.image}`}
                            alt={book.title}
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
                            <strong>Title:</strong> {book.title}
                          </p>
                          <p>
                            <strong>Product ID:</strong> {book._id}
                          </p>
                          <p>
                            <strong>Warranty:</strong> 1 Year
                          </p>
                          <p>
                            <strong>Price:</strong> ₹{book.price}
                          </p>
                        </div>
                      </div>
                      <div className="text-center mt-3">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteBook(book._id)}
                        >
                          Delete Book
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

export default SellerTable;
