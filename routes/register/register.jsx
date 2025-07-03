import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";

function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("advertiser"); // Default role

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const role = e.target.role.value; 


    try {
      const res = await apiRequest.post("/auth/register", {
        username,
        email,
        password,
        role, // Send role along with request
      });

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registerPage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" required />
          <input name="email" type="text" placeholder="Email" required />
          <input name="password" type="password" placeholder="Password" required />

          {/* Role Selection Dropdown */}
          <select name="role" onChange={(e) => setRole(e.target.value)} value={role} required>
            <option value="advertiser">Advertiser</option>
            <option value="marketer">Marketer</option>
          </select>

          <button disabled={isLoading}>Register</button>
          {error && <span>{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg0.jpg" alt="" />
      </div>
    </div>
  );
}

export default Register;
