import { Grid2, Paper } from "@mui/material";
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
    setFlippedState(onCardFlip(wordIndex));
  };

  return (
    <Grid2 item>
      <Paper
        style={{
          backgroundColor: "white",
          width: "22vh",
          height: "22vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "visible",
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
