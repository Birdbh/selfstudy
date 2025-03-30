import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignIn.css';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignIn = (e) => {
        e.preventDefault();
        // TODO: Implement Firebase authentication
        console.log('Sign in with:', email, password);

        // For now, simply navigate to landing page
        navigate('/');
    };

    return (
        <div className="sign-in-container">
            <div className="sign-in-card">
                <h1>AI Learning Path</h1>
                <h2>Sign In</h2>
                <form onSubmit={handleSignIn}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="sign-in-button">Sign In</button>
                </form>
                <p className="sign-up-text">
                    Don't have an account? <span onClick={() => console.log('Sign up')}>Sign Up</span>
                </p>
            </div>
        </div>
    );
}

export default SignIn;