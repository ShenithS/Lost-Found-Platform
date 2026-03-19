import { useEffect, useState } from "react";
import API from "../services/api";

function AdminPanel() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const res = await API.get("/items");
      setItems(res.data);
    };
    fetchItems();
  }, []);

  const deleteItem = async (id) => {
    await API.delete(`/items/${id}`);
    setItems(items.filter((item) => item._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-800 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray">
        Admin Panel
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-gray-200 p-6 rounded-2xl shadow-lg flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl text-gray-700 font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-700 mb-4">{item.location}</p>
            </div>

            <button
              onClick={() => deleteItem(item._id)}
              className="bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 hover:scale-105 transition transform font-semibold"
            >
              Delete
            </button>
          </div>
        ))}

        {items.length === 0 && (
          <p className="text-gray-600 col-span-full text-center mt-6">
            No items found
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;