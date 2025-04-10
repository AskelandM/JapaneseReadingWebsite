import React, { useState, useEffect } from 'react';
import { Flashcard } from '../components/Flashcard.js';
import '../flashcard.css';
import { ToggleButton } from '@mui/material';
import front_toggle_image from '../icons/front_toggle.png';
import back_toggle_image from '../icons/back_toggle.png';
import { useLocation } from 'react-router';
import supabase from './supabaseclient.js';
import shuffle_icon from '../icons/shuffle_icon.png';
import shuffle_on_icon from '../icons/shuffle_on_icon.png';

export function Flashcards() {

    // controls which alphabets are shown on the front of the flashcard
    // Romaji shown by default
    const [showRomaji, setShowRomaji] = useState(true);
    const [showKanji, setShowKanji] = useState(false);
    const [showKana, setShowKana] = useState(false);

    const [wordList, setWords] = React.useState([{kana: "loading...", kanji: "loading...", romaji: "loading...", English: "loading..."}]);
    const initialFlashcards = wordList;

    // cards that will be displayed after choosing romaji, kana, kanji
    const outputFlashcards = initialFlashcards.map(word => ({
        front: word.English, 
        back: `${showRomaji ? word.romaji : ''} ${showKana ? word.kana : ''} ${showKanji ? word.kanji : ''}`.trim()
    }));

    // get lesson # from URL
    const location = useLocation();
    const searchParams = new URLSearchParams(
        location.search
    );
    const lesson = searchParams.get("lesson");

    // get words from DB
    useEffect(() => {       
        async function getWords() {         
            const { data, error } = await supabase        
            .from('Words')        
            .select(`kana, kanji, romaji, English`)        
            .eq('lesson', lesson)               
            if (error) {          
                console.warn(error)        
            } else if (data) { 
                // wordList = data;   
                setWords(data);   
            }      
            console.log("from DB:");
            console.log(wordList);
        }

        getWords() 
    }, [])

    // update wordList when wordList changes
    useEffect(() => {
        console.log("Updated wordList:", wordList);
    }, [wordList]);

    // change flashcard logic so that the front of a flashcard can show up to 3 different japanese alphabets
    // database calls to get the flashcards
    // list all flashcards front and backs below the flashcard

    // flashcard data should come in form of word, romaji, kana, kanji
    // flashcards are then constructed with word on the front and the back being dependent on the state of the romaji, kana, kanji toggles

    // controls which flashcard is shown
    const [currentIndex, setCurrentIndex] = useState(0);

    // controls which flashcard face is shown
    const [isSwapped, setSwapped] = useState(true);

    // controls shuffle
    const [shuffled, setShuffle] = useState(false);
    const [flashcards, setFlashcards] = useState([]);

    useEffect(() => {
        setFlashcards(wordList.map(word => ({
            front: word.English, 
            back: `${showRomaji ? word.romaji : ''} ${showKana ? word.kana : ''} ${showKanji ? word.kanji : ''}`.trim()
        })));
    }, [wordList, showRomaji, showKana, showKanji]);

    // add states for checkboxes for 3 different japanese alphabets
    // pull from database

    const shuffleFlashcards = () => {
        if (shuffled) {
            setFlashcards(outputFlashcards);
            setCurrentIndex(0);
            setShuffle((prevSelected) => !prevSelected);
        }

        else{
            const shuffledFlashcards = [...flashcards].sort(() => Math.random() - 0.5);
            setFlashcards(shuffledFlashcards);
            setCurrentIndex(0);
            setShuffle((prevSelected) => !prevSelected);
        }
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
            {flashcards.length > 0 && flashcards[currentIndex] ? (
                !isSwapped ? (
                    <Flashcard 
                        frontContent={flashcards[currentIndex].front}
                        backContent={flashcards[currentIndex].back}
                    />
                ) : (
                    <Flashcard 
                        frontContent={flashcards[currentIndex].back}
                        backContent={flashcards[currentIndex].front}
                    />
                )
            ) : (
                <p>Loading flashcards...</p> // Show a message while data loads
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
