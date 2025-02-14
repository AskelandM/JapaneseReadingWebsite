import React, { useState } from 'react';
import Button from '@mui/material/Button';
import '../index.css';

function Quiz({ word, answers, correct_ans}) {
    const [message, setMessage] = useState("");

    // on click, flip the card
    const handleClick = (ans) => {
        if (ans == correct_ans) {
            setMessage("Correct! Good Job"); // 1 is true
        }
        else {
            setMessage("Wrong! Try Again"); // 0 is false
        }
    };

    // Flashcard component
    return (
        <div className="question">
            <h2>{word}</h2>
            {answers.map((answer) => <Button variant="contained" onClick={() => handleClick(answer)}>{answer}</Button>)}
            <h3>{message}</h3>
        </div>
    );
}

export default Quiz;
