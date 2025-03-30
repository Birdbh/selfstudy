import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/Learning.css';

function Learning() {
    const { pathId } = useParams();
    const navigate = useNavigate();
    const [learningPath, setLearningPath] = useState(null);
    const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
    const [showQuiz, setShowQuiz] = useState(false);
    const [answers, setAnswers] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    // Mock learning path data - would be fetched from Firebase
    useEffect(() => {
        // Simulate API call to fetch learning path
        setTimeout(() => {
            const mockLearningPath = {
                title: "Machine Learning Basics",
                description: "A comprehensive path to understand the fundamentals of machine learning",
                modules: [
                    {
                        id: "module-1",
                        title: "Introduction to Machine Learning",
                        resource: {
                            type: "article",
                            url: "https://example.com/intro-ml",
                            description: "This article covers the basic concepts of machine learning and its applications."
                        },
                        questions: [
                            {
                                id: "q1-1",
                                text: "What is the difference between supervised and unsupervised learning?",
                                options: [
                                    "Supervised learning requires labeled data, unsupervised doesn't",
                                    "Supervised learning is faster than unsupervised learning",
                                    "Unsupervised learning always performs better than supervised learning",
                                    "There is no difference between them"
                                ],
                                correctAnswer: 0
                            },
                            {
                                id: "q1-2",
                                text: "Which of these is NOT a common machine learning algorithm?",
                                options: [
                                    "Linear Regression",
                                    "Random Forest",
                                    "Database Indexing",
                                    "K-means Clustering"
                                ],
                                correctAnswer: 2
                            }
                        ]
                    },
                    {
                        id: "module-2",
                        title: "Data Preprocessing",
                        resource: {
                            type: "video",
                            url: "https://example.com/data-preprocessing",
                            description: "Learn how to clean and prepare your data for machine learning models."
                        },
                        questions: [
                            {
                                id: "q2-1",
                                text: "Why is data normalization important?",
                                options: [
                                    "It makes all data the same size",
                                    "It brings features to a similar scale to prevent some features from dominating",
                                    "It removes all outliers from the dataset",
                                    "It converts categorical data to numerical data"
                                ],
                                correctAnswer: 1
                            }
                        ]
                    }
                ]
            };

            setLearningPath(mockLearningPath);
            setIsLoading(false);
        }, 1500);
    }, [pathId]);

    const handleMarkComplete = () => {
        setShowQuiz(true);
    };

    const handleAnswerSelect = (questionId, optionIndex) => {
        setAnswers({
            ...answers,
            [questionId]: optionIndex
        });
    };

    const handleSubmitQuiz = () => {
        // TODO: Save progress to Firebase
        console.log('Quiz answers:', answers);

        // Move to next module if available
        if (currentModuleIndex < learningPath.modules.length - 1) {
            setCurrentModuleIndex(currentModuleIndex + 1);
            setShowQuiz(false);
            setAnswers({});
        } else {
            // Path completed
            alert('Congratulations! You have completed this learning path.');
        }
    };

    if (isLoading) {
        return <div className="loading">Loading learning path...</div>;
    }

    if (!learningPath) {
        return <div className="error">Learning path not found</div>;
    }

    const currentModule = learningPath.modules[currentModuleIndex];

    return (
        <div className="learning-container">
            <header className="app-header">
                <button className="back-button" onClick={() => navigate('/')}>Back to Dashboard</button>
                <h1>{learningPath.title}</h1>
            </header>

            <div className="learning-content">
                <div className="module-navigation">
                    <h3>Modules</h3>
                    <ul>
                        {learningPath.modules.map((module, index) => (
                            <li
                                key={module.id}
                                className={index === currentModuleIndex ? 'active' : ''}
                                onClick={() => {
                                    setCurrentModuleIndex(index);
                                    setShowQuiz(false);
                                    setAnswers({});
                                }}
                            >
                                {module.title}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="module-content">
                    {!showQuiz ? (
                        <div className="resource-section">
                            <h2>{currentModule.title}</h2>
                            <div className="resource-card">
                                <h3>Learning Resource</h3>
                                <p>{currentModule.resource.description}</p>
                                <a
                                    href={currentModule.resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="resource-link"
                                >
                                    Open {currentModule.resource.type === 'video' ? 'Video' : 'Article'}
                                </a>
                            </div>
                            <button
                                className="complete-button"
                                onClick={handleMarkComplete}
                            >
                                Mark as Complete and Take Quiz
                            </button>
                        </div>
                    ) : (
                        <div className="quiz-section">
                            <h2>Quiz: {currentModule.title}</h2>
                            {currentModule.questions.map((question) => (
                                <div key={question.id} className="question-card">
                                    <h3>{question.text}</h3>
                                    <div className="options">
                                        {question.options.map((option, index) => (
                                            <div key={index} className="option">
                                                <input
                                                    type="radio"
                                                    id={`${question.id}-option-${index}`}
                                                    name={question.id}
                                                    checked={answers[question.id] === index}
                                                    onChange={() => handleAnswerSelect(question.id, index)}
                                                />
                                                <label htmlFor={`${question.id}-option-${index}`}>{option}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <button
                                className="submit-quiz-button"
                                onClick={handleSubmitQuiz}
                                disabled={Object.keys(answers).length !== currentModule.questions.length}
                            >
                                Submit and Continue
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Learning;