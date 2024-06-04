'use client'
import React from 'react';
import TobeAssigned from './TobeAssigned';
import Sidebar from '@/components_admin/Sidebar';

function TobeAssignedPage() {
  return (
    <div className="App">
      <Sidebar/>
      <TobeAssigned/>
    </div>
  );
}

export default TobeAssignedPage;