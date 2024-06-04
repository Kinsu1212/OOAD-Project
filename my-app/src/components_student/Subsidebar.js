import React from 'react';
import './Subsidebar.css'; // Create a corresponding CSS file for styling
import Link from 'next/link';
function SubSideBar() {
  // Add any additional links or sections you need here
  return (
    <div className="subsidebar">
      <div className="subsidebar-item"><Link className="subsidebar-item" href={{pathname:"/student/about"}}>About</Link></div>
      <div className="subsidebar-item"><Link className="subsidebar-item" href={{pathname:"/student/assignments"}}>Assignments</Link></div>
      <div className="subsidebar-item"><Link className="subsidebar-item" href={{pathname:"/student/announcements"}}>Announcements</Link></div>
      <div className="subsidebar-item"><Link className="subsidebar-item" href={{pathname:"/student/quiz"}}>Quizzes</Link></div>
      <div className="subsidebar-item"><Link className="subsidebar-item" href={{pathname:"/course/grades"}}>Grade</Link></div>
    </div>
  );
}

export default SubSideBar; 
