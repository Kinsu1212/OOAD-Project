'use client'
import React from 'react';
import Dashboard from './dashboard/Dashboard';
import Sidebar from '../../components_faculty/Sidebar';
import './Page.css'; // This is your main CSS file
import Profile from '@/components_common/Profile';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Profile/>
    </div>
  );
}

export default App;