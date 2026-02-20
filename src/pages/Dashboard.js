import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { jwtDecode } from "jwt-decode";

function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [email, setEmail] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  const fetchCategories = useCallback(async () => {
    try {
      const res = await api.get(
        `/categories?page=${page}&limit=${limit}`
      );
      setCategories(res.data.categories);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  }, [page, limit]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setEmail(decoded.email);
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

      <div className="container mt-5 pt-4">

        <div className="mb-4">
          <h3 className="fw-semibold">Welcome {email}</h3>
          <p className="text-muted">Select a category</p>
        </div>

        {/* Category Grid */}
        <div className="row">
          {categories.map((cat) => (
            <div
              key={cat.catid}
              className="col-lg-3 col-md-4 col-sm-6 mb-4"
            >
              <div
                className="card h-100 shadow-sm"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/category/${cat.catid}`)}
              >
                <div className="card-body">
                  <h6 className="card-title">
                    {cat.catname}
                  </h6>
                  <p className="card-text small text-muted">
                    {cat.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination">

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
            <span className="small">Categories per page:</span>
            <select
              className="form-select form-select-sm"
              style={{ width: "90px" }}
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

      </div>
    </>
  );
}

export default Dashboard;
