import React from 'react';
import Quiz from '../components/Quiz.js';
import '../flashcard.css';

const Quizzes = () => {
    const answers=['Sun', 'bakery', 'WrongAnser', 'hi']
    const [a1, a2, a3, a4] = answers;
    return (
        <div>
            <h1 className='page-title'>Quizzes</h1>
            <br/>
            <Quiz word="日" answers={answers} correct_ans="Sun" />
        </div>
    );
};

export default Quizzes;
  