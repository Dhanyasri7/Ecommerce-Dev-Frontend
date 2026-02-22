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
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
      <div className="container-fluid px-4">

        {/* Brand */}
        <span
          className="navbar-brand fw-bold fs-5"
          role="button"
          onClick={() => navigate("/dashboard")}
        >
          🛒 MyStore
        </span>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarContent">

          {/* Left Links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">

            <li className="nav-item">
              <span
                className={`nav-link px-3 ${
                  location.pathname === "/dashboard"
                    ? "fw-bold text-dark"
                    : "text-muted"
                }`}
                role="button"
                onClick={() => navigate("/dashboard")}
              >
                Home
              </span>
            </li>

            <li className="nav-item">
              <span
                className={`nav-link px-3 ${
                  location.pathname === "/products"
                    ? "fw-bold text-dark"
                    : "text-muted"
                }`}
                role="button"
                onClick={() => navigate("/products")}
              >
                All Products
              </span>
            </li>

          </ul>

          {/* Search Bar */}
          <form
            className="d-flex align-items-center me-lg-3 my-3 my-lg-0"
            onSubmit={handleSearch}
          >
            <input
              className="form-control form-control-sm rounded-pill px-3"
              type="search"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ minWidth: "220px" }}
            />
          </form>

          {/* Logout Button */}
          <button
            className="btn btn-dark btn-sm rounded-pill px-3"
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