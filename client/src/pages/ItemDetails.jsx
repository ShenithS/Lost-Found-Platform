import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function ItemDetails(){

  const {id}=useParams();
  const [item,setItem]=useState(null);

  useEffect(()=>{
    const fetchItem=async()=>{
      const res=await API.get(`/items/${id}`);
      setItem(res.data);
    };
    fetchItem();
  },[id]);

  if(!item) return <p className="text-center mt-10">Loading...</p>;

  return (

    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white p-8 rounded shadow w-96">

        <h2 className="text-2xl font-bold mb-4">
          {item.title}
        </h2>

        <p className="mb-2">{item.description}</p>

        <p className="text-gray-600">
          Location: {item.location}
        </p>

        <p className="text-gray-600 mb-4">
          Date: {item.date}
        </p>

        <h3 className="font-semibold mb-2">
          Contact
        </h3>

        <p>{item.contactName}</p>
        <p>{item.contactEmail}</p>
        <p>{item.contactPhone}</p>

      </div>

    </div>
  );
}

export default ItemDetails;