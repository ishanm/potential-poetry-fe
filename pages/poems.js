import React, { useState } from 'react';
import axios from 'axios';

export default function PoemsPage() {
  const [prompt, setPrompt] = useState('');
  const [poem, setPoem] = useState(null);
  const [showInput, setShowInput] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleButtonClick = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/poems', {
        prompt,
        userId: '1',
      });
      setPoem(response.data.poem);
      setShowInput(false);
    } catch (error) {
      console.error(error);
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
            />
          </div>
          <div>
            <button onClick={handleButtonClick}>Turn Into Poem</button>
          </div>
          {isLoading && <p>Generating poem...</p>}{' '}
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
