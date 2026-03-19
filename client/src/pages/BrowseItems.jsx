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

    <div className="min-h-screen bg-gray-100 p-8">

      <h2 className="text-3xl font-bold mb-6 text-center">
        Browse Items
      </h2>

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

      {filteredItems.length === 0 ? (

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

export default BrowseItems;