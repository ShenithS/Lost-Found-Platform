import { useState } from "react";
import API from "../services/api";

function Register() {

  const [formData, setFormData] = useState({
    name:"",
    email:"",
    password:""
  });

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();

    await API.post("/auth/register",formData);

    alert("Registered successfully");
  };

  return(

    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-96">

        <h2 className="text-2xl font-bold mb-4 text-center">
          Register
        </h2>

        <input name="name" placeholder="Name" onChange={handleChange} className="w-full border p-2 mb-3"/>

        <input name="email" placeholder="Email" onChange={handleChange} className="w-full border p-2 mb-3"/>

        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full border p-2 mb-4"/>

        <button className="w-full bg-blue-500 text-white py-2 rounded">
          Register
        </button>

      </form>

    </div>

  );

}

export default Register;