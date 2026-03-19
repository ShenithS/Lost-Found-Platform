import { useEffect, useState } from "react";
import API from "../services/api";
import ItemCard from "../components/ItemCard";

function BrowseItems() {

  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      const res = await API.get("/items");
      setItems(res.data);
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

    <div className="min-h-screen bg-gray-800 py-10 px-4">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-2">
            Browse Items
          </h2>
          <p className="text-gray-500">
            Find lost or found items easily
          </p>
        </div>

        {/* SEARCH */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="🔍 Search by title or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full max-w-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* FILTER */}
        <div className="flex justify-center gap-3 mb-8 flex-wrap">

          <button
            onClick={() => setFilter("all")}
            className={`btn rounded-full px-6 ${
              filter === "all"
                ? "btn-primary"
                : "btn-outline"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("lost")}
            className={`btn rounded-full px-6 ${
              filter === "lost"
                ? "bg-red-500 text-white"
                : "btn-outline"
            }`}
          >
            Lost
          </button>

          <button
            onClick={() => setFilter("found")}
            className={`btn rounded-full px-6 ${
              filter === "found"
                ? "bg-green-500 text-white"
                : "btn-outline"
            }`}
          >
            Found
          </button>

        </div>

        {/* RESULTS */}
        {filteredItems.length === 0 ? (

          <div className="text-center mt-16">
            <h3 className="text-xl font-semibold text-gray-600">
              No matching items found 😕
            </h3>
            <p className="text-gray-400 mt-2">
              Try changing filters or search keywords
            </p>
          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {filteredItems.map(item => (
              <ItemCard key={item._id} item={item} />
            ))}

          </div>

        )}

      </div>

    </div>

  );
}

export default BrowseItems;