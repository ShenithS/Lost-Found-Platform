import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Alert from "../components/Alert"; // <-- import the Alert component

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" }); // <-- state for alerts
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setAlert({ message: "Login successful ✅", type: "success" });

      setTimeout(() => navigate("/"), 1500); // redirect after 1.5s
    } catch (error) {
      console.error(error);
      setAlert({ message: "Invalid email or password ❌", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-800 p-6">
      <div className="w-full max-w-md space-y-6">
        {/* Display Alert if message exists */}
        {alert.message && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert({ message: "", type: "" })}
            duration={4000}
          />
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-gray-200 p-10 rounded-2xl shadow-lg w-full space-y-6"
        >
          <h2 className="text-3xl font-bold text-center text-blue-600">Login</h2>
          <p className="text-gray-600 text-center mb-6">
            Enter your credentials to access your account
          </p>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-white"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-white"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 hover:scale-105 transition transform font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;