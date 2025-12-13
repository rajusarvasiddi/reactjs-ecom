import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import logo from "./.././../logo.svg"; // Make sure this path matches your logo file
import { Button, CircularProgress, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../services/authService";
import { loginStart, loginSuccess, loginFailure, clearError } from "../../store/authSlice";
import { setRole } from "../../store/roleSlice";
import { RootState } from "../../store/store";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Rate limiting state
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutEndTime, setLockoutEndTime] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Countdown timer for lockout
  useEffect(() => {
    if (lockoutEndTime) {
      const interval = setInterval(() => {
        const now = Date.now();
        const remaining = Math.max(0, Math.ceil((lockoutEndTime - now) / 1000));
        setRemainingTime(remaining);

        if (remaining === 0) {
          setLockoutEndTime(null);
          setFailedAttempts(0);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [lockoutEndTime]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if locked out
    if (lockoutEndTime && Date.now() < lockoutEndTime) {
      return;
    }

    if (email && password) {
      dispatch(loginStart());
      try {
        const data: any = await login(email, password);
        dispatch(loginSuccess());
        if (data?.user?.role) {
          dispatch(setRole(data.user.role));
        }
        setFailedAttempts(0);
        setLockoutEndTime(null);
        navigate("/admin/dashboard");
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || err.message || "Login failed";
        dispatch(loginFailure(errorMessage));

        // Rate limiting logic
        const newAttempts = failedAttempts + 1;
        setFailedAttempts(newAttempts);

        // Exponential backoff: 30s, 60s, 120s, 300s
        if (newAttempts >= 3) {
          const lockoutDuration = Math.min(30 * Math.pow(2, newAttempts - 3), 300) * 1000;
          setLockoutEndTime(Date.now() + lockoutDuration);
          // Clear the error from Redux so only lockout warning shows
          dispatch(clearError());
        }
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
          {lockoutEndTime && remainingTime > 0 && (
            <Alert severity="warning" sx={{ mt: 2, width: '100%' }}>
              Too many failed attempts. Please wait {remainingTime} seconds.
            </Alert>
          )}
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
          disabled={loading || (lockoutEndTime !== null && remainingTime > 0)}
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
