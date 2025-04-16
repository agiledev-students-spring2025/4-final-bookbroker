import './Login.css';
import { useState } from "react";  

export default function Login() {
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        setError('');
        console.log('Form submitted successfully!');
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

            {error && <p className="error-message">{error}</p>}

            <div className="form-footer">
                <button className="form-button" type="submit"> Login </button>

                <a href="/signup"> New User? Sign Up Here! </a>
            </div>
        </form>
    </div>
}