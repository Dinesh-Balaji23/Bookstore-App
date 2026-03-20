import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SellerHome = () => {
  const { username } = useParams();
  const [itemsCount, setItemsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://192.168.153.128:9000/sellerhome/${username}`);
        if (!response.ok) {
          throw new Error("Failed to fetch seller data");
        }
        const data = await response.json();
        setItemsCount(data.bookCount);
        setOrdersCount(data.orderCount);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [username]);

  const data = {
    labels: ["Items", "Orders"],
    datasets: [
      {
        label: "Count",
        data: [itemsCount, ordersCount],
        backgroundColor: ["#007bff", "#ffc107"],
        borderColor: ["#0056b3", "#d39e00"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Items and Orders Overview",
      },
    },
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#0026a3" }}>
        <div className="container">
          <a className="navbar-brand" href={`/sellerhome/${username}`}>
            BookStore(Seller)
          </a>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to={`/sellerhome/${username}`} className="nav-link active">
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

      {/* Main Content */}
      <div className="container mt-4">
        <h1 className="mb-4 text-center">Dashboard of {username}</h1>

        {/* Cards Section */}
        <div className="row mb-4">
          {/* Items Bar */}
          <div className="col-md-6">
            <div
              className="card shadow text-white"
              style={{
                backgroundColor: "#007bff",
                borderRadius: "10px",
                height: "200px",
              }}
            >
              <div className="card-body text-center d-flex flex-column justify-content-center align-items-center">
                <h5 className="card-title">Items</h5>
                <p className="display-4">{itemsCount}</p>
              </div>
            </div>
          </div>

          {/* Orders Bar */}
          <div className="col-md-6">
            <div
              className="card shadow text-white"
              style={{
                backgroundColor: "#ffc107",
                borderRadius: "10px",
                height: "200px",
              }}
            >
              <div className="card-body text-center d-flex flex-column justify-content-center align-items-center">
                <h5 className="card-title">Total Orders</h5>
                <p className="display-4">{ordersCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bar Graph Section */}
        <div className="row">
          <div className="col-md-12">
            <div className="card shadow" style={{ padding: "20px", borderRadius: "10px" }}>
              <div style={{ height: "300px" }}>
                <Bar data={data} options={options} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerHome;
