'use client'
import Grades from './Grades';
import './Grades.css';
import FacultyCourseSidebar from '@/components_faculty/FacultyCourseSidebar';

export default function GradesList() {
  return (
    <div className="App">
      <FacultyCourseSidebar />
      <Grades />
    </div>
  );
}