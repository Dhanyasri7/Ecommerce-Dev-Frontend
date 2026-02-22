import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      fetchResults();
    }
  }, [query, page]);

  const fetchResults = async () => {
    try {
      setLoading(true);
      const res = await api.get(
        `/search?q=${query}&page=${page}&limit=${limit}`
      );

      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
      setTotalResults(res.data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
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

        {/* Header */}
        <div className="mb-4">
          <h4 className="fw-bold">
            Search Results
          </h4>
          <p className="text-muted mb-0">
            Showing results for "<span className="fw-semibold">{query}</span>" 
            {totalResults > 0 && ` • ${totalResults} found`}
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="d-flex justify-content-center my-5">
            <div className="spinner-border text-dark" role="status" />
          </div>
        ) : products.length === 0 ? (

          /* Empty State */
          <div className="text-center my-5">
            <h6 className="fw-semibold">No products found</h6>
            <p className="text-muted">
              Try adjusting your search terms.
            </p>
          </div>

        ) : (
          <>
            {/* Product Grid */}
            <div className="row g-4">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="col-lg-3 col-md-4 col-sm-6"
                >
                  <div className="card h-100 border-0 shadow-sm rounded-4">

                    {p.image && (
                      <img
                        src={p.image}
                        className="card-img-top rounded-top-4"
                        alt={p.proname}
                        style={{
                          height: "200px",
                          objectFit: "cover"
                        }}
                      />
                    )}

                    <div className="card-body d-flex flex-column">

                      <h6
                        className="fw-semibold mb-2"
                        dangerouslySetInnerHTML={{
                          __html: p.proname
                        }}
                      />

                      <p
                        className="small text-muted mb-3"
                        dangerouslySetInnerHTML={{
                          __html: p.description
                        }}
                      />

                      <div className="mt-auto d-flex justify-content-between align-items-center">
                        <span className="fw-bold">
                          ₹ {p.price}
                        </span>

                        {p.score && (
                          <span className="badge bg-light text-dark border">
                            {p.score.toFixed(1)}
                          </span>
                        )}
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
          </>
        )}
      </div>
    </>
  );
}

export default SearchPage;