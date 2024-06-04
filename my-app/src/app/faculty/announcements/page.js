'use client'
import React from 'react';
import Announcement from './Announcement';
import Sidebar from '@/components_faculty/Sidebar';
import SubSideBar from '@/components_faculty/Subsidebar';

function AnnouncementPage() {
  return (
    <div className="App">
      <Sidebar/>
      <SubSideBar/>
      <Announcement/>
    </div>
  );
}

export default AnnouncementPage;