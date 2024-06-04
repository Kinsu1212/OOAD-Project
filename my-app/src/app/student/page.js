'use client'
import React from 'react';
import Sidebar from '../../components_student/Sidebar';
import './App.css'; // This is your main CSS file
import Profile from '@/components_common/Profile';
function App() {
  
  return (
    <div className="App">
      <Sidebar />
      <Profile />
    </div>
  );
}

export default App;