'use client'
import React from 'react';
import Announcement from './Announcement';
import StudentCourseSidebar from '@/components_student/StudentCourseSidebar';
function AnnouncementPage() {
  return (
    <div className="App">
      <StudentCourseSidebar/>
      <Announcement/>
    </div>
  );
}

export default AnnouncementPage;