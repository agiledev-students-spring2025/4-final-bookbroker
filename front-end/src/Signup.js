import './Login.css';
import './Signup.css';
import { useState } from "react";  

export default function Signup() {
    const [error, setError] = useState('');
    const [location, setLocation] = useState('');
    const [customLocation, setCustomLocation] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const password = e.target.password.value;
        const confirmPassword = e.target.confirm.value;
        const email = e.target.email.value;
        const username = e.target.username.value;
        const finalLocation = location === 'Other' ? customLocation : location;

        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        setError('');
        
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, username, password, location: finalLocation})
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
            
            <div className="form-location">
                <label htmlFor="location">Select your city:</label>
                <select
                    id="location"
                    name="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                >
                    <option value="">--Choose a city--</option>
                    <option value="New York">New York, NY</option>
                    <option value="Los Angeles">Los Angeles, CA</option>
                    <option value="Chicago">Chicago, IL</option>
                    <option value="Houston">Houston, TX</option>
                    <option value="Phoenix">Phoenix, AZ</option>
                    <option value="Philadelphia">Philadelphia, PA</option>
                    <option value="San Antonio">San Antonio, TX</option>
                    <option value="San Diego">San Diego, CA</option>
                    <option value="Dallas">Dallas, TX</option>
                    <option value="San Jose">San Jose, CA</option>
                    <option value="Austin">Austin, TX</option>
                    <option value="Jacksonville">Jacksonville, FL</option>
                    <option value="San Francisco">San Francisco, CA</option>
                    <option value="Columbus">Columbus, OH</option>
                    <option value="Charlotte">Charlotte, NC</option>
                    <option value="Indianapolis">Indianapolis, IN</option>
                    <option value="Seattle">Seattle, WA</option>
                    <option value="Denver">Denver, CO</option>
                    <option value="Nashville">Nashville, TN</option>
                    <option value="Washington D.C.">Washington, D.C.</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            {location === "Other" && (
                <div className="form-other-location">
                    <label htmlFor="customLocation">Enter your city:</label>
                    <input
                        type="text"
                        id="customLocation"
                        name="customLocation"
                        value={customLocation}
                        onChange={(e) => setCustomLocation(e.target.value)}
                        required
                    />
                </div>
            )}

            {error && <p className="error-message">{error}</p>}

            <div className="form-footer">
                <button className="form-button" type="submit"> Signup </button>

                <a href="/login"> Got an account? Login here! </a>
            </div>
        </form>
    </div>
}