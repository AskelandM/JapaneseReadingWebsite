import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import '../index.css';

function Quiz({ word, answers, current_num, answeredQs, onAnsweredQ }) {
    const [message, setMessage] = useState(<h3><br/></h3>);

    // clicking an answer choice
    const handleClick = (ans) => {
        if (answeredQs <= current_num) { // if current q is not finished
            if (ans === word.English) {
                setCorrect(ans);
                onAnsweredQ();
            }
            else {
                setMessage(<h3><br/>Wrong! Try Again</h3>);
            }
        }
    };

    const setEmpty = () => {
        setMessage(<h3>　<br/>　</h3>);
    }

    const setCorrect = (ans) => {
        setMessage(<h3>{word.English}<br/>Correct! Good Job</h3>); // 1 is true
    }

    // reset the message when moving between questions (when current_num changes)
    useEffect(() => {answeredQs > current_num ? setCorrect() : setEmpty()}, [current_num]); 

    // button component
    return (
        <div className="question">
            <h2>{word.kanji}&nbsp;{word.kana}</h2>
            {answers.map((answer) => <Button variant="contained" onClick={() => handleClick(answer)}>{answer}</Button>)}
            {message}
        </div>
    );
}

export default Quiz;
