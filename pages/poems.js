import React, { useState } from 'react';
import axios from 'axios';

export default function PoemsPage() {
  const [prompt, setPrompt] = useState('');
  const [poem, setPoem] = useState(null);
  const [showInput, setShowInput] = useState(true);

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleButtonClick = async () => {
    try {
      const response = await axios.post('http://localhost:3000/poems', {
        prompt,
        userId: '1',
      });
      setPoem(response.data.poem);
      setShowInput(false);
    } catch (error) {
      console.error(error);
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
        </div>
      ) : (
        <div>
          <h3>Your poem is ready and published!</h3>
          <p>{poem}</p>
          <button onClick={() => (window.location.href = '/published')}>
            See Published Poems
          </button>
          <button onClick={handleNewPoemClick}>New Poem</button>
        </div>
      )}
    </>
  );
}
