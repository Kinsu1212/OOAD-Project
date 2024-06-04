'use client'
import React from 'react';
import Assignment from './Assignment';
import Sidebar from '@/components_faculty/Sidebar';
import SubSideBar from '@/components_faculty/Subsidebar';

function AssignmentPage() {
  return (
    <div className="App">
      <Sidebar/>
      <SubSideBar/>
      <Assignment/>
    </div>
  );
}

export default AssignmentPage;