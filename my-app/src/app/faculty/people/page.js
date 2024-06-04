// import Dashboard from './Dashboard';
'use client'
//import Sidebar from '../../../components_faculty/Sidebar';
import FacultyCourseSidebar from '@/components_faculty/FacultyCourseSidebar';
import People from '../people/People';
import './People.css';

export default function PeopleList() {
  return (
    <div className="App">
      <FacultyCourseSidebar />
      <People />
    </div>
  );
}