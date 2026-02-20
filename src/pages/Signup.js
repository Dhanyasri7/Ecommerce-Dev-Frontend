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

    const nameRegex = /^[a-zA-Z0-9]{3,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]{4,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;

    if (!nameRegex.test(form.name)) {
      newErrors.name =
        "Name must be alphanumeric and at least 3 characters";
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
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="col-md-6 col-lg-4">
        <div className="card shadow-sm p-4">

          <h4 className="mb-4 text-center">Signup</h4>

          <form autoComplete="off" onSubmit={handleSignup} noValidate>

            {/* Name */}
            <div className="mb-3">
              <label className="form-label small">Name</label>
              <input
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
              {errors.name && (
                <div className="invalid-feedback">
                  {errors.name}
                </div>
              )}
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label small">Email</label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
              {errors.email && (
                <div className="invalid-feedback">
                  {errors.email}
                </div>
              )}
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label small">Password</label>
              <input
                type="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-3">
              <label className="form-label small">Confirm Password</label>
              <input
                type="password"
                className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
              />
              {errors.confirmPassword && (
                <div className="invalid-feedback">
                  {errors.confirmPassword}
                </div>
              )}
            </div>

            <button type="submit" className="btn btn-dark w-100 mb-3">
              Signup
            </button>

          </form>

          <div className="text-center">
            <small>
              Already have an account?{" "}
              <span
                style={{ cursor: "pointer" }}
                className="text-dark fw-semibold"
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
