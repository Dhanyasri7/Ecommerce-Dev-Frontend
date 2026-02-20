import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="col-md-6 col-lg-4">
        <div className="card shadow-sm text-center p-4">
 
          <h4 className="mb-4">
            Welcome to My Ecommerce Website
          </h4>

          <button
            className="btn btn-dark w-100 mb-3"
            onClick={() => navigate("/signup")}
          >
            Signup
          </button>

          <button
            className="btn btn-outline-dark w-100"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

        </div>
      </div>
    </div>
  );
}

export default Home;
