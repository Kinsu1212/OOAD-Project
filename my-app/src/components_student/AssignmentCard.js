import React from 'react';
import Link from 'next/link';
import './AssignmentCard.css';

function AssignmentCard({ title, dueDate, totalPoints, content }) {
  return (
    <div className='assignment-card-parent'>
    <a className='assignment-links' href={content} target="_blank" rel="noopener noreferrer">
    <div className='assignment-card'>
    <h3 className='assignment-title'>{title}</h3>
    <div className='assignment-car-line2'>
    <h4 className='due-by'>Due by:  {dueDate}</h4> 
    <h4 className='total-points'>Total Points: {totalPoints}</h4>
    </div>  
  </div></a>
  </div>
  );
}

export default AssignmentCard;