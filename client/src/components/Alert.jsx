import { useEffect } from "react";

function Alert({ type = "info", message, onClose, duration = 5000 }) {
  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(() => onClose(), duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  // Type-based styles
  const typeStyles = {
    success: "bg-green-100 text-green-700 border-green-300",
    error: "bg-red-100 text-red-700 border-red-300",
    info: "bg-blue-100 text-blue-700 border-blue-300",
    warning: "bg-yellow-100 text-yellow-700 border-yellow-300",
  };

  return (
    <div
      className={`flex justify-between items-center p-4 rounded-2xl border shadow-md ${typeStyles[type]} w-full max-w-md mx-auto mb-4`}
    >
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 font-bold text-xl leading-none hover:text-gray-800 transition"
        >
          &times;
        </button>
      )}
    </div>
  );
}

export default Alert;