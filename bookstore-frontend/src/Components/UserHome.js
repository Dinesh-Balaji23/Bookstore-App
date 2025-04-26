import React from "react";
import { Link } from "react-router-dom";

const UserHome = () => {
  const name = localStorage.getItem('name') || '';
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#0026a3" }}>
        <div className="container">
          <a className="navbar-brand" href={`/home/${name}`}>
            BookStore
          </a>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to={`/home/${name}`} className="nav-link active">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to={`/store/${name}`} className="nav-link">
                Books
              </Link>
            </li>
            <li className="nav-item">
              <Link to={`/wishlist/${name}`} className="nav-link">
                Wishlist
              </Link>
            </li>
            <li className="nav-item">
              <Link to={`/orders/${name}`} className="nav-link">
                My Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Logout ({name})
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Best Seller Section */}
      <div className="container text-center my-5">
        <h2 className="mb-4">Best Seller</h2>
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {bestSellerBooks.map((book, index) => (
            <div className="col" key={index}>
              <Link to={`/store/${name}`} className="text-decoration-none text-dark">
                <div className="card h-100">
                  <img src={book.image} className="card-img-top" alt={book.title} />
                  <div className="card-body">
                    <h5 className="card-title text-center">{book.title}</h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Top Recommendations Section */}
      <div className="container text-center my-5">
        <h2 className="mb-4">Top Recommendations</h2>
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {topRecommendationBooks.map((book, index) => (
            <div className="col" key={index}>
              <Link to={`/store/${name}`} className="text-decoration-none text-dark">
                <div className="card h-100">
                  <img src={book.image} className="card-img-top" alt={book.title} />
                  <div className="card-body">
                    <h5 className="card-title text-center">{book.title}</h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
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

const bestSellerBooks = [
  { title: "RICH DAD POOR DAD", image: "/images/Rich Dad Poor Dad.jpg" },
  { title: "THINK AND GROW RICH", image: "/images/Think and Grow Rich.jpg" },
  { title: "DON'T LET HER STAY", image: "/images/Dont Let Her Stay.jpg" },
  { title: "KILLING THE WITCHES", image: "/images/Killing the Witches.jpg" },
];

const topRecommendationBooks = [
  { title: "HARRY POTTER", image: "/images/Harry Potter.jpg" },
  { title: "ELON MUSK", image: "/images/Elon Musk.jpg" },
  { title: "THE MOSQUITO", image: "/images/The Mosquito.jpg" },
  { title: "JOURNEY ON THE JAMES", image: "/images/Journey on the James.jpg" },
];

export default UserHome;
