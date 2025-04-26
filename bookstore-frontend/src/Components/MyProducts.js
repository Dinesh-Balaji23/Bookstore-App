import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const SellerProducts = () => {
  const { username } = useParams(); // Extract the username from the URL
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:9000/myproducts/${username}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProducts();
  }, [username]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:9000/myproducts/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Error deleting product: ${response.statusText}`);
      }
      // Update the state to remove the deleted product
      setProducts(products.filter((product) => product._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) {
    return <div className="container mt-4">Error: {error}</div>;
  }

  if (products.length === 0) {
    return (
      <div className="container mt-4">
        <h2>No products found for seller: {username}</h2>
      </div>
    );
  }

  // Function to truncate description
  const truncateDescription = (desc, maxLength = 100) => {
    if (desc.length > maxLength) {
      return `${desc.substring(0, maxLength)}...`;
    }
    return desc;
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: "#0026a3" }}
      >
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
              <Link to={`/myproducts/${username}`} className="nav-link active">
                My Products
              </Link>
            </li>
            <li className="nav-item">
              <Link to={`/addbooks/${username}`} className="nav-link">
                Add Books
              </Link>
            </li>
            <li className="nav-item">
              <Link to={`/sellerorders/${username}`} className="nav-link">
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
      <div className="container mt-4">
        <h1 className="text-center mb-4">Books List</h1>
        <div className="row">
          {products.map((product) => (
            <div className="col-md-4 mb-4" key={product._id}>
              <div className="card h-100">
                <div className="d-flex justify-content-end p-2">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </div>
                <img
                  src={`http://localhost:9000/${product.image}`}
                  alt={product.title}
                  className="card-img-top rounded-3"
                  style={{ width: '100%', height: '300px', objectFit: 'contain', maxHeight: '300px' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">Author: {product.author}</p>
                  <p className="card-text">Genre: {product.genre}</p>
                  <p className="card-text text-primary">
                    Price: ₹{product.price}
                  </p>
                  <p className="card-text">
                    <strong>Description:</strong>{" "}
                    {truncateDescription(product.description)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellerProducts;
