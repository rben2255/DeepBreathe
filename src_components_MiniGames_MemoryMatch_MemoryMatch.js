import React, { useState, useEffect } from 'react';
import './MemoryMatch.css';

const MemoryMatch = () => {
  const initialCards = [
    { id: 1, value: '🌟', flipped: false },
    { id: 2, value: '🌟', flipped: false },
    { id: 3, value: '🎵', flipped: false },
    { id: 4, value: '🎵', flipped: false },
    { id: 5, value: '🍀', flipped: false },
    { id: 6, value: '🍀', flipped: false },
  ];

  const [cards, setCards] = useState(shuffleCards(initialCards));
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  // Shuffle cards at the start
  function shuffleCards(cards) {
    return cards.sort(() => Math.random() - 0.5);
  }

  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || matchedCards.includes(index)) return;

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards;
      if (cards[firstIndex].value === cards[secondIndex].value) {
        setMatchedCards([...matchedCards, firstIndex, secondIndex]);
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  };

  return (
    <div className="memory-match-container">
      <h2>Memory Match</h2>
      <div className="memory-grid">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`memory-card ${
              flippedCards.includes(index) || matchedCards.includes(index)
                ? 'flipped'
                : ''
            }`}
            onClick={() => handleCardClick(index)}
          >
            {flippedCards.includes(index) || matchedCards.includes(index)
              ? card.value
              : '❓'}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryMatch;