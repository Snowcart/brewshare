"use client"
import { fetched } from "@/src/api/ApiBase";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";

const SignUp = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        setLoading(true);
        console.log("submitting")
        if(username === '' || password === '') {
            return;
        }
        console.log("registering user");
        const x = await fetched('auth/register', "POST", { email: username, password });
        if(x.id != null) {
            router.push('/login');
        }
        setLoading(false);
    }
    return (
        <LoginContainer>
            <h1>Sign Up</h1>
            <LoginForm>
                <input type="text" placeholder="email" onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button disabled={loading} onClick={() => onSubmit()}>Register</button>
            </LoginForm>
        </LoginContainer>
    )
}

export default SignUp;

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 300px;
    max-width: 500px;
    min-width: 300px;
    background-color: slateblue;
`;

const LoginForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`