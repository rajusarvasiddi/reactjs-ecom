import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import logo from "./.././../logo.svg"; // Make sure this path matches your logo file

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      navigate("/admin/garage-create");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="logo-section">
          <Link
            to={"/"}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              textDecoration: "none",
              color: "inherit",
              justifyContent: "center",
            }}
          >
            <img src={logo} alt="App Logo" className="logo" />
            <h2>GMS</h2>
          </Link>
          <p>Please login to continue</p>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>

        <div className="login-links">
          <Link to="/forgot-password">Forgot Password?</Link>
          <span> | </span>
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
