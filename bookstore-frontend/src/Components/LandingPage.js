import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#0026a3" }}>
        <div className="container">
          <a className="navbar-brand" href="/">BookStore</a>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link to="/login" className="nav-link">User</Link></li>
            <li className="nav-item"><Link to="/loginseller" className="nav-link">Seller</Link></li>
            <li className="nav-item"><Link to="/loginadmin" className="nav-link">Admin</Link></li>
          </ul>
        </div>
      </nav>

      <div className="container text-center my-5">
        <h2 className="mb-4">Featured Best Sellers</h2>
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {bestSellerBooks.map((book, index) => (
            <div className="col" key={index}>
              <div className="card h-100">
                <img src={book.image} className="card-img-top" alt={book.title} />
                <div className="card-body">
                  <h5 className="card-title text-center">{book.title}</h5>
                  <p className="text-muted text-center">{book.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container text-center my-5">
        <h2 className="mb-4">Recommended Reads</h2>
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {topRecommendationBooks.map((book, index) => (
            <div className="col" key={index}>
              <div className="card h-100">
                <img src={book.image} className="card-img-top" alt={book.title} />
                <div className="card-body">
                  <h5 className="card-title text-center">{book.title}</h5>
                  <p className="text-muted text-center">{book.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-dark text-white py-4">
        <div className="container text-center">
          <button className="btn btn-warning mb-3" style={{ fontWeight: "bold" }}>Contact Us</button>
          <p>"Embark on a literary journey with our book haven – where every page turns into an adventure!"</p>
          <p>Call At: 127-865-586-67</p>
          <p>&copy; 2024 BookStore. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const bestSellerBooks = [
  { title: "RICH DAD POOR DAD", image: "/images/Rich Dad Poor Dad.jpg", description: "A classic in personal finance education." },
  { title: "THINK AND GROW RICH", image: "/images/Think and Grow Rich.jpg", description: "Napoleon Hill's timeless success principles." },
  { title: "DON'T LET HER STAY", image: "/images/Dont Let Her Stay.jpg", description: "A gripping thriller that will keep you on edge." },
  { title: "KILLING THE WITCHES", image: "/images/Killing the Witches.jpg", description: "Uncover the dark history of witch hunts." },
];

const topRecommendationBooks = [
  { title: "HARRY POTTER", image: "/images/Harry Potter.jpg", description: "The magical world of Hogwarts awaits." },
  { title: "ELON MUSK", image: "/images/Elon Musk.jpg", description: "The biography of a modern visionary." },
  { title: "THE MOSQUITO", image: "/images/The Mosquito.jpg", description: "Explore the impact of this tiny creature on human history." },
  { title: "JOURNEY ON THE JAMES", image: "/images/Journey on the James.jpg", description: "An adventure along one of America's historic rivers." },
];

export default LandingPage;