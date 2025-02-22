import { Link } from "react-router-dom";

const Katakana = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
            <h1 className="text-4xl font-bold mb-4">Katakana Practice</h1>
            <p className="text-lg text-gray-300">Improve your Katakana skills with interactive exercises.</p>
            <Link to="/dashboard" className="mt-6 text-blue-400 hover:underline">
                Back to Dashboard
            </Link>
        </div>
    );
};

export default Katakana;
