import { Link } from "react-router-dom";

function ItemCard({ item }) {
  return (

    <div className="card bg-base-100 shadow-md hover:shadow-xl transition">

      {/* IMAGE */}
      <figure className="w-full h-48 overflow-hidden rounded-t-2xl flex items-center justify-center bg-gray-100">
        <img
          src={
            item.image
              ? `http://localhost:5000/uploads/${item.image}`
              : "https://via.placeholder.com/300x200?text=No+Image"
          }
          alt={item.title}
          className="max-h-full max-w-full object-contain"
        />
      </figure>

      {/* BODY */}
      <div className="card-body">

        {/* TITLE */}
        <h2 className="card-title">
          {item.title}
        </h2>

        {/* LOCATION */}
        <p className="text-gray-500">
          📍 {item.location}
        </p>

        {/* DATE */}
        <p className="text-sm text-gray-400">
          📅 {new Date(item.date).toLocaleDateString()}
        </p>

        {/* TYPE BADGE */}
        <div className="mt-2">
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

        {/* ACTION */}
        <div className="card-actions justify-end mt-4">

          <Link to={`/item/${item._id}`}>
            <button className="btn btn-primary btn-sm">
              View Details
            </button>
          </Link>

        </div>

      </div>

    </div>

  );
}

export default ItemCard;