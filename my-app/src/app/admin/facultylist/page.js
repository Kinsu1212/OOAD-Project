'use-client'
import React from 'react';
//import Sidebar from '../../components_admin/Sidebar';
import FacultyList from './FacultyList';
import Sidebar from '@/components_admin/Sidebar';

function FacultiesListed() {
  return (
    <div className="App">
      <Sidebar/>
      <FacultyList/>
    </div>
  );
}

export default FacultiesListed;