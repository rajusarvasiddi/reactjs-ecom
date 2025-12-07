import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import logo from "./.././../logo.svg"; // Make sure this path matches your logo file
import { Button, CircularProgress, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../services/authService";
import { loginStart, loginSuccess, loginFailure } from "../../store/authSlice";
import { RootState } from "../../store/store";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      dispatch(loginStart());
      try {
        await login(email, password);
        dispatch(loginSuccess());
        navigate("/admin/dashboard");
      } catch (err: any) {
        dispatch(loginFailure(err.message));
      }
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
          {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>}
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

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            paddingTop: "1px",
            paddingBottom: "1px",
            paddingLeft: "16px",
            paddingRight: "16px",
            minHeight: "24px", // or even 24px if you want ultra-compact
            lineHeight: 1,
          }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
        </Button>

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
