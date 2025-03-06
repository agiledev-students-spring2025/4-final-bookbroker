import './Login.css';

export default function Login() {
    return <div className="login">
        <form className="login-form">
            <div className="form-user">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required />
            </div>
            <div className="form-pass">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />
            </div>
            <button className="form-button" type="submit">Login</button>
        </form>
    </div>
}