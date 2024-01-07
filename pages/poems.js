import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';

export default function PoemsPage() {
  const [prompt, setPrompt] = useState('');
  const [poem, setPoem] = useState(null);
  const [showInput, setShowInput] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleButtonClick = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const authToken = cookie.get('authToken');
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_HOST}/poems`,
        {
          prompt,
          authToken,
        }
      );
      setPoem(response.data.poem);
      setShowInput(false);
    } catch (error) {
      setError('Something went wrong. Please try again.');
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
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
          }}
        >
          <h2 style={{ marginBottom: '10px' }}>Enter your thoughts here</h2>
          <div style={{ marginBottom: '20px', width: '300px' }}>
            <input
              type="text"
              value={prompt}
              onChange={handleInputChange}
              style={{
                width: '100%',
                height: '100px',
                padding: '10px',
                fontSize: '1em',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
              }}
              disabled={isLoading}
            />
          </div>
          <div>
            <button
              onClick={handleButtonClick}
              disabled={isLoading}
              style={{
                padding: '10px 20px',
                fontSize: '1em',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Turn Into Poem
            </button>
          </div>
          {isLoading && <p>Generating poem...</p>}
          {error && <p>{error}</p>}
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
          }}
        >
          <h3>Your poem is ready and published!</h3>
          <blockquote
            style={{
              width: '60%',
              padding: '20px',
              fontSize: '1.2em',
              borderLeft: '5px solid #0070f3',
            }}
          >
            {poem}
          </blockquote>
          <button
            onClick={() => router.push('/published')}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              fontSize: '1em',
              backgroundColor: 'red',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            See Published Poems
          </button>
          <button
            onClick={handleNewPoemClick}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              fontSize: '1em',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            New Poem
          </button>
        </div>
      )}
    </>
  );
}
