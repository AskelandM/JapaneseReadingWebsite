import React, { useState } from 'react';
import '../index.css';

function Flashcard({ frontContent, backContent }) {
    // state to keep track of whether the card is flipped
    const [isFlipped, setIsFlipped] = useState(false);

    // on click, flip the card
    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    // Flashcard component
    return (
        <div className="card" onClick={handleClick}>
            {isFlipped ? (
                <div className="card-back">
                    <div className="card-content">{backContent}</div>
                </div>
            ) : (
                <div className="card-front">
                    <div className="card-content">{frontContent}</div>
                </div>
            )}
        </div>
    );
}

export default Flashcard;
