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

    <div className="min-h-screen bg-gray-800 p-6">

      {/* HERO */}
      {!user && (
        <div className="hero bg-base-100 rounded-xl shadow mb-10">

          <div className="hero-content text-center py-12">

            <div className="max-w-md">

              <h1 className="text-4xl font-bold text-primary">
                Lost & Found Platform
              </h1>

              <p className="py-4 text-gray-600">
                Report lost items or help return found items quickly.
              </p>

              <div className="flex justify-center gap-4 mt-4">

                <Link to="/auth" className="btn btn-primary">
                  Get Started
                </Link>

                <Link to="/browse" className="btn btn-outline">
                  Browse Items
                </Link>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* USER SECTION */}
      {user && (
        <div className="text-center mb-8">

          <h2 className="text-xl font-semibold mb-2">
            Welcome, {user.name} 👋
          </h2>

          {user.role === "admin" && (
            <Link to="/admin" className="btn btn-secondary btn-sm">
              Admin Dashboard
            </Link>
          )}

        </div>
      )}

      {/* SEARCH */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="🔍 Search items by name or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full max-w-md"
        />
      </div>

      {/* FILTER */}
      <div className="flex justify-center mb-6">
        <div className="join">

          <button
            onClick={() => setFilter("all")}
            className={`btn join-item ${filter==="all"?"btn-primary":"btn-outline"}`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("lost")}
            className={`btn join-item ${filter==="lost"?"btn-error":"btn-outline"}`}
          >
            Lost
          </button>

          <button
            onClick={() => setFilter("found")}
            className={`btn join-item ${filter==="found"?"btn-success":"btn-outline"}`}
          >
            Found
          </button>

        </div>
      </div>

      {/* TITLE */}
      <h2 className="text-2xl font-bold mb-6 text-center">
        Latest Items
      </h2>

      {/* CONTENT */}
      {loading ? (

        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>

      ) : filteredItems.length === 0 ? (

        <p className="text-center text-gray-500">
          No matching items found
        </p>

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>

      )}

    </div>
  );
}

export default Home;