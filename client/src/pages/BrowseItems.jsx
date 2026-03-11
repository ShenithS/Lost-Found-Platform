import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function BrowseItems() {

  const [items,setItems]=useState([]);

  useEffect(()=>{
    const fetchItems=async()=>{
      const res=await API.get("/items");
      setItems(res.data);
    };
    fetchItems();
  },[]);

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <h2 className="text-3xl font-bold mb-6 text-center">
        Browse Items
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {items.map((item)=>(
          <div
            key={item._id}
            className="bg-white p-4 rounded shadow"
          >

            <h3 className="text-xl font-semibold">
              {item.title}
            </h3>

            <p className="text-gray-500">
              {item.location}
            </p>

            <Link
              to={`/item/${item._id}`}
              className="text-blue-500 hover:underline"
            >
              View Details
            </Link>

          </div>
        ))}

      </div>

    </div>
  );
}

export default BrowseItems;