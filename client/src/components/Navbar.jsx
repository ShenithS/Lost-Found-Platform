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

    <div className="navbar bg-base-100 shadow-md px-6">

      {/* LEFT */}
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold text-primary">
          Lost & Found
        </Link>
      </div>

      {/* RIGHT */}
      <div className="flex-none gap-4 items-center">

        <Link to="/" className="btn btn-ghost text-base">
          Home
        </Link>

        <Link to="/browse" className="btn btn-ghost text-base">
          Browse
        </Link>

        {user ? (

          <>
            <Link to="/report-lost" className="btn btn-ghost text-base">
              Report Lost
            </Link>

            <Link to="/report-found" className="btn btn-ghost text-base">
              Report Found
            </Link>

            {/* USER DROPDOWN */}
            <div className="dropdown dropdown-end">

              <label tabIndex={0} className="btn btn-ghost btn-circle avatar placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-10">
                  <span className="text-lg">
                    {user.name?.charAt(0)}
                  </span>
                </div>
              </label>

              <ul className="menu menu-md dropdown-content mt-3 z-[1] p-3 shadow bg-base-100 rounded-box w-56 text-base">
                <li>
                  <span className="font-semibold text-lg">{user.name}</span>
                </li>

                <li>
                  <button onClick={handleLogout} className="text-red-500">
                    Logout
                  </button>
                </li>
              </ul>

            </div>

          </>

        ) : (

          <>
            <Link to="/login" className="btn btn-outline text-base px-4">
              Login
            </Link>

            <Link to="/register" className="btn btn-primary text-base px-4">
              Register
            </Link>

            <Link to="/admin-login" className="btn btn-neutral text-base px-4">
              Admin
            </Link>
          </>

        )}

      </div>

    </div>

  );
}

export default Navbar;