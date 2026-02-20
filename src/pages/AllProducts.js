import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [page, limit]);

  const fetchProducts = async () => {
    try {
      const res = await api.get(
        `/products?page=${page}&limit=${limit}`
      );
      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

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

        <h3 className="mb-4">All Products</h3>

        {/* Product Grid */}
        <div className="row">
          {products.map((prod) => (
            <div key={prod.proid} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="card h-100 shadow-sm">

                {prod.image && (
                  <img
                    src={prod.image}
                    className="card-img-top"
                    alt={prod.proname}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}

                <div className="card-body d-flex flex-column">
                  <h6 className="card-title">
                    {prod.proname}
                  </h6>

                  <p className="card-text small text-muted">
                    {prod.description}
                  </p>

                  <div className="mt-auto">
                    <p className="fw-bold mb-0">
                      ₹ {prod.price}
                    </p>
                  </div>
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
            <span className="small">Products per page:</span>
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

export default AllProducts;
