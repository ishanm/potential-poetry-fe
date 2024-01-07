import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function PublishedPoems() {
  const [poems, setPoems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPoems = async () => {
      try {
        // TODO: Move host to environment variable and remove hard coded user id
        const response = await axios.get('http://localhost:3000/poems/1');
        setPoems(response.data);
      } catch (error) {
        setError('Something went wrong. Please try again.'); // Set error message
      }
    };

    fetchPoems();
  }, []);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : poems.length > 0 ? (
        poems.map((poem) => (
          <div key={poem.id}>
            <h2>
              {poem.authorName} -{' '}
              {new Date(poem.publishedDate).toLocaleDateString()}
            </h2>
            <p>{poem.poem}</p>
          </div>
        ))
      ) : (
        <p>There are no poems here.</p>
      )}
    </div>
  );
}