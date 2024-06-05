'use client'
import React from 'react';
import AssignmentCard from '@/components_student/AssignmentCard';
import './AssignmentBoard.css';
import CourseInfo from '@/components_common/CourseInfo';
import { useEffect, useState } from 'react';


async function get_current_assignment() {
  try {
    // localStorage.setItem('user_id', 721); 
    // localStorage.setItem('role', 'student');
    // localStorage.setItem('course_id', 106);

    const response = await fetch(`http://ec2-54-183-22-164.us-west-1.compute.amazonaws.com:5000/get_assignment`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: localStorage.getItem('user_id'), role: localStorage.getItem('role'), course_id: localStorage.getItem('courseCode') })
      });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching historic courses:', error);
    return [];
  }
}




function AssignmentBoard() {
  const [assignments, setAssignment] = useState([]);
  useEffect(() => {
    async function fetchAssignment() {
      const assignment = await get_current_assignment();
      setAssignment(assignment);
    }
    fetchAssignment();
  }, []);
return (
    <div className='assignment-dashboard'>
      <div className='assignment-header'>
        <p className='title-line'>Assignment for {localStorage.getItem('courseCode')}</p>
      </div>
      {/* for each assignment call the assignment create a card */}
      {assignments.map((assignment, index) => (
        <AssignmentCard key={index} title={assignment.title} dueDate={assignment.due_date} totalPoints={assignment.total_points} content={assignment.content}/>
      ))}
    </div>
  );
};

export default AssignmentBoard;