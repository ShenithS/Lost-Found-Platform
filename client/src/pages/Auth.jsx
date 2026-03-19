import { Link } from "react-router-dom";

function Auth() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 p-6">
      <div className="bg-gray-200 p-10 rounded-2xl shadow-lg text-center w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-blue-600">Welcome</h2>
        <p className="text-gray-600">
          Please login or create an account to continue
        </p>

        <div className="flex flex-col gap-4">
          <Link
            to="/login"
            className="bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 hover:scale-105 transition transform font-semibold"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-green-500 text-white py-3 rounded-xl hover:bg-green-600 hover:scale-105 transition transform font-semibold"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Auth;