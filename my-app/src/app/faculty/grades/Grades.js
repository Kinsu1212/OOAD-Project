'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

function Grades() {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await axios.post('http://ec2-54-67-80-169.us-west-1.compute.amazonaws.com:5000/get_scores_by_student', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            course_id: localStorage.getItem('courseCode')
          });
        setGrades(response.data);
      } catch (error) {
        console.error('Failed to fetch grades:', error);
      }
    };

    fetchGrades();
  }, []);

  return (
    <div className="grades-container">
      <h2>Student Grades</h2>
      <table className="grades-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Score (%)</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade, index) => (
              <tr key={index}>
            <Link className="individual-link" href={{pathname:"/faculty/grades/inividual_student", query:{name:grade.student_name}}}>  
            <td>{grade.student_name}</td></Link>
              <td>{grade.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Grades;
