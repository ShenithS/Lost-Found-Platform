import { useState } from "react";
import API from "../services/api";

function ReportFound() {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    image: null
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      data.append("type", "found");

      await API.post("/items", data, { headers: { "Content-Type": "multipart/form-data" } });

      alert("Found item reported successfully!");
      setFormData({ title: "", description: "", location: "", date: "", contactName: "", contactEmail: "", contactPhone: "", image: null });

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-800 p-6">
      <form onSubmit={handleSubmit} className="bg-gray-300 p-10 rounded-2xl shadow-lg w-full max-w-md space-y-4">

        <h2 className="text-3xl font-bold mb-2 text-center text-green-600">
          Report Found Item
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Fill in the details below to report a found item
        </p>

        <input name="title" placeholder="Item Name" value={formData.title} onChange={handleChange} required className="input input-bordered w-full" />

        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="textarea textarea-bordered w-full" />

        <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required className="input input-bordered w-full" />

        <input type="date" name="date" value={formData.date} onChange={handleChange} required className="input input-bordered w-full" />

        <input name="contactName" placeholder="Your Name" value={formData.contactName} onChange={handleChange} required className="input input-bordered w-full" />

        <input type="email" name="contactEmail" placeholder="Email" value={formData.contactEmail} onChange={handleChange} required className="input input-bordered w-full" />

        <input name="contactPhone" placeholder="Phone Number" value={formData.contactPhone} onChange={handleChange} required className="input input-bordered w-full" />

        <label className="flex items-center gap-2 cursor-pointer">
          <span className="px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 transition">
            Upload Image
          </span>
          <input type="file" name="image" onChange={handleChange} className="hidden" />
          {formData.image && <span className="text-gray-500">{formData.image.name}</span>}
        </label>

        <button type="submit" className="w-full bg-green-500 text-white py-3 rounded-xl hover:bg-green-600 hover:scale-105 transition transform font-semibold">
          Submit
        </button>

      </form>
    </div>
  );
}

export default ReportFound;