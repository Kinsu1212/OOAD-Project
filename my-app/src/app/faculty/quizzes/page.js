'use client'
import React from 'react';
import Quiz from './Quiz';
import Sidebar from '@/components_faculty/Sidebar';
import SubSideBar from '@/components_faculty/Subsidebar';

function QuizPage() {
  return (
    <div className="App">
      <Sidebar/>
      <SubSideBar/>
      <Quiz/>
    </div>
  );
}

export default QuizPage;