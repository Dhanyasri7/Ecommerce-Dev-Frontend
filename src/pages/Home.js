import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="col-11 col-sm-8 col-md-6 col-lg-5">

        <div className="card border-0 shadow-sm rounded-4 text-center p-5">

          <div className="mb-4">
            <h2 className="fw-bold mb-3">
              Welcome to 🛒 MyStore
            </h2>
            <p className="text-muted mb-0">
              Discover amazing products across multiple categories.
              Shop smarter. Shop better.
            </p>
          </div>

          <div className="d-grid gap-3 mt-4">
            <button
              className="btn btn-dark rounded-pill py-2"
              onClick={() => navigate("/signup")}
            >
              Create Account
            </button>

            <button
              className="btn btn-outline-dark rounded-pill py-2"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Home;