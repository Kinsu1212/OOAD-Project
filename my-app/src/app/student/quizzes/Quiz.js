import React, { useEffect, useState } from 'react';
import '../quizzes/Quiz.css';

function Quiz() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
        localStorage.setItem('assignment_type', 'quiz');
      try {
        const response = await fetch('https://ec2-54-67-80-169.us-west-1.compute.amazonaws.com:3000:5000/get_assignment', {
                                  method: 'POST',
                                  headers: {
                                    'Content-Type': 'application/json'
                                  },
                                  body: JSON.stringify({ course_id: localStorage.getItem('courseCode'), assignment_type: localStorage.getItem('assignment_type')})
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setQuizzes(data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="quiz-list">
      {quizzes.length > 0 ? (
        quizzes.map((item, index) => (
          <div key={index} className="quiz-item">
            <h3>{item.title}</h3>
            <p>{item.content}</p>
            <span>Points: {item.total_points}</span>
            <span>Due: {new Date(item.due_date).toLocaleDateString()}</span>
          </div>
        ))
      ) : (
        <div>No quizzes available.</div>
      )}
    </div>
  );
}

export default Quiz;
