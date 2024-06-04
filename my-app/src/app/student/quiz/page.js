'use client'
import React from 'react';
import StudentCourseSidebar from '@/components_student/StudentCourseSidebar';
import QuizBoard from './Quizboard';

function AssignmentPage() {
    
  return (
    <div className="AssignmentApp">
      <StudentCourseSidebar/>
       <QuizBoard /> 
    </div>
  );
}
export default AssignmentPage;