import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [page, limit]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/products?page=${page}&limit=${limit}`);
      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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

      <div className="container mt-5 pt-5">

        {/* Header Section */}
        <div className="mb-4">
          <h3 className="fw-bold">All Products</h3>
          <p className="text-muted mb-0">
            Browse all available products in our store.
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="d-flex justify-content-center my-5">
            <div className="spinner-border text-dark" role="status" />
          </div>
        ) : products.length > 0 ? (

          <>
            {/* Product Grid */}
            <div className="row g-4">
              {products.map((prod) => (
                <div
                  key={prod.proid}
                  className="col-lg-3 col-md-4 col-sm-6"
                >
                  <div className="card h-100 border-0 shadow-sm rounded-4">

                    {prod.image && (
                      <img
                        src={prod.image}
                        className="card-img-top rounded-top-4"
                        alt={prod.proname}
                        style={{
                          height: "200px",
                          objectFit: "cover",
                        }}
                      />
                    )}

                    <div className="card-body d-flex flex-column">

                      <h6 className="fw-semibold mb-2">
                        {prod.proname}
                      </h6>

                      <p className="small text-muted mb-3">
                        {prod.description}
                      </p>

                      <div className="mt-auto d-flex justify-content-between align-items-center">
                        <span className="fw-bold fs-6">
                          ₹ {prod.price}
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

            {/* Limit Selector */}
            <div className="d-flex justify-content-center mt-3">
              <div className="d-flex align-items-center gap-2">
                <span className="small text-muted">
                  Products per page:
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

        ) : (

          /* Empty State */
          <div className="text-center my-5">
            <h6 className="fw-semibold">No products found</h6>
            <p className="text-muted">
              Please check back later.
            </p>
          </div>

        )}
      </div>
    </>
  );
}

export default AllProducts;