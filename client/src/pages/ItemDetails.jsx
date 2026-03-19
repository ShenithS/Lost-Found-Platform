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

  if (!item) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gray-800 flex justify-center items-center p-6">

      <div className="card bg-base-100 shadow-xl w-full max-w-2xl">

        {/* IMAGE */}
        <figure className="w-full h-48 overflow-hidden rounded-t-2xl flex items-center justify-center bg-gray-100">
          <img
            src={
              item.image
                ? `http://localhost:5000/uploads/${item.image}`
                : "https://via.placeholder.com/500x300?text=No+Image"
            }
            alt={item.title}
            className="max-h-full max-w-full object-contain"
          />
        </figure>

        {/* BODY */}
        <div className="card-body">

          {/* TITLE */}
          <h2 className="card-title text-2xl">
            {item.title}
          </h2>

          {/* TYPE BADGE */}
          <div>
            <span
              className={`badge ${
                item.type === "lost"
                  ? "badge-error"
                  : "badge-success"
              }`}
            >
              {item.type}
            </span>
          </div>

          {/* DESCRIPTION */}
          <p className="text-gray-600 mt-2">
            {item.description}
          </p>

          {/* DETAILS */}
          <div className="mt-4 space-y-2 text-gray-700">

            <p>
              📍 <span className="font-semibold">Location:</span> {item.location}
            </p>

            <p>
              📅 <span className="font-semibold">Date:</span>{" "}
              {new Date(item.date).toLocaleDateString()}
            </p>

          </div>

          {/* CONTACT */}
          <div className="mt-6 border-t pt-4">

            <h3 className="font-semibold text-lg mb-2">
              Contact Information
            </h3>

            <p>👤 {item.contactName}</p>
            <p>📧 {item.contactEmail}</p>
            <p>📞 {item.contactPhone}</p>

          </div>

          {/* ACTIONS */}
          <div className="card-actions justify-end mt-4">

            <a
              href={`tel:${item.contactPhone}`}
              className="btn btn-success btn-sm"
            >
              Call
            </a>

            <a
              href={`mailto:${item.contactEmail}`}
              className="btn btn-outline btn-sm"
            >
              Email
            </a>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ItemDetails;