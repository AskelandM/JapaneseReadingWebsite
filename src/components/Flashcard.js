import React, { useState, useEffect } from 'react';
import '../index.css';

export function Flashcard({ frontContent, backContent }) {
    // state to keep track of whether the card is flipped
    const [isFlipped, setIsFlipped] = useState(false);

    // on click, flip the card
    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    // on space key press, flip the card
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === " ") {
                setIsFlipped((prevState) => !prevState);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        // cleanup function to remove the event listener
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    // flashcard component
    // if the card is flipped, show the back content
    return (
        <div className="card" onClick={handleClick}>
            {isFlipped ? (
                <div className="card-back">
                    <div className="card-content-back">{backContent}</div>
                </div>
            ) : (
                <div className="card-front">
                    <div className="card-content-front">{frontContent}</div>
                </div>
            )}
        </div>
    );
}
