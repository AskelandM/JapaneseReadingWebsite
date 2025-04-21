import React, { useState, useEffect } from "react";
import { Flashcard } from "../components/Flashcard.js";
import "../styling/flashcard.css";
import { ToggleButton } from "@mui/material";
import { useLocation } from "react-router";
import supabase from "../supabaseclient.js";
import { FaFastBackward, FaBackward, FaForward,FaFastForward } from "react-icons/fa";
import { FaShuffle } from "react-icons/fa6";
import { BsFront } from "react-icons/bs";

export function Flashcards() {
  // controls which alphabets are shown on the front of the flashcard
  // Kanji shown by default
  const [showRomaji, setShowRomaji] = useState(false);
  const [showKanji, setShowKanji] = useState(true);
  const [showKana, setShowKana] = useState(false);

  const [wordList, setWords] = React.useState([
    {
      kana: "loading...",
      kanji: "loading...",
      romaji: "loading...",
      English: "loading...",
    },
  ]);
  const initialFlashcards = wordList;

  // cards that will be displayed after choosing romaji, kana, kanji
  const outputFlashcards = initialFlashcards.map((word) => ({
    front: word.English,
    back: `${showRomaji ? word.romaji : ""} ${showKana ? word.kana : ""} ${
      showKanji ? word.kanji : ""
    }`.trim(),
  }));

  // get lesson # from URL
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const lesson = searchParams.get("lesson");

  // get words from DB
  useEffect(() => {
    async function getWords() {
      const { data, error } = await supabase
        .from("Words")
        .select(`kana, kanji, romaji, English`)
        .eq("lesson", lesson);
      if (error) {
        console.warn(error);
      } else if (data) {
        // wordList = data;
        setWords(data);
      }
      console.log("from DB:");
      console.log(wordList);
    }

    getWords();
  }, []);

  // update wordList when wordList changes
  useEffect(() => {
    console.log("Updated wordList:", wordList);
  }, [wordList]);

  // controls which flashcard is shown
  const [currentIndex, setCurrentIndex] = useState(0);

  // controls which flashcard face is shown
  const [isSwapped, setSwapped] = useState(true);

  // controls shuffle
  const [shuffled, setShuffle] = useState(false);
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    setFlashcards(
      wordList.map((word) => ({
        front: word.English,
        back: `${showRomaji ? word.romaji : ""} ${showKana ? word.kana : ""} ${
          showKanji ? word.kanji : ""
        }`.trim(),
      }))
    );
  }, [wordList, showRomaji, showKana, showKanji]);

  // add states for checkboxes for 3 different japanese alphabets
  // pull from database

  const shuffleFlashcards = () => {
    if (shuffled) {
      setFlashcards(outputFlashcards);
      setCurrentIndex(0);
      setShuffle((prevSelected) => !prevSelected);
    } else {
      const shuffledFlashcards = [...flashcards].sort(
        () => Math.random() - 0.5
      );
      setFlashcards(shuffledFlashcards);
      setCurrentIndex(0);
      setShuffle((prevSelected) => !prevSelected);
    }
  };

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
    );
  };

  const setFirstCard = () => {
    setCurrentIndex(0);
  };

  const setLastCard = () => {
    setCurrentIndex(flashcards.length - 1);
  };

  return (
    <div className="flashcard-page">
      <div className="flashcard-container">
        <h1 className="page-title">Flashcards</h1>
  
        <div className="flashcard-row">
          <div className="side-buttons">
            <button onClick={setFirstCard}><FaFastBackward></FaFastBackward></button>
          </div>
          <div className="side-buttons">
            <button onClick={prevCard}><FaBackward></FaBackward></button>
          </div>

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
            <p>Loading flashcards...</p>
          )}

          <div className="side-buttons">
            <button onClick={nextCard}><FaForward></FaForward></button>
          </div>
          <div className="side-buttons">
            <button onClick={setLastCard}><FaFastForward></FaFastForward></button>
          </div>
        </div>
        <div className="controls">
          <span>{currentIndex + 1} / {flashcards.length}</span>
        </div>
        <div className="controls">
          <ToggleButton
            value="check"
            selected={isSwapped}
            onChange={() => setSwapped((prevSelected) => !prevSelected)}
          >
            <BsFront></BsFront>
          </ToggleButton>
  
          <ToggleButton
            value="check"
            selected={shuffled}
            onChange={() => shuffleFlashcards((prevSelected) => !prevSelected)}
          >
            <FaShuffle></FaShuffle>
          </ToggleButton>
  
          <ToggleButton
            value="check"
            selected={showRomaji}
            onChange={() => setShowRomaji((prev) => !prev)}
          >
            Romaji
          </ToggleButton>
  
          <ToggleButton
            value="check"
            selected={showKanji}
            onChange={() => setShowKanji((prev) => !prev)}
          >
            Kanji
          </ToggleButton>
  
          <ToggleButton
            value="check"
            selected={showKana}
            onChange={() => setShowKana((prev) => !prev)}
          >
            Kana
          </ToggleButton>
        </div>
      </div>
    </div>
  );
  
}
