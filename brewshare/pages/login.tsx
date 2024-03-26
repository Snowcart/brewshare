"use client"
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { useState } from 'react';
import { signIn } from 'next-auth/react';

const Login = () => {
    const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const result = await signIn('credentials', {
      redirect: false, // Prevent NextAuth from redirecting automatically
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      // Redirect the user after successful login
      router.push('/');
    }
  };

  return (
    <>
    <div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jsmith@example.com"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleSubmit}>Log In</button>
    </div>
                <p>Don't have an account? <a href="/signup">Sign up</a></p>
                </>
  );
}

export default Login;

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 300px;
    max-width: 500px;
    min-width: 300px;
    background-color: #f2f2f2;
`;

const LoginForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 300px;
    max-width: 500px;
    background-color: #f2f2f2;
`