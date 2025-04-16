import './Login.css';
import { useState } from "react";  

export default function Signup() {
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const password = e.target.password.value;
        const confirmPassword = e.target.confirm.value;

        const email = e.target.email.value;
        const username = e.target.username.value;

        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        setError('');
        
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, username, password })
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || 'Signup failed!');
                return;
            }

            console.log('Form submitted successfully!');
            window.location.href = "/";
        } catch (err) {
            console.error('Error during signup:', err);
            setError('An error occurred. Please try again.');
        }
    };

    return <div className="login">
        <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-email">
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" name="email" required />
            </div>

            <div className="form-user">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required />
            </div>

            <div className="form-pass">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />
            </div>

            <div className="form-confirm">
                <label htmlFor="confirm">Confirm Password:</label>
                <input type="password" id="confirm" name="confirm" required />
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="form-footer">
                <button className="form-button" type="submit"> Signup </button>

                <a href="/login"> Got an account? Login here! </a>
            </div>
        </form>
    </div>
}