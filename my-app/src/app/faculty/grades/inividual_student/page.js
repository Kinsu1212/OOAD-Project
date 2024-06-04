'use client'
import React from "react";
import { usePathname, useSearchParams } from 'next/navigation';
import FacultyCourseSidebar from '@/components_faculty/FacultyCourseSidebar';
import GradesDashboardIndividual from "./GradeDashboardIndividual";
function extractId(student_name) {
    const regex = /\(([^)]+)\)/;
    const match = student_name.match(regex);
    return match ? match[1] : null;
}

export default function StundentGrades(){
let a  = useSearchParams();
let student_name = a.get('name');
// the student_name is of the format FirstName LastName (id), can you give me the code to extract the id
// and display it in the p tag below
return (<div>
    <FacultyCourseSidebar/>
    <GradesDashboardIndividual student_name={student_name}/>
    
</div>);

}