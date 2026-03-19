import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Alert from "../components/Alert"; // Import Alert component

function AdminLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ message: "", type: "" });

    try {
      const res = await API.post("/auth/login", formData);

      if (res.data.user.role !== "admin") {
        setAlert({ message: "Access denied ❌", type: "error" });
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setAlert({ message: "Login successful ✅", type: "success" });

      setTimeout(() => navigate("/admin"), 1500); // redirect after 1.5s
    } catch {
      setAlert({ message: "Invalid credentials ❌", type: "error" });
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
          <h2 className="text-3xl font-bold text-center text-black">Admin Login</h2>
          <p className="text-gray-600 text-center">
            Enter your admin credentials to access the dashboard
          </p>

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-white"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-white"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 hover:scale-105 transition transform font-semibold"
          >
            Login as Admin
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;