import { useState } from "react";
import API from "../services/api";

function ReportLost() {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    image: null // ✅ added
  });

  const handleChange = (e) => {

    if (e.target.name === "image") {
      setFormData({
        ...formData,
        image: e.target.files[0]
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      data.append("type", "lost");

      await API.post("/items", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Lost item reported successfully!");

      // reset form
      setFormData({
        title: "",
        description: "",
        location: "",
        date: "",
        contactName: "",
        contactEmail: "",
        contactPhone: "",
        image: null
      });

    } catch (error) {

      console.error("Error submitting form:", error);
      alert("Something went wrong");

    }
  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >

        <h2 className="text-2xl font-bold mb-6 text-center text-red-600">
          Report Lost Item
        </h2>

        <input
          name="title"
          placeholder="Item Name"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border p-2 mb-3 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          name="contactName"
          placeholder="Your Name"
          value={formData.contactName}
          onChange={handleChange}
          required
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="email"
          name="contactEmail"
          placeholder="Email"
          value={formData.contactEmail}
          onChange={handleChange}
          required
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          name="contactPhone"
          placeholder="Phone Number"
          value={formData.contactPhone}
          onChange={handleChange}
          required
          className="w-full border p-2 mb-3 rounded"
        />

        {/* ✅ IMAGE INPUT */}
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="w-full mb-4"
        />

        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
        >
          Submit
        </button>

      </form>

    </div>
  );
}

export default ReportLost;