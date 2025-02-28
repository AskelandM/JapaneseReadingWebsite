import React, {useState} from 'react';
import { Flashcard } from '../components/Flashcard.js';
import '../flashcard.css';
import { ToggleButton } from '@mui/material';
import front_toggle_image from '../icons/front_toggle.png';
import back_toggle_image from '../icons/back_toggle.png';

export function Flashcards() {

    const flashcards = [
        { front: "ichi", back: "one"},
        { front: "ni", back: "two"},
        { front: "san", back: "three"},
        { front: "shi", back: "four"},
        { front: "go", back: "five"},
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selected, setSelected] = useState(false);

    const nextCard = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    };

    const prevCard = () => {
        setCurrentIndex((prevIndex) => prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1);
    };

    const setFirstCard = () => {
        setCurrentIndex(0);
    }

    const setLastCard = () => {
        setCurrentIndex(flashcards.length - 1);
    }

    return (
        <div>
            <h1 className='page-title'>Flashcards</h1>
            <Flashcard 
                frontContent={flashcards[currentIndex].front}
                backContent={flashcards[currentIndex].back}
            />
            <div>
                <button onClick={setFirstCard}>&lt;&lt;</button>
                <button onClick={prevCard}>&lt;</button>
                <button onClick={nextCard}>&gt;</button>
                <button onClick={setLastCard}>&gt;&gt;</button>
                {currentIndex + 1} / {flashcards.length}
                <ToggleButton value="check" selected={selected} onChange={() => setSelected((prevSelected) => !prevSelected)}>
                    <img src={selected ? back_toggle_image : front_toggle_image} alt="Toggle between the front and back of the card" />
                </ToggleButton>
            </div>
        </div>
    );
}


  