import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import './randomQuote.css';

const RandomQuote = () => {
  const [quotes, setQuotes] = useState([
        { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
        { text: "Success is not final; failure is not fatal.", author: "Winston Churchill" },
        { text: "Common Sense is not so common", author: "Voltaire" },
        { text: "Opportunity dances with those on the dnace floor", author: "Anonymous" },
        { text: "Never confuse education with intelligence, you can have a pH.D and still be an idiot", author: "Richard Feyman" },
        { text: "Success and failure share the same road. Failure is just an earlier exit", author: "Alex Hormozi" },
        { text: "We are what we repeatedly do. Excellence is not an act but a habit", author: "Aristotle" },
  ]);
  const [quote, setQuote] = useState({
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  });

  useEffect(() => {
  async function loadQuotes() {
    try {
      const response = await fetch('https://api.quotable.io/quotes?limit=200');
      const data = await response.json();

      // Normalize API format to { text, author }
      const formatted = data.results.map(q => ({
        text: q.content,
        author: q.author
      }));

      setQuotes(formatted);
      setQuote(formatted[0]);

    } catch {
      const fallback = [
        { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
        { text: "Success is not final; failure is not fatal.", author: "Winston Churchill" },
        { text: "Common Sense is not so common", author: "Voltaire" },
        { text: "Opportunity dances with those on the dnace floor", author: "Anonymous" },
        { text: "Never confuse education with intelligence, you can have a pH.D and still be an idiot", author: "Richard Feyman" },
        { text: "Success and failure share the same road. Failure is just an earlier exit", author: "Alex Hormozi" },
        { text: "We are what we repeatedly do. Excellence is not an act but a habit", author: "Aristotle" },
      ];

      setQuotes(fallback);
      setQuote(fallback[0]);
    }
  }
  loadQuotes();
}, []);

  const random = () => {
  if (quotes.length === 0) return;
  const select = quotes[Math.floor(Math.random() * quotes.length)];
  setQuote(select);
};

  return (
    <div className='container'>
      <div className='quote'>{quote.text}</div>
      <div>
        <div className='line'></div>
        <div className='bottom'>
          <div className='author'>- {quote.author}</div>

          <div className='icons'>
            <FontAwesomeIcon 
              icon={faRotateRight} 
              onClick={random} 
              className="refresh-icon"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default RandomQuote;
