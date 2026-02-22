import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { jwtDecode } from "jwt-decode";

function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get(`/categories?page=${page}&limit=${limit}`);
      setCategories(res.data.categories);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setName(decoded.name);
        fetchCategories();
      } catch (err) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [fetchCategories, navigate]);

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value));
    setPage(1);
  };

  const renderPageNumbers = () => {
    const pages = [];
    let start = Math.max(1, page - 1);
    let end = Math.min(totalPages, page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(
        <li
          key={i}
          className={`page-item ${page === i ? "active" : ""}`}
        >
          <button
            className="page-link"
            onClick={() => setPage(i)}
          >
            {i}
          </button>
        </li>
      );
    }

    return pages;
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5 pt-5">

        {/* Hero Section */}
        <div className="bg-light p-4 p-md-5 rounded-4 shadow-sm mb-5">
          <h3 className="fw-bold mb-2">
            Welcome back, {name} 👋
          </h3>
          <p className="text-muted mb-0">
            Browse categories and discover amazing products.
          </p>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="d-flex justify-content-center my-5">
            <div className="spinner-border text-dark" role="status" />
          </div>
        ) : (
          <>
            {/* Category Grid */}
            <div className="row g-4">
              {categories.map((cat) => (
                <div
                  key={cat.catid}
                  className="col-lg-3 col-md-4 col-sm-6"
                >
                  <div
                    className="card h-100 border-0 shadow-sm rounded-4 text-center"
                    role="button"
                    onClick={() => navigate(`/category/${cat.catid}`)}
                  >
                    <div className="card-body d-flex flex-column justify-content-between">

                      <div>
                        <h6 className="fw-semibold mb-2">
                          {cat.catname}
                        </h6>
                        <p className="small text-muted">
                          {cat.description}
                        </p>
                      </div>

                      <div className="mt-3">
                        <span className="badge bg-dark rounded-pill px-3 py-2">
                          Explore
                        </span>
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="d-flex justify-content-center mt-5">
              <nav>
                <ul className="pagination pagination-sm">

                  <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                    <button
                      className="page-link"
                      onClick={() => setPage(page - 1)}
                    >
                      &laquo;
                    </button>
                  </li>

                  {renderPageNumbers()}

                  <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                    <button
                      className="page-link"
                      onClick={() => setPage(page + 1)}
                    >
                      &raquo;
                    </button>
                  </li>

                </ul>
              </nav>
            </div>

            {/* Limit Dropdown */}
            <div className="d-flex justify-content-center mt-3">
              <div className="d-flex align-items-center gap-2">
                <span className="small text-muted">
                  Categories per page:
                </span>
                <select
                  className="form-select form-select-sm w-auto"
                  value={limit}
                  onChange={handleLimitChange}
                >
                  <option value={4}>4</option>
                  <option value={6}>6</option>
                  <option value={8}>8</option>
                  <option value={12}>12</option>
                </select>
              </div>
            </div>

          </>
        )}
      </div>
    </>
  );
}

export default Dashboard;