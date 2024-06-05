import React, { useState, useEffect } from 'react';
import './GradeDashboard.css';
import percentage_to_grade from '@/components_common/percentage_to_grade.js';
import CourseInfo from '@/components_common/CourseInfo';

// Table row component
function AssignmentRow({ assignment }) {
  return (
    <tr>
      <td>{assignment.name}</td>
      <td>{assignment.marksReceived}</td>
      <td>{assignment.totalMarks}</td>
    </tr>
  );
}

// Main component for grades dashboard
function GradesDashboard() {
  // Reading the course code from local storage
  const courseCode = CourseInfo.getCourseCode();
  const [assignments, setAssignments] = useState([]);
  const [totalMarksObtained, setTotalMarksObtained] = useState(0);
  const [totalMarksPossible, setTotalMarksPossible] = useState(0);

  useEffect(() => {
    // Fetch the grades for the course from the database
    const fetchGrades = async () => {
      try {
        //localStorage.setItem('user_id', 418); // this should be then later handled by login, the logic page will implement it and we can then just read it
        const response = await fetch('http://ec2-54-183-22-164.us-west-1.compute.amazonaws.com:5000/get_course_grades', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          //setting the  student manually
          body: JSON.stringify({ course_id: courseCode, student_id: localStorage.getItem('user_id'), role:localStorage.getItem('role')})
        });
        if (!response.ok) {
          throw new Error('Failed to fetch grades');
        }
        const data = await response.json();
        setAssignments(data); 
        let totalObtained = 0;
        let totalPossible = 0;
        data.forEach(assignment => {
          totalObtained += assignment.marksReceived;
          totalPossible += assignment.totalMarks;
        });
        setTotalMarksObtained(totalObtained);
        setTotalMarksPossible(totalPossible);
      } catch (error) {
        console.error('Error fetching grades:', error);
      }
    };

    fetchGrades();
  }, [courseCode]); // Added courseCode as a dependency to refresh when it changes

  return (
    <div className="grade-board">
      <h2>Grades for the subject {courseCode}</h2>
      <table className="grade-table">
        <thead>
          <tr>
            <th>Assignment</th>
            <th>Marks Received</th>
            <th>Total Marks</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment, index) => (
            <AssignmentRow key={index} assignment={assignment} />
          ))}
          <tr>
            <td><strong>Total</strong></td>
            <td><strong>{totalMarksObtained}</strong></td>
            <td><strong>{totalMarksPossible}</strong></td>
          </tr>
          <tr>
            <td colSpan={3} className='cumulative-result'>
              <strong>Percentage: {((totalMarksObtained / totalMarksPossible) * 100).toFixed(2)}%</strong>
            </td>
          </tr>
          <tr>
            <td colSpan={3} className='cumulative-result'>
              <strong>Grade: {percentage_to_grade((totalMarksObtained / totalMarksPossible) * 100)}</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default GradesDashboard;