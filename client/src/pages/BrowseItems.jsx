import { useEffect, useState } from "react";
import API from "../services/api";
import ItemCard from "../components/ItemCard";

function BrowseItems() {

  const [items, setItems] = useState([]);

  useEffect(() => {

    const fetchItems = async () => {

      try {

        const res = await API.get("/items");
        setItems(res.data);

      } catch (error) {

        console.error("Error fetching items:", error);

      }

    };

    fetchItems();

  }, []);

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <h2 className="text-3xl font-bold mb-6 text-center">
        Browse Items
      </h2>

      {items.length === 0 ? (
        <p className="text-center text-gray-500">
          No items found
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

export default BrowseItems;