import React, {useState} from 'react';
import { Flashcard } from '../components/Flashcard.js';
import '../flashcard.css';
import { ToggleButton } from '@mui/material';
import front_toggle_image from '../icons/front_toggle.png';
import back_toggle_image from '../icons/back_toggle.png';
import shuffle_icon from '../icons/shuffle_icon.png';
import shuffle_on_icon from '../icons/shuffle_on_icon.png';

export function Flashcards() {


    // change flashcard logic so that the front of a flashcard can show up to 3 different japanese alphabets
    // database calls to get the flashcards
    // list all flashcards front and backs below the flashcard
    
    const initialFlashcards = [
        { front: "ichi", back: "one"},
        { front: "ni", back: "two"},
        { front: "san", back: "three"},
        { front: "shi", back: "four"},
        { front: "go", back: "five"},
        { front: "roku", back: "six"},
        { front: "nana", back: "seven"},
        { front: "hachi", back: "eight"},
        { front: "kyuu", back: "nine"},
        { front: "juu", back: "ten"}
    ];

    // controls which flashcard is shown
    const [currentIndex, setCurrentIndex] = useState(0);

    // controls which flashcard face is shown
    const [isSwapped, setSwapped] = useState(true);

    // controls shuffle
    const [shuffled, setShuffle] = useState(false);
    const [flashcards, setFlashcards] = useState(initialFlashcards);

    // controls which alphabets are shown on the front of the flashcard
    const [showRomaji, setShowRomaji] = useState(false);
    const [showKanji, setShowKanji] = useState(false);
    const [showKana, setShowKana] = useState(false);
    

    // add states for checkboxes for 3 different japanese alphabets
    // pull from database

    const shuffleFlashcards = () => {
        const shuffledFlashcards = [...flashcards].sort(() => Math.random() - 0.5);
        setFlashcards(shuffledFlashcards);
        setCurrentIndex(0);
        setShuffle((prevSelected) => !prevSelected);
    }

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
                {!isSwapped ? (
                    <Flashcard 
                        frontContent={flashcards[currentIndex].front}
                        backContent={flashcards[currentIndex].back}
                    />
                ) : (
                    <Flashcard 
                        frontContent={flashcards[currentIndex].back}
                        backContent={flashcards[currentIndex].front}
                    />
                )}
            <div>
                <button onClick={setFirstCard}>&lt;&lt;</button>
                <button onClick={prevCard}>&lt;</button>
                <button onClick={nextCard}>&gt;</button>
                <button onClick={setLastCard}>&gt;&gt;</button>
                {currentIndex + 1} / {flashcards.length}
                <ToggleButton value="check" selected={isSwapped} onChange={() => setSwapped((prevSelected) => !prevSelected)}>
                    <img src={isSwapped ? back_toggle_image : front_toggle_image} alt="Toggle between the front and back of the card" />
                </ToggleButton>
                <ToggleButton value="check" selected={shuffled} onChange={() => shuffleFlashcards((prevSelected) => !prevSelected)}>
                    <img src={shuffled ? "shuffle_icon" : "shuffle_on_icon"} alt="Toggle shuffling the flashcards" />
                </ToggleButton>
                <ToggleButton value="check" selected={showRomaji} onChange={() => setShowRomaji((prevSelected) => !prevSelected)}>
                    Romaji
                </ToggleButton>
                <ToggleButton value="check" selected={showKanji} onChange={() => setShowKanji((prevSelected) => !prevSelected)}>
                    Kanji
                </ToggleButton>
                <ToggleButton value="check" selected={showKana} onChange={() => setShowKana((prevSelected) => !prevSelected)}>
                    Kana
                </ToggleButton>
            </div>
        </div>
    );
}
