import { Grid2, Box, Stack, Paper } from "@mui/material";
import { useState } from "react";
const ConcentrationCard = ({
  wordIndex,
  words,
  flippedCards,
  matchedCards,
  onCardFlip,
}) => {
  const [isFlipped, setFlippedState] = useState(false);

  const handleFlip = () => {
    //onCardFlip will ensure whether the card can be flipped or not
    console.log(words);
    setFlippedState(onCardFlip(wordIndex));
  };

  return (
    <Grid2 item>
      <Paper
        style={{
          backgroundColor: "white",
          width: "20vh",
          height: "20vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          transition: "transform 0.3s ease-in-out",
          transform: flippedCards.includes(wordIndex)
            ? "rotateY(180deg)"
            : "rotateY(0)",
        }}
        onClick={() => handleFlip()}
      >
        <div
          style={{
            transform: flippedCards.includes(wordIndex)
              ? "rotateY(180deg)"
              : "rotateY(0deg)",
            color: matchedCards.includes(wordIndex) ? "green" : "black",
          }}
        >
          {flippedCards.includes(wordIndex) || matchedCards.includes(wordIndex)
            ? words[wordIndex]
            : "?"}
        </div>
      </Paper>
    </Grid2>
  );
};

export default ConcentrationCard;
