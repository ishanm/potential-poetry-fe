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
      const response = await axios.post('http://localhost:777/poem', {
        prompt,
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
          <input type="text" value={prompt} onChange={handleInputChange} />
          <button onClick={handleButtonClick}>Turn Into Poem</button>
        </div>
      ) : (
        <div>
          <h1>Your poem is ready and published!</h1>
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
