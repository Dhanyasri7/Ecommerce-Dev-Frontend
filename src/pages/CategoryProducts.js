import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function CategoryProducts() {
  const { catid } = useParams();
  const [products, setProducts] = useState([]);
 
  useEffect(() => {
    fetchProducts();
  }, [catid]);

  const fetchProducts = async () => {
    try {
      const res = await api.get(`/products/category/${catid}`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5 pt-4">
        <h3 className="mb-4">Category Products</h3>

        <div className="row">
          {products.length > 0 ? (
            products.map((prod) => (
              <div
                key={prod.proid}
                className="col-lg-3 col-md-4 col-sm-6 mb-4"
              >
                <div className="card h-100 shadow-sm">

                  {prod.image && (
                    <img
                      src={prod.image}
                      className="card-img-top"
                      alt={prod.proname}
                      style={{
                        height: "200px",
                        objectFit: "cover",
                      }}
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
            ))
          ) : (
            <div className="text-center mt-4">
              <p className="text-muted">
                No products found for this category.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CategoryProducts;
