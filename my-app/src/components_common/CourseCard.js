import React from 'react';
import './CourseCard.css'; 
import Link from 'next/link';
import CourseInfo from './CourseInfo';

function CourseCard({ title, code, color }) {
  return (
    <Link className='card-links' href={{pathname: "/course" , query : {courseCode:code}}}>
    <div className={`course-card ${color}`}>
      <h2 className='course-title'>{title}</h2>
      {code && <p className='course-code'>{code}</p>}
    </div></Link>
  );
}

export default CourseCard;