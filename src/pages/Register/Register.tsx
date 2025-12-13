import { useState } from "react";
import logo from "./.././../logo.svg"; // Make sure this path matches your logo file
import "./Register.css";
import { useNavigate, Link } from "react-router-dom";
import { Button, CircularProgress, Alert } from "@mui/material";
import { register } from "../../services/authService";
import { PORTAL_TITLE } from "../../constants";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setLoading(true);
      setError(null);
      setSuccess(null);
      try {
        await register(email, password);
        setSuccess("Registration successful! You can now login.");
        setEmail("");
        setPassword("");
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || err.message || "Registration failed";
        setError(errorMessage);
      } finally {
        setLoading(false);
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
            <h2>{PORTAL_TITLE}</h2>
          </Link>
          <p>Register to join GMS</p>
          {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mt: 2, width: '100%' }}>{success}</Alert>}
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
            minHeight: "24px",
            lineHeight: 1,
          }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
        </Button>

        <div className="login-links">
          Already have an account with GMS?
          <Link to="/login"> Login here</Link>
        </div>
      </form>
    </div >
  );
};

export default Register;
