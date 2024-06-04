// import Dashboard from './Dashboard';
'use client'
import Sidebar from '../../../components_faculty/Sidebar';
import FacultyCourseSidebar from '@/components_faculty/FacultyCourseSidebar';
import './Dashboard.css';
import Dashboard from './Dashboard';

export default function CourseList() {
  return (
    <div className="App">
      <Sidebar />
      <Dashboard />
    </div>
  );
}