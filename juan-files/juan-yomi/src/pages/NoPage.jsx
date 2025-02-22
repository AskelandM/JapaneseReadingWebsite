import { Link } from "react-router-dom";

const NoPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-lg mt-4">Page Not Found</p>
      <Link to="/" className="mt-6 text-blue-400 hover:underline">
        Go back to Home
      </Link>
    </div>
  );
};

export default NoPage;
