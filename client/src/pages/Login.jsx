import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login(){

  const [formData,setFormData]=useState({
    email:"",
    password:""
  });

  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  };

  const handleSubmit=async(e)=>{

    e.preventDefault();
    setLoading(true);

    try {

      const res = await API.post("/auth/login",formData);

      localStorage.setItem("token",res.data.token);
      localStorage.setItem("user",JSON.stringify(res.data.user));

      alert("Login successful");

      navigate("/");

    } catch(error){

      console.error(error);
      alert("Invalid email or password");

    } finally {

      setLoading(false);

    }

  };

  return(

    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-96">

        <h2 className="text-2xl font-bold mb-4 text-center">
          Login
        </h2>

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full border p-2 mb-4 rounded"
        />

        <button
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>

    </div>

  );

}

export default Login;