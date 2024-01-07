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
      // TODO: take from environment variable
      const response = await axios.post('http://localhost:3000/users', {
        name,
        email,
      });
      const authToken = response.data.token;
      cookie.set('authToken', authToken);
      router.push('/poems');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Welcome</h1>
      <div>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          disabled={isLoading}
          placeholder="Name"
        />
      </div>
      <div>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          disabled={isLoading}
          placeholder="Email"
        />
      </div>
      <div>
        <button onClick={handleButtonClick} disabled={isLoading}>
          Signup
        </button>
      </div>
    </div>
  );
}
