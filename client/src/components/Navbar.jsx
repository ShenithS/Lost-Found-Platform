import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }

  }, [location]);

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    navigate("/");

  };

  return (

    <nav className="bg-blue-600 text-white shadow-md">

      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">

        <Link to="/" className="text-xl font-bold">
          Lost & Found
        </Link>

        <div className="flex gap-6 items-center">

          <Link to="/" className="hover:text-gray-200">
            Home
          </Link>

          <Link to="/browse" className="hover:text-gray-200">
            Browse
          </Link>

          {user ? (

            <>
              <Link to="/report-lost" className="hover:text-gray-200">
                Report Lost
              </Link>

              <Link to="/report-found" className="hover:text-gray-200">
                Report Found
              </Link>

              <span className="font-medium">
                {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>

          ) : (

            <>
              <Link to="/login" className="hover:text-gray-200">
                Login
              </Link>

              <Link
                to="/register"
                className="bg-green-500 px-3 py-1 rounded hover:bg-green-600"
              >
                Register
              </Link>

              <Link
                to="/admin-login"
                className="bg-black text-white px-6 py-2 rounded hover:bg-gray-900"
              >
                Admin Panel
              </Link>             
            </>

          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;