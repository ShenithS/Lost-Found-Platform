import { useState } from "react";
import API from "../services/api";

function ReportLost() {

  const [formData, setFormData] = useState({
    title:"",
    description:"",
    location:"",
    date:"",
    contactName:"",
    contactEmail:"",
    contactPhone:""
  });

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/items",{...formData,type:"lost"});
    alert("Item reported successfully");
  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >

        <h2 className="text-2xl font-bold mb-6 text-center">
          Report Lost Item
        </h2>

        <input
          name="title"
          placeholder="Item Name"
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          name="location"
          placeholder="Location"
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="date"
          name="date"
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          name="contactName"
          placeholder="Your Name"
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          name="contactEmail"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          name="contactPhone"
          placeholder="Phone Number"
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
        />

        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Submit
        </button>

      </form>

    </div>
  );
}

export default ReportLost;