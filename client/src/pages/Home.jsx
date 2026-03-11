import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">

      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Lost & Found Platform
      </h1>

      <p className="text-gray-600 mb-8">
        Report lost items or help return found items
      </p>

      <div className="flex gap-4">

        <Link
          to="/report-lost"
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
        >
          Report Lost
        </Link>

        <Link
          to="/report-found"
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
        >
          Report Found
        </Link>

        <Link
          to="/browse"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Browse Items
        </Link>

      </div>

    </div>
  );
}

export default Home;