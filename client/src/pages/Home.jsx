import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import ItemCard from "../components/ItemCard";

function Home() {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchItems = async () => {

      try {

        const res = await API.get("/items");

        setItems(res.data.slice(0, 3));

      } catch (error) {

        console.error("Error fetching items:", error);

      } finally {

        setLoading(false);

      }

    };

    fetchItems();

  }, []);

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      {/* Hero Section */}
      <div className="text-center mb-12">

        <h1 className="text-4xl font-bold text-blue-600 mb-3">
          Lost & Found Platform
        </h1>

        <p className="text-gray-600">
          Report lost items or help return found items quickly.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-6">

          <Link
            to="/auth"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Get Started
          </Link>

          <Link
            to="/browse"
            className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-800 transition"
          >
            Browse Items
          </Link>

        </div>

      </div>

      {/* Latest Items */}
      <h2 className="text-2xl font-bold mb-6 text-center">
        Latest Items
      </h2>

      {loading ? (

        <p className="text-center text-gray-500">
          Loading items...
        </p>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {items.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}

        </div>

      )}

    </div>

  );
}

export default Home;