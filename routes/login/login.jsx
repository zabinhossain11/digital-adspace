import { useContext, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/login", {
        username,
        password,
      });

      updateUser(res.data); // ✅ Save user data globally

      // ✅ Redirect based on role
      if (res.data.role === "advertiser") {
        navigate("/");
      } else if (res.data.role === "marketer") {
        navigate("/");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back to AdEco</h1>
          <input
            name="username"
            required
            minLength={3}
            maxLength={20}
            type="text"
            placeholder="Username"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
          />
          <button disabled={isLoading}>{isLoading ? "Logging in..." : "Login"}</button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} have an account? Sign up</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg0.jpg" alt="Login Background" />
      </div>
    </div>
  );
}

export default Login;
