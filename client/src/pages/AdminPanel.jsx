import { useEffect, useState } from "react";
import API from "../services/api";

function AdminPanel(){

  const [items,setItems]=useState([]);

  useEffect(()=>{
    const fetchItems = async ()=>{
      const res = await API.get("/items");
      setItems(res.data);
    };
    fetchItems();
  },[]);

  const deleteItem = async(id)=>{
    await API.delete(`/items/${id}`);
    setItems(items.filter(item=>item._id !== id));
  };

  return(

    <div className="p-8">

      <h1 className="text-2xl font-bold mb-6">
        Admin Panel
      </h1>

      {items.map(item=>(
        <div key={item._id} className="border p-4 mb-3 rounded">

          <h3 className="font-semibold">{item.title}</h3>

          <p>{item.location}</p>

          <button
            onClick={()=>deleteItem(item._id)}
            className="bg-red-500 text-white px-3 py-1 mt-2 rounded"
          >
            Delete
          </button>

        </div>
      ))}

    </div>
  );
}

export default AdminPanel;