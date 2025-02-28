import React from 'react';
import FlashcardSet from './FlashcardSet';

const cards = [
    { front: "ichi", back: "one"},
    { front: "ni", back: "two"},
    { front: "san", back: "three"},
    { front: "shi", back: "four"},
    { front: "go", back: "five"},
];

export const Flashcards = () => (
    <FlashcardSet cards={cards} />
);

export default Flashcards;
