import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function CategoryProducts() {
  const { catid } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [catid]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/products/category/${catid}`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5 pt-5">

        {/* Header Section */}
        <div className="mb-4">
          <h3 className="fw-bold">Category Products</h3>
          <p className="text-muted mb-0">
            Explore products available in this category.
          </p>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="d-flex justify-content-center my-5">
            <div className="spinner-border text-dark" role="status" />
          </div>
        ) : products.length > 0 ? (

          /* Product Grid */
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

                      <button className="btn btn-sm btn-dark rounded-pill px-3">
                        View
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>

        ) : (

          /* Empty State */
          <div className="text-center my-5">
            <h6 className="fw-semibold">No products found</h6>
            <p className="text-muted">
              Try exploring other categories.
            </p>
          </div>

        )}
      </div>
    </>
  );
}

export default CategoryProducts;