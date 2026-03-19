import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AdminLogin(){

  const [formData,setFormData]=useState({
    email:"",
    password:""
  });

  const navigate = useNavigate();

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();

    try {

      const res = await API.post("/auth/login",formData);

      if(res.data.user.role !== "admin"){
        alert("Access denied");
        return;
      }

      localStorage.setItem("token",res.data.token);
      localStorage.setItem("user",JSON.stringify(res.data.user));

      navigate("/admin");

    } catch {
      alert("Invalid credentials");
    }
  };

  return(

    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-96">

        <h2 className="text-xl font-bold mb-4 text-center">
          Admin Login
        </h2>

        <input name="email" placeholder="Email" onChange={handleChange} className="w-full border p-2 mb-3"/>

        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full border p-2 mb-4"/>

        <button className="w-full bg-black text-white py-2 rounded">
          Login as Admin
        </button>

      </form>

    </div>
  );
}

export default AdminLogin;