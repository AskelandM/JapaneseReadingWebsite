import React from "react";
import { useState, useEffect } from "react";
import ConcentrationCard from "./ConcentrationCard";
import supabase from "../supabaseclient.js";

async function fetchWords(lesson) {
  let answers = {};
  let words = [];
  let res = [];

  await supabase
    .from("Words")
    .select("kana, kanji, English")
    .eq("lesson", lesson)
    .then((response) => {
      response.data.forEach((word) => {
        if (word.kanji && word.kana) {
          words.push([word.kanji + " (" + word.kana + ")", word.English]);
        } else {
          words.push([word.kana, word.English]);
        }
      });

      // Shuffle the array
      words.sort(() => Math.random() - 0.5);
      words = words.slice(0, 8);
      for (let i = 0; i < words.length; i++) {
        res.push(words[i][0]);
        res.push(words[i][1]);
        answers[words[i][0]] = words[i][1];
      }

      //Shuffle words and their matches
      res.sort(() => Math.random() - 0.5);
    })
    .catch((error) => {
      console.error("Error fetching words:", error);
    });

  return { res, answers };
}

const Concentration = ({ lessonID }) => {
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards] = useState([]);
  const [shuffledArray, setShuffledArray] = useState([]);
  const [wonGame, setWonGame] = useState(false);
  const [gameAnswers, setGameAnswers] = useState({});

  const handleCardFlip = (wordIndex) => {
    if (matchedCards.includes(wordIndex)) {
      // Card is already matched
      return false;
    }
    if (flippedCards.length < 2) {
      // Add the card to flippedCards
      setFlippedCards((prev) => [...prev, wordIndex]);
      //Card has been flipped
      return true;
    } else {
      // Remove the card from flippedCards
      setFlippedCards((prev) => prev.filter((index) => index !== wordIndex));
      return false;
    }
  };

  useEffect(() => {
    if (shuffledArray.length === 0) {
      fetchWords(lessonID).then((data) => {
        setShuffledArray(data.res);
        setGameAnswers(data.answers);
      });
    }

    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      const firstWord = shuffledArray[firstCard];
      const secondWord = shuffledArray[secondCard];
      if (
        gameAnswers[firstWord] === secondWord ||
        gameAnswers[secondWord] === firstWord
      ) {
        console.log("MATCH");
        matchedCards.push(firstCard);
        matchedCards.push(secondCard);

        if (matchedCards.length === shuffledArray.length) {
          console.log("YOU WON");
          setWonGame(true);
        }
      } else {
        console.log("NO MATCH");
      }
      setTimeout(() => {
        setFlippedCards([]);
      }, 1000);
    }
  }, [flippedCards, gameAnswers, lessonID, matchedCards, shuffledArray]);

  if (shuffledArray.length >= 16) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ textAlign: "center", color: "green" }}>
          {wonGame ? "YOU WIN" : ""}
        </h1>
        <div className="grid-wrapper">
          {shuffledArray.map((_, index) => (
            <ConcentrationCard
              key={index}
              wordIndex={index}
              words={shuffledArray}
              flippedCards={flippedCards}
              matchedCards={matchedCards}
              onCardFlip={handleCardFlip}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ textAlign: "center", color: "black" }}>
          {shuffledArray.length === 0
            ? "Loading..."
            : "Not enough words found, please select another lesson."}
        </h1>
      </div>
    );
  }
};

export default Concentration;
