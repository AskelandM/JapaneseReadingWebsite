import React, { useState, useMemo } from 'react';
import Button from '@mui/material/Button';
import '../index.css';

function Quiz({ word, answers, correct_ans, current_num }) {
    const [message, setMessage] = useState(<h3><br/></h3>);
    const [finished, setFinished] = useState(false);

    // reset the message when moving between questions (when current_num changes)
    useMemo(() => {setFinished(false); setMessage(<h3>　<br/>　</h3>);}, [current_num]); 

    // on click, flip the card
    const handleClick = (ans) => {
        if (finished === false) { // if current q is not finished
            if (ans === correct_ans) {
                setMessage(<h3>{ans}<br/>Correct! Good Job</h3>); // 1 is true
                setFinished(true);
            }
            else {
                setMessage(<h3><br/>Wrong! Try Again</h3>); // 0 is false
            }
        }
    };

    // Flashcard component
    return (
        <div className="question">
            <h2>{word}</h2>
            {answers.map((answer) => <Button variant="contained" onClick={() => handleClick(answer)}>{answer}</Button>)}
            {message}
        </div>
    );
}

export default Quiz;
