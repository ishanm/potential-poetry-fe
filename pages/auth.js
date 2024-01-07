import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleButtonClick = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_HOST}/users`,
        {
          name,
          email,
        }
      );
      const userId = response.data.id;
      cookie.set('userId', userId);
      router.push('/poems');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

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
      <h1 style={{ marginBottom: '50px', fontSize: '2em', fontWeight: 'bold' }}>
        Welcome
      </h1>
      <div style={{ marginBottom: '20px', width: '300px' }}>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          disabled={isLoading}
          placeholder="Name"
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '1em',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
          }}
        />
      </div>
      <div style={{ marginBottom: '20px', width: '300px' }}>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          disabled={isLoading}
          placeholder="Email"
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '1em',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
          }}
        />
      </div>
      <div>
        <button
          onClick={handleButtonClick}
          disabled={isLoading}
          style={{
            padding: '10px 20px',
            fontSize: '1em',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Signup
        </button>
      </div>
    </div>
  );
}
