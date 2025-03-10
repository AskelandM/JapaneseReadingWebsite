import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import '../index.css';

function Quiz({ word, answers, current_num }) {
    const [message, setMessage] = useState(<h3><br/></h3>);
    const [finished, setFinished] = useState(false);

    // reset the message when moving between questions (when current_num changes)
    useEffect(() => {setFinished(false); setMessage(<h3>　<br/>　</h3>);}, [current_num]); 

    // on click, flip the card
    const handleClick = (ans) => {
        if (finished === false) { // if current q is not finished
            if (ans === word.en) {
                setMessage(<h3>{ans}<br/>Correct! Good Job</h3>); // 1 is true
                setFinished(true);
            }
            else {
                setMessage(<h3><br/>Wrong! Try Again</h3>); // 0 is false
            }
        }
    };

    // button component
    return (
        <div className="question">
            <h2>{word.jp}</h2>
            {answers.map((answer) => <Button variant="contained" onClick={() => handleClick(answer)}>{answer}</Button>)}
            {message}
        </div>
    );
}

export default Quiz;
