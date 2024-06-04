import React from 'react';
import './Subsidebar.css'; // Create a corresponding CSS file for styling
import Link from 'next/link';
function SubSideBar() {
  // Add any additional links or sections you need here
  return (
    <div className="subsidebar">
      <div className="subsidebar-item"><Link className="subsidebar-item" href={{pathname:"/admin"}}>Spring 24</Link></div>
      <div className="subsidebar-item"><Link className="subsidebar-item" href={{pathname:"/admin"}}>Fall 23</Link></div>
      <div className="subsidebar-item"><Link className="subsidebar-item" href={{pathname:"/admin"}}>Spring 23</Link></div>
      <div className="subsidebar-item"><Link className="subsidebar-item" href={{pathname:"/admin"}}>Fall 22</Link></div>
    </div>
  );
}

export default SubSideBar; 
