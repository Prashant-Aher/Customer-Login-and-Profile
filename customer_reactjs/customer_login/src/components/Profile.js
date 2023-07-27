    import React, { useState } from 'react';

    const Profile = ({ customer }) => {
    const [custname, setCustname] = useState(customer.custname);
    const [mobileno, setMobileno] = useState(customer.mobileno);
    const [PIN, setPIN] = useState(customer.PIN);
    const [message, setMessage] = useState('');

    const handleUpdateProfile = async () => {
        try {
        // Perform validation before updating customer
        if (!custname || !mobileno || !PIN) {
            setMessage('All fields are mandatory.');
            return;
        }

        const response = await fetch(`http://localhost:5000/customer/${customer.custid}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ custname, mobileno, PIN }),
        });

        if (response.ok) {
            setMessage('Profile updated successfully.');
        } else {
            setMessage('Failed to update profile. Please try again.');
        }
        } catch (error) {
        setMessage('An error occurred while updating the profile.');
        }
    };

    return (
        <div>
        <h2>Profile</h2>
        <p>Welcome {customer.custname}</p>
        {message && <p style={{ color: 'green' }}>{message}</p>}
        <input
            type="text"
            placeholder="Name"
            value={custname}
            onChange={(e) => setCustname(e.target.value)}
        />
        <input
            type="text"
            placeholder="Mobile Number"
            value={mobileno}
            onChange={(e) => setMobileno(e.target.value)}
        />
        <input
            type="password"
            placeholder="PIN"
            value={PIN}
            onChange={(e) => setPIN(e.target.value)}
        />
        <button onClick={handleUpdateProfile}>Update Profile</button>
        </div>
    );
    };

    export default Profile;
