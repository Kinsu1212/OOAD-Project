// import React from 'react';
// import './Sidebar.css'; // Create a corresponding CSS file for styling
// import Link from 'next/link';
// function Sidebar() {
//   // Add any additional links or sections you need here

//   return (
//     <div className="sidebar">
//       <div className="sidebar-item"><Link href={{pathname:"/admin"}}>Account</Link></div>
//       <div className="sidebar-item"><Link href={{pathname:"/admin/facultylist"}}>Faculties</Link></div>
//       <div className="sidebar-item"><Link href={{pathname:"/admin/tobeassigned"}}>To Be Assigned</Link></div>

//     </div>
//   );
// }

// export default Sidebar; 

'use client'
import React from 'react';
import './Sidebar.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Sidebar() {
  const router = useRouter();


  return (
    <div className="sidebar">
      <div className="sidebar-item"><Link className="sidebar-item2" href={{pathname:"/admin"}}>Account</Link></div>
      <div className="sidebar-item"><Link className="sidebar-item2" href={{pathname:"/admin/facultylist"}}>Faculties</Link></div>
      <div className="sidebar-item"><Link className="sidebar-item2" href={{pathname:"/admin/tobeassigned"}}>To Be Assigned</Link></div>
      <div className="sidebar-item"><Link className="sidebar-item2" href={{pathname:"/"}}>Logout</Link></div>
      {/*  <div className="sidebar-item logout" onClick={handleLogout}>Logout</div> */}

    </div>
  );
}

export default Sidebar;
