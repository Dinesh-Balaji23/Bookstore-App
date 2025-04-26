import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AddBook() {
  const { username } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    sellerName: username || "",
    bookTitle: "",
    author: "",
    genre: "",
    price: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("sellerName", formData.sellerName);
    data.append("title", formData.bookTitle);
    data.append("author", formData.author);
    data.append("genre", formData.genre);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("image", formData.image);

    try {
      const response = await axios.post(`http://localhost:9000/addbooks/${username}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(response.data.message);
      navigate(`/myproducts/${username}`)
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Error adding book");
    }
  };

  return (
    <div className="bg-light min-vh-100">
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: "#0026a3" }}
      >
        <div className="container">
          <a className="navbar-brand" href={`/sellerhome/${username}`}>
            BookStore(Seller)
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
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
                <Link to={`/addbooks/${username}`} className="nav-link active">
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
        </div>
      </nav>

      <div className="container d-flex justify-content-center align-items-center">
        <div className="card p-4 shadow mt-5" style={{ maxWidth: "500px", backgroundColor: "#f8f9fa" }}>
          <h4 className="mb-4 text-center">Add Book</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="sellerName" className="form-label">Seller Name</label>
              <input
                type="text"
                id="sellerName"
                name="sellerName"
                className="form-control"
                value={formData.sellerName}
                onChange={handleChange}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="bookTitle" className="form-label">Book Title</label>
              <input
                type="text"
                id="bookTitle"
                name="bookTitle"
                className="form-control"
                placeholder="Enter book title"
                value={formData.bookTitle}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="author" className="form-label">Author</label>
              <input
                type="text"
                id="author"
                name="author"
                className="form-control"
                placeholder="Enter author's name"
                value={formData.author}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="genre" className="form-label">Genre</label>
              <input
                type="text"
                id="genre"
                name="genre"
                className="form-control"
                placeholder="Enter genre"
                value={formData.genre}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                className="form-control"
                placeholder="Enter price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                rows="3"
                placeholder="Enter description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="itemImage" className="form-label">Item Image</label>
              <input
                type="file"
                id="itemImage"
                name="image"
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBook;