'use client'
import React from 'react';
import Quiz from './Quiz';
import Sidebar from '@/components_student/Sidebar';
import SubSideBar from '@/components_student/Subsidebar';

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