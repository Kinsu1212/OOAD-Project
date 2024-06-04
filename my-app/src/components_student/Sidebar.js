
import React from 'react';
import './Sidebar.css'; // Create a corresponding CSS file for styling
import Link from 'next/link';
function Sidebar() {
  // Add any additional links or sections you need here
  return (
    <div className="sidebar">
      <div className="sidebar-item"><Link className="sidebar-item2" href={{pathname:"/student"}}>Account</Link></div>
      <div className="sidebar-item"><Link className="sidebar-item2" href={{pathname:"/student/dashboard"}}>Dashboard</Link></div>
      <div className="sidebar-item"><Link className="sidebar-item2" href={{pathname:"/student/history"}}>History</Link></div>
      <div className="sidebar-item"><Link className="sidebar-item2" href={{pathname:"/"}}>Logout</Link></div>
    </div>
  );
}

export default Sidebar; 
