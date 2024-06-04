
import Sidebar from "./Sidebar";
import SubSideBar from "./Subsidebar";
import './AdminCourseSidebar.css';

export default function StudentCourseSidebar() {
return (
<div className="sidebar-container">
  <div className="primary-bar"><Sidebar /></div>
  <div className="secondary-bar"><SubSideBar /></div>
</div>
);
}