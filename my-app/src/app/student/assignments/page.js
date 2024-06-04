'use client'
import React from 'react';
import StudentCourseSidebar from '@/components_student/StudentCourseSidebar';
import AssignmentBoard from './AssignmentBoard';

function AssignmentPage() {
    
  return (
    <div className="AssignmentApp">
      <StudentCourseSidebar/>
       <AssignmentBoard /> 
    </div>
  );
}
export default AssignmentPage;