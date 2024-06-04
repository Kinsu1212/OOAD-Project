// import Dashboard from './Dashboard';
'use client'
import ToGrade from './ToGrade';
import './ToGrade.css';
import FacultyCourseSidebar from '@/components_faculty/FacultyCourseSidebar';

export default function ToGradeList() {
  return (
    <div className="App">
      <FacultyCourseSidebar />
      <ToGrade />
    </div>
  );
}