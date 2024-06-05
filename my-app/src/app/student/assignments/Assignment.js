import React, { useEffect, useState } from 'react';
import '../assignments/Assignment.css';

function Assignment() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        localStorage.setItem('assignment_type', 'homework');
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
        setAssignments(data);
      } catch (error) {
        console.error('Error fetching assignments:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="assignment-list">
      {assignments.length > 0 ? (
        assignments.map((item, index) => (
          <div key={index} className="assignment-item">
            <h3>{item.title}</h3>
            <p>{item.content}</p>
            <span>Points: {item.total_points}</span>
            <span>Due: {new Date(item.due_date).toLocaleDateString()}</span>
          </div>
        ))
      ) : (
        <div>No assignments available.</div>
      )}
    </div>
  );
}

export default Assignment;
