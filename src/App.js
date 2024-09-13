import React, { useState, useEffect } from 'react';
import './App.css'; // Import the CSS file

const App = () => {
  const [answers, setAnswers] = useState({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: ''
  });
  const [sessionId, setSessionId] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Generate a unique session ID for each customer
    setSessionId(Date.now());
  }, []);

  const handleAnswerChange = (e) => {
    const { name, value } = e.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (Object.values(answers).some((answer) => !answer)) {
      alert('Please complete all questions before submitting!');
      return;
    }

    // Save the survey data in localStorage or send it to a backend
    localStorage.setItem('survey_' + sessionId, JSON.stringify({ ...answers, status: 'COMPLETED' }));
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      window.location.reload(); // Restart the survey after 5 seconds
    }, 5000);
  };

  if (isSubmitted) {
    return (
      <div className="thank-you">
        <h1>Thank you for your feedback!</h1>
        <p>Redirecting to the welcome screen in 5 seconds...</p>
      </div>
    );
  }

  return (
    <div className="survey-container">
      <h1>Customer Survey</h1>
      <div className="survey-questions">
        <div className="survey-question">
          <label>1. How satisfied are you with our products?(Rating type, 1-5)</label>
          <input type="number" name="q1" min="1" max="5" value={answers.q1} onChange={handleAnswerChange} />
        </div>

        <div className="survey-question">
          <label>2. How fair are the prices compared to similar retailers? (Rating type, 1-5)</label>
          <input type="number" name="q2" min="1" max="5" value={answers.q2} onChange={handleAnswerChange} />
        </div>

        <div className="survey-question">
          <label>3. How satisfied are you with the value for money of your purchase? (Rating type, 1-5)</label>
          <input type="number" name="q3" min="1" max="5" value={answers.q3} onChange={handleAnswerChange} />
        </div>

        <div className="survey-question">
          <label>4. On a scale of 1-10, how likely are you to recommend us to your friends and family?</label>
          <input type="number" name="q4" min="1" max="10" value={answers.q4} onChange={handleAnswerChange} />
        </div>

        <div className="survey-question">
          <label>5. What could we do to improve our service?</label>
          <textarea name="q5" value={answers.q5} onChange={handleAnswerChange}></textarea>
        </div>

        <button className="submit-btn" onClick={handleSubmit}>Submit Survey</button>
      </div>
    </div>
  );
};

export default App;
