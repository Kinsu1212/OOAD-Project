'use client'
import React from 'react';
import About from './About';
import Sidebar from '@/components_faculty/Sidebar';
import SubSideBar from '@/components_faculty/Subsidebar';

function AssignmentPage() {
  return (
    <div className="App">
      <Sidebar/>
      <SubSideBar/>
      <About/>
    </div>
  );
}

export default AssignmentPage;