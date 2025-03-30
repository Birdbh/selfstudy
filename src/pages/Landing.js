import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Landing.css';

function Landing() {
    const [learningGoal, setLearningGoal] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!learningGoal.trim()) return;

        setIsLoading(true);
        try {
            // TODO: This would call a Firebase function to generate the learning path
            console.log('Generating learning path for:', learningGoal);

            // Simulate API call with timeout
            setTimeout(() => {
                // Navigate to learning page with a dummy ID
                // In production, this would be the ID of the generated learning path
                navigate('/learning/example-path-1');
                setIsLoading(false);
            }, 2000);
        } catch (error) {
            console.error('Error generating learning path:', error);
            setIsLoading(false);
        }
    };

    return (
        <div className="landing-container">
            <header className="app-header">
                <h1>AI Learning Path</h1>
                <button className="account-button">My Account</button>
            </header>

            <main className="landing-content">
                <h2>What do you want to learn today?</h2>
                <p>Enter a job description, skill, or topic you want to master</p>

                <form onSubmit={handleSubmit} className="goal-form">
                    <textarea
                        value={learningGoal}
                        onChange={(e) => setLearningGoal(e.target.value)}
                        placeholder="E.g., I want to become a machine learning engineer, or I need to learn about blockchain technology for my new role..."
                        rows={6}
                        required
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="generate-button"
                    >
                        {isLoading ? 'Generating...' : 'Generate Learning Path'}
                    </button>
                </form>

                <div className="previous-paths">
                    <h3>Your Previous Learning Paths</h3>
                    <div className="path-list">
                        <div className="path-item" onClick={() => navigate('/learning/example-path-1')}>
                            <h4>Machine Learning Basics</h4>
                            <p>Created on March 28, 2025</p>
                            <div className="progress-bar">
                                <div className="progress" style={{ width: '30%' }}></div>
                            </div>
                            <p className="progress-text">Progress: 30%</p>
                        </div>
                        {/* More path items would be added here */}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Landing;