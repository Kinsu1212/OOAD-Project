import React from 'react';
import './Subsidebar.css'; // Create a corresponding CSS file for styling
import Link from 'next/link';
function SubSideBar() {
  // Add any additional links or sections you need here
  return (
    <div className="subsidebar">
      <div className="subsidebar-item"><Link className="subsidebar-item2" href={{pathname:"/faculty/assignments"}}>Assignments</Link></div>
      <div className="subsidebar-item"><Link className="subsidebar-item2" href={{pathname:"/faculty/announcements"}}>Announcements</Link></div>
      <div className="subsidebar-item"><Link className="subsidebar-item2" href={{pathname:"/faculty/about"}}>About</Link></div>
      <div className="subsidebar-item"><Link className="subsidebar-item2" href={{pathname:"/faculty/quizzes"}}>Quizzes</Link></div>
      <div className="subsidebar-item"><Link className="subsidebar-item2" href={{pathname:"/faculty/people"}}>People</Link></div>
      <div className="subsidebar-item"><Link className="subsidebar-item2" href={{pathname:"/faculty/tograde"}}>To Grade</Link></div>
      <div className="subsidebar-item"><Link className="subsidebar-item2" href={{pathname:"/faculty/grades"}}>Grades</Link></div>
    </div>
  );
}

export default SubSideBar; 
