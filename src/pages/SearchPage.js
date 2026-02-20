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

  useEffect(() => {
    if (query) {
      fetchResults();
    }
  }, [query, page]);

  const fetchResults = async () => {
    try {
      const res = await api.get(
        `/search?q=${query}&page=${page}&limit=${limit}`
      );
      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
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

      <div className="container mt-5 pt-4">

        <h4 className="mb-4">
          Search Results for "<span className="text-muted">{query}</span>"
        </h4>

        {products.length === 0 ? (
          <div className="text-center mt-4">
            <p className="text-muted">No products found.</p>
          </div>
        ) : (
          <>
            <div className="row">
              {products.map((p) => (
                <div
                  key={p.proid}
                  className="col-lg-3 col-md-4 col-sm-6 mb-4"
                >
                  <div className="card h-100 shadow-sm">

                    {p.image && (
                      <img
                        src={p.image}
                        className="card-img-top"
                        alt={p.proname}
                        style={{
                          height: "200px",
                          objectFit: "cover"
                        }}
                      />
                    )}

                    <div className="card-body d-flex flex-column">

                      <h6
                        className="card-title"
                        dangerouslySetInnerHTML={{
                          __html: p.proname
                        }}
                      />

                      <p
                        className="card-text small text-muted"
                        dangerouslySetInnerHTML={{
                          __html: p.description
                        }}
                      />

                      <div className="mt-auto">
                        <p className="fw-bold mb-1">
                          ₹{p.price}
                        </p>

                        {p.score && (
                          <small className="text-muted">
                            Score: {p.score.toFixed(2)}
                          </small>
                        )}
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
          </>
        )}
      </div>
    </>
  );
}

export default SearchPage;
