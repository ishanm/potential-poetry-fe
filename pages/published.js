import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';

export default function PublishedPoems() {
  const [poems, setPoems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPoems = async () => {
      try {
        const authToken = cookie.get('authToken');
        const response = await axios.get(
          `http://localhost:3000/poems/${authToken}`
        );
        setPoems(response.data);
      } catch (error) {
        setError('Something went wrong. Please try again.');
      }
    };

    fetchPoems();
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      {error ? (
        <p>{error}</p>
      ) : poems.length > 0 ? (
        poems.map((poem) => (
          <div
            key={poem.id}
            style={{
              width: '60%',
              padding: '20px',
              marginBottom: '20px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
            }}
          >
            <h2
              style={{
                marginBottom: '10px',
                fontSize: '1.2em',
                fontWeight: 'bold',
              }}
            >
              {poem.authorName} -{' '}
              {new Date(poem.publishedDate).toLocaleDateString()}
            </h2>
            <p style={{ fontSize: '1em' }}>{poem.poem}</p>
          </div>
        ))
      ) : (
        <p>There are no poems here.</p>
      )}
    </div>
  );
}
