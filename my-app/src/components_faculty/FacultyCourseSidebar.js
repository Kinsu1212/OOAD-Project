
import Sidebar from "./Sidebar";
import SubSideBar from "./Subsidebar";
import './FacultyCourseSidebar.css';

export default function FacultyCourseSidebar() {
return (
<div className="sidebar-container">
  <div className="primary-bar"><Sidebar /></div>
  <div className="secondary-bar"><SubSideBar /></div>
</div>
);
}