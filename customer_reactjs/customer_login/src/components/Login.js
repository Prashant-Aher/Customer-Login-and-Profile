    import React, { useState } from 'react';

    const Login = ({ onLogin }) => {
    const [mobileNo, setMobileNo] = useState('');
    const [PIN, setPIN] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        try {
        const response = await fetch('http://localhost:5000/customer', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mobileno: mobileNo, PIN }),
        });

        if (response.ok) {
            const customer = await response.json();
            onLogin(customer);
        } else {
            setErrorMessage('Invalid mobile number or PIN. Please try again.');
        }
        } catch (error) {
        setErrorMessage('An error occurred while logging in.');
        }
    };

    return (
        <div>
        <h2>Login</h2>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <input
            type="text"
            placeholder="Mobile Number"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
        />
        <input
            type="password"
            placeholder="PIN"
            value={PIN}
            onChange={(e) => setPIN(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        </div>
    );
    };

    export default Login;
