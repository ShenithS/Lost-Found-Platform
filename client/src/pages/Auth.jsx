import { Link } from "react-router-dom";

function Auth() {

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-10 rounded-lg shadow-lg text-center w-full max-w-md">

        <h2 className="text-3xl font-bold mb-4 text-blue-600">
          Welcome
        </h2>

        <p className="text-gray-600 mb-8">
          Please login or create an account to continue
        </p>

        <div className="flex flex-col gap-4">

          <Link
            to="/login"
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
          >
            Register
          </Link>

        </div>

      </div>

    </div>

  );

}

export default Auth;