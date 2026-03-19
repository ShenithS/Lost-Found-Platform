import { useState } from "react";
import API from "../services/api";

function Register() {

  const [formData, setFormData] = useState({
    name:"",
    email:"",
    password:""
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();

    setErrorMsg("");
    setSuccessMsg("");

    try {

      await API.post("/auth/register",formData);

      setSuccessMsg("Registered successfully ✅");

      // reset form
      setFormData({
        name:"",
        email:"",
        password:""
      });

    } catch (error) {

      setErrorMsg(
        error.response?.data?.message || "Something went wrong"
      );

    }
  };

  return(

    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-96">

        <h2 className="text-2xl font-bold mb-4 text-center">
          Register
        </h2>

        {/* ✅ Error Message */}
        {errorMsg && (
          <p className="text-red-500 text-sm mb-3 text-center">
            {errorMsg}
          </p>
        )}

        {/* ✅ Success Message */}
        {successMsg && (
          <p className="text-green-500 text-sm mb-3 text-center">
            {successMsg}
          </p>
        )}

        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full border p-2 mb-4 rounded"
        />

        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Register
        </button>

      </form>

    </div>

  );

}

export default Register;