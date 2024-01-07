import React, { useState } from 'react';
import axios from 'axios';

export default function PoemsPage() {
  const [prompt, setPrompt] = useState('');
  const [poem, setPoem] = useState(null);
  const [showInput, setShowInput] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // New state variable

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleButtonClick = async () => {
    setIsLoading(true);
    setError(null); // Reset the error message before making the API call
    try {
      const response = await axios.post('http://localhost:3000/poems', {
        prompt,
        userId: '1',
      });
      setPoem(response.data.poem);
      setShowInput(false);
    } catch (error) {
      setError('Something went wrong. Please try again.'); // Set the error message when there is an error
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewPoemClick = () => {
    setPrompt('');
    setPoem(null);
    setShowInput(true);
  };

  return (
    <>
      {showInput ? (
        <div>
          <div>
            <input
              type="text"
              value={prompt}
              onChange={handleInputChange}
              style={{ width: '100%', height: '100px' }}
              disabled={isLoading}
            />
          </div>
          <div>
            <button onClick={handleButtonClick} disabled={isLoading}>
              Turn Into Poem
            </button>
          </div>
          {isLoading && <p>Generating poem...</p>}
          {error && <p>{error}</p>}{' '}
          {/* Conditionally render the error message */}
        </div>
      ) : (
        <div>
          <h3>Your poem is ready and published!</h3>
          <blockquote>{poem}</blockquote>
          <button onClick={() => (window.location.href = '/published')}>
            See Published Poems
          </button>
          <button onClick={handleNewPoemClick}>New Poem</button>
        </div>
      )}
    </>
  );
}
