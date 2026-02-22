import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login({ setToken }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="col-11 col-sm-8 col-md-6 col-lg-4">

        <div className="card border-0 shadow-sm rounded-4 p-4">

          <div className="text-center mb-4">
            <h4 className="fw-bold">Welcome Back</h4>
            <p className="text-muted small mb-0">
              Login to continue shopping
            </p>
          </div>

          <form onSubmit={handleLogin} autoComplete="off">

            {/* Email */}
            <div className="mb-3">
              <label className="form-label small fw-semibold">
                Email Address
              </label>
              <input
                type="email"
                className="form-control rounded-3"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="form-label small fw-semibold">
                Password
              </label>
              <input
                type="password"
                className="form-control rounded-3"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="btn btn-dark w-100 rounded-pill py-2"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm me-2" />
              ) : null}
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <div className="text-center mt-4">
            <small className="text-muted">
              Don’t have an account?{" "}
              <span
                role="button"
                className="fw-semibold text-dark"
                onClick={() => navigate("/signup")}
              >
                Signup
              </span>
            </small>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;