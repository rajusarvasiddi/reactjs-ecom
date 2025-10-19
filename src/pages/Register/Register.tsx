import { useState } from "react";
import logo from "./.././../logo.svg"; // Make sure this path matches your logo file
import "./Register.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Register = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = () => {};

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
          <p>Register to join GMS</p>
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
        >
          Register
        </Button>

        <div className="login-links">
          Already have an account with GMS?
          <Link to="/login"> Login here</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
