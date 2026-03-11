function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-10">

      <div className="max-w-6xl mx-auto px-4 py-6 text-center">

        <p className="text-sm">
          © {new Date().getFullYear()} Lost & Found Platform
        </p>

        <p className="text-gray-400 text-sm mt-1">
          Helping people recover lost items
        </p>

      </div>

    </footer>
  );
}

export default Footer;