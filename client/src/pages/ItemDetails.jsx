import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function ItemDetails() {

  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {

    const fetchItem = async () => {

      try {

        const res = await API.get(`/items/${id}`);
        setItem(res.data);

      } catch (error) {

        console.error("Error fetching item:", error);

      }

    };

    fetchItem();

  }, [id]);

  if (!item)
    return (
      <p className="text-center mt-20 text-gray-500">
        Loading item details...
      </p>
    );

  return (

    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">

        {item.image && (
          <img
            src={`http://localhost:5000/uploads/${item.image}`}
            alt={item.title}
            className="w-full h-60 object-cover rounded mb-4"
          />
        )}

        <h2 className="text-2xl font-bold mb-4 text-center">
          {item.title}
        </h2>

        <p className="text-gray-700 mb-4">
          {item.description}
        </p>

        <div className="space-y-2 text-gray-600">

          <p>
            <span className="font-semibold">Location:</span> {item.location}
          </p>

          <p>
            <span className="font-semibold">Date:</span>{" "}
            {new Date(item.date).toLocaleDateString()}
          </p>

          <p>
            <span className="font-semibold">Type:</span> {item.type}
          </p>

        </div>

        <div className="mt-6 border-t pt-4">

          <h3 className="font-semibold mb-2 text-lg">
            Contact Information
          </h3>

          <p>{item.contactName}</p>
          <p>{item.contactEmail}</p>
          <p>{item.contactPhone}</p>

        </div>

      </div>

    </div>
  );
}

export default ItemDetails;