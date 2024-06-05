'use client'
import React from 'react';
import AssignmentCard from '@/components_student/AssignmentCard';
import './AssignmentBoard.css';
import { useEffect, useState } from 'react';

async function get_current_quiz() {
  try {

    const response = await fetch(`http://ec2-54-153-39-198.us-west-1.compute.amazonaws.com:5000/get_quiz`,
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




function QuizBoard(){
  const [quizes, setQuizes] = useState([]);
  useEffect(() => {
    async function fetchQuizes() {
      const quiz = await get_current_quiz();
      setQuizes(quiz);
    }
    fetchQuizes();
  }, []);
  let course_id = localStorage.getItem('courseCode');
return (
    <div className='assignment-dashboard'>
      <div className='assignment-header'>
        <p className='title-line'>Quizes for {course_id}</p>
      </div>
      {quizes.map((assignment, index) => (
        <AssignmentCard key={index} title={assignment.title} dueDate={assignment.due_date} totalPoints={assignment.total_points} content={assignment.content}/>
      ))}
    </div>
  );
};

export default QuizBoard;