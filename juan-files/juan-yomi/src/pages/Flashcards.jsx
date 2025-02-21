import { Link } from "react-router-dom";
import Flashcard from '../components/Flashcard.jsx';

function Flashcards() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white p-4">
            <h1 className='text-4xl font-bold mb-6'>Japanese Flashcards</h1>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                <Flashcard frontContent="日" backContent="Sun, day, Japan" />
            </div>
            <Link to="/dashboard" className="mt-6 text-blue-400 hover:underline">
                Back to Dashboard
            </Link>
        </div>
    );
}

export default Flashcards;
