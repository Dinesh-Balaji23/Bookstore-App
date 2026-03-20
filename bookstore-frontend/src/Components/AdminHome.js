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

const AdminHome = () => {
  const { username } = useParams();
  const [usersCount, setUsersCount] = useState(0);
  const [vendorsCount, setVendorsCount] = useState(0);
  const [itemsCount, setItemsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://192.168.153.128:9000/adminhome/${username}`);
        if (!response.ok) {
          throw new Error("Failed to fetch admin data");
        }
        const data = await response.json();
        setUsersCount(data.usersCount);
        setVendorsCount(data.vendorsCount);
        setItemsCount(data.itemsCount);
        setOrdersCount(data.ordersCount);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [username]);

  const data = {
    labels: ["Users", "Vendors", "Items", "Total Orders"],
    datasets: [
      {
        label: "Count",
        data: [usersCount, vendorsCount, itemsCount, ordersCount],
        backgroundColor: ["#007bff", "#28a745", "#ffc107", "#17a2b8"],
        borderColor: ["#0056b3", "#19692c", "#d39e00", "#116d85"],
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
        text: "Users, Vendors, Items, and Orders Overview",
      },
    },
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
              <Link to={`/adminhome/${username}`} className="nav-link active">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to={`/users/${username}`} className="nav-link">
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

      <div className="container mt-4">
        <h1 className="mb-4 text-center">Dashboard of {username}</h1>

        <div className="row mb-4">
          <div className="col-md-3">
            <Link to={`/users/${username}`} className="text-decoration-none">
              <div
                className="card shadow text-white"
                style={{
                  backgroundColor: "#007bff",
                  borderRadius: "10px",
                  height: "150px",
                }}
              >
                <div className="card-body text-center d-flex flex-column justify-content-center align-items-center">
                  <h5 className="card-title">Users</h5>
                  <p className="display-6">{usersCount}</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-3">
            <Link to={`/sellers/${username}`} className="text-decoration-none">
              <div
                className="card shadow text-white"
                style={{
                  backgroundColor: "#28a745",
                  borderRadius: "10px",
                  height: "150px",
                }}
              >
                <div className="card-body text-center d-flex flex-column justify-content-center align-items-center">
                  <h5 className="card-title">Vendors</h5>
                  <p className="display-6">{vendorsCount}</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-3">
            <Link to={`/items/${username}`} className="text-decoration-none">
              <div
                className="card shadow text-white"
                style={{
                  backgroundColor: "#ffc107",
                  borderRadius: "10px",
                  height: "150px",
                }}
              >
                <div className="card-body text-center d-flex flex-column justify-content-center align-items-center">
                  <h5 className="card-title">Items</h5>
                  <p className="display-6">{itemsCount}</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-3">
            <Link to={`/totalorders/${username}`} className="text-decoration-none">
              <div
                className="card shadow text-white"
                style={{
                  backgroundColor: "#17a2b8",
                  borderRadius: "10px",
                  height: "150px",
                }}
              >
                <div className="card-body text-center d-flex flex-column justify-content-center align-items-center">
                  <h5 className="card-title">Total Orders</h5>
                  <p className="display-6">{ordersCount}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

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

export default AdminHome;
