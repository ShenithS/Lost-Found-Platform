import { Link } from "react-router-dom";

function ItemCard({ item }) {

  return (

    <div className="bg-white p-4 rounded-lg shadow-md">

      {item.image && (
        <img
          src={`http://localhost:5000/uploads/${item.image}`}
          alt={item.title}
          className="w-full h-40 object-cover rounded mb-3"
        />
      )}

      <h3 className="text-lg font-semibold">
        {item.title}
      </h3>

      <p className="text-gray-500">
        {item.location}
      </p>

      <p className="text-sm text-gray-400 mb-3">
        {new Date(item.date).toLocaleDateString()}
      </p>

      <Link
        to={`/item/${item._id}`}
        className="text-blue-500 hover:underline"
      >
        View Details
      </Link>

    </div>

  );
}

export default ItemCard;