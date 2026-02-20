import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q");
    if (q) setQuery(q);
  }, [location]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom fixed-top shadow-sm">
      <div className="container-fluid px-4">

        {/* Brand */}
        <span
          className="navbar-brand fw-bold"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/dashboard")}
        >
          🛒 MyStore
        </span>

        {/* Toggle for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Content */}
        <div className="collapse navbar-collapse" id="navbarContent">

          {/* Left Navigation Links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-3">

            <li className="nav-item">
              <span
                className={`nav-link ${
                  location.pathname === "/dashboard" ? "fw-bold" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/dashboard")}
              >
                Home
              </span>
            </li>

            <li className="nav-item">
              <span
                className={`nav-link ${
                  location.pathname === "/products" ? "fw-bold" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/products")}
              >
                All Products
              </span>
            </li>

          </ul>

          {/* Search */}
          <form className="d-flex me-3" onSubmit={handleSearch}>
            <input
              className="form-control"
              type="search"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>

          {/* Logout */}
          <button
            className="btn btn-outline-dark btn-sm"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
