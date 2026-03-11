import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-md">

      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">

        <h1 className="text-xl font-bold">
          Lost & Found
        </h1>

        <div className="flex gap-6">

          <Link
            to="/"
            className="hover:text-gray-200"
          >
            Home
          </Link>

          <Link
            to="/report-lost"
            className="hover:text-gray-200"
          >
            Report Lost
          </Link>

          <Link
            to="/report-found"
            className="hover:text-gray-200"
          >
            Report Found
          </Link>

          <Link
            to="/browse"
            className="hover:text-gray-200"
          >
            Browse
          </Link>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;