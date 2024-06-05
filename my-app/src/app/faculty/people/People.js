import React, { useEffect, useState } from 'react';
import './People.css'; // Assuming this CSS file is appropriately scoped to the needs of the People component

function People() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    async function fetchPeople() {
      
      try {
        //localStorage.setItem('course_id', 110); // This should ideally be passed as a prop or through context
      
        const response = await fetch('http://ec2-18-144-147-186.us-west-1.compute.amazonaws.com:5000/people_in_course', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ course_id: localStorage.getItem('courseCode') })
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        const data = await response.json();
        setPeople(data);
      } catch (error) {
        console.error('Error fetching people:', error);
      }
    }

    fetchPeople();
  }, []);

  return (
    <div className="people-container">
      <h1>People in Course</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person, index) => (
            <tr key={index}>
              <td>{person.name}</td>
              <td>{person.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default People;
