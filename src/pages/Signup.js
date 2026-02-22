import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    const nameRegex = /^[a-zA-Z]{3,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]{4,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;

    if (!nameRegex.test(form.name)) {
      newErrors.name =
        "Name must contain only alphabets and at least 3 characters";
    }

    if (!emailRegex.test(form.email)) {
      newErrors.email =
        "Email must have at least 4 characters before @ and valid domain";
    }

    if (!passwordRegex.test(form.password)) {
      newErrors.password =
        "Password must be 8-15 characters, include uppercase, lowercase, number & special character";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await api.post("/auth/signup", form);

      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      });

      setErrors({});
      alert("Account created successfully. Please login.");
      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="col-11 col-sm-8 col-md-6 col-lg-4">

        <div className="card border-0 shadow-sm rounded-4 p-4">

          <div className="text-center mb-4">
            <h4 className="fw-bold">Create Account</h4>
            <p className="text-muted small mb-0">
              Sign up to explore our store
            </p>
          </div>

          <form autoComplete="off" onSubmit={handleSignup} noValidate>

            {/* Name */}
            <div className="mb-3">
              <label className="form-label small fw-semibold">
                Full Name
              </label>
              <input
                type="text"
                className={`form-control rounded-3 ${errors.name ? "is-invalid" : ""}`}
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                placeholder="Enter your name"
              />
              {errors.name && (
                <div className="invalid-feedback">
                  {errors.name}
                </div>
              )}
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label small fw-semibold">
                Email Address
              </label>
              <input
                type="email"
                className={`form-control rounded-3 ${errors.email ? "is-invalid" : ""}`}
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                placeholder="Enter your email"
              />
              {errors.email && (
                <div className="invalid-feedback">
                  {errors.email}
                </div>
              )}
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label small fw-semibold">
                Password
              </label>
              <input
                type="password"
                className={`form-control rounded-3 ${errors.password ? "is-invalid" : ""}`}
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                placeholder="Create a password"
              />
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="form-label small fw-semibold">
                Confirm Password
              </label>
              <input
                type="password"
                className={`form-control rounded-3 ${errors.confirmPassword ? "is-invalid" : ""}`}
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
                placeholder="Re-enter your password"
              />
              {errors.confirmPassword && (
                <div className="invalid-feedback">
                  {errors.confirmPassword}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-dark w-100 rounded-pill py-2"
            >
              Create Account
            </button>

          </form>

          <div className="text-center mt-4">
            <small className="text-muted">
              Already have an account?{" "}
              <span
                role="button"
                className="fw-semibold text-dark"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </small>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Signup;