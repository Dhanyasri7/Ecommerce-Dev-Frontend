import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login({ setToken }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
 
    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="col-md-6 col-lg-4">
        <div className="card shadow-sm p-4">

          <h4 className="mb-4 text-center">Login</h4>

          <form onSubmit={handleLogin} autoComplete="off">

            <div className="mb-3">
              <label className="form-label small">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label small">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-dark w-100 mb-3">
              Login
            </button>

          </form>

          <div className="text-center">
            <small>
              Don't have an account?{" "}
              <span
                style={{ cursor: "pointer" }}
                className="text-dark fw-semibold"
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
