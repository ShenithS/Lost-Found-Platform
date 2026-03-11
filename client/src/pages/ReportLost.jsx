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
    contactPhone: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await API.post("/items", {
        ...formData,
        type: "lost"
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
        contactPhone: ""
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
          className="w-full border p-2 mb-4 rounded"
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