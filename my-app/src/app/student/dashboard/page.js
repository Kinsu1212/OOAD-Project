'use client'
import React from 'react';
import Dashboard from './Dashboard';
import Sidebar from '@/components_student/Sidebar';

function DashboardPage() {
  return (
    <div className="App">
      <Sidebar/>
      <Dashboard />
    </div>
  );
}

export default DashboardPage;