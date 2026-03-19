import { useState } from "react";
import API from "../services/api";
import Alert from "../components/Alert"; // Import your Alert component

function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [alert, setAlert] = useState({ message: "", type: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ message: "", type: "" });

    try {
      await API.post("/auth/register", formData);
      setAlert({ message: "Registered successfully ✅", type: "success" });

      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      setAlert({ message: error.response?.data?.message || "Something went wrong ❌", type: "error" });
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
          className="bg-gray-200 p-10 rounded-2xl shadow-lg w-full space-y-6"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-bold text-center text-blue-600">Register</h2>
          <p className="text-gray-600 text-center mb-4">Create your account to get started</p>

          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-white"
          />

          <input
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
            className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 hover:scale-105 transition transform font-semibold"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;