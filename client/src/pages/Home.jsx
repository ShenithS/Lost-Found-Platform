import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import ItemCard from "../components/ItemCard";

function Home() {

  const [items, setItems] = useState([]);

  useEffect(() => {

    const fetchItems = async () => {

      const res = await API.get("/items");

      setItems(res.data.slice(0, 3));

    };

    fetchItems();

  }, []);

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <div className="text-center mb-10">

        <h1 className="text-4xl font-bold text-blue-600 mb-3">
          Lost & Found Platform
        </h1>

        <p className="text-gray-600">
          Report lost items or help return found items quickly.
        </p>

        <div className="flex justify-center gap-4 mt-6">

          <Link to="/report-lost" className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">
            Report Lost
          </Link>

          <Link to="/report-found" className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
            Report Found
          </Link>

          <Link to="/browse" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
            Browse Items
          </Link>

        </div>

      </div>

      <h2 className="text-2xl font-bold mb-6 text-center">
        Latest Items
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {items.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}

      </div>

    </div>

  );
}

export default Home;