import React from 'react';
import Flashcard from '../components/Flashcard.js';
import '../flashcard.css';

function Flashcards() {
    return (
        <div>
            <h1 className='page-title'>Japanese Flashcards</h1>
            <Flashcard frontContent="日" backContent="Sun, day, Japan" />
        </div>
    );
}

export default Flashcards;
  