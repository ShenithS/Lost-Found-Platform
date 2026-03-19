import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import ItemCard from "../components/ItemCard";

function Home() {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const fetchItems = async () => {
      try {
        const res = await API.get("/items");
        setItems(res.data.slice(0, 6));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();

  }, []);

  const filteredItems = items.filter((item) => {

    const matchesFilter =
      filter === "all" || item.type === filter;

    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      {/* HERO */}
      {!user && (
        <div className="text-center mb-12">

          <h1 className="text-4xl font-bold text-blue-600 mb-3">
            Lost & Found Platform
          </h1>

          <p className="text-gray-600">
            Report lost items or help return found items quickly.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-6">

            <Link to="/auth" className="bg-blue-600 text-white px-6 py-2 rounded">
              Get Started
            </Link>

            <Link to="/browse" className="bg-gray-700 text-white px-6 py-2 rounded">
              Browse Items
            </Link>



          </div>

        </div>
      )}

      {/* USER VIEW */}
      {user && (
        <div className="text-center mb-6">

          <h2 className="text-xl mb-3">
            Welcome, {user.name} 👋
          </h2>


          {user.role === "admin" && (
            <Link
              to="/admin"
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Go to Admin Dashboard
            </Link>
          )}

        </div>
      )}

      {/* SEARCH */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md p-2 border rounded"
        />
      </div>

      {/* FILTER */}
      <div className="flex justify-center gap-4 mb-6">
        <button onClick={() => setFilter("all")} className={`px-4 py-2 rounded ${filter==="all"?"bg-blue-600 text-white":"bg-gray-200"}`}>All</button>
        <button onClick={() => setFilter("lost")} className={`px-4 py-2 rounded ${filter==="lost"?"bg-red-500 text-white":"bg-gray-200"}`}>Lost</button>
        <button onClick={() => setFilter("found")} className={`px-4 py-2 rounded ${filter==="found"?"bg-green-500 text-white":"bg-gray-200"}`}>Found</button>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-center">
        Latest Items
      </h2>

      {loading ? (

        <p className="text-center">Loading...</p>

      ) : filteredItems.length === 0 ? (

        <p className="text-center text-gray-500">
          No matching items found
        </p>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>

      )}

    </div>
  );
}

export default Home;