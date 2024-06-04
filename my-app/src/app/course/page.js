'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import StudentCourseSidebar from '@/components_student/StudentCourseSidebar';
import FacultyCourseSidebar from '@/components_faculty/FacultyCourseSidebar';
import CourseDashboard from './CourseDashboard';
import CourseInfo from '@/components_common/CourseInfo';


export default function Page1() {
  
  let a = useSearchParams();
  let code = a.get('courseCode');
  //setting the course code 
  CourseInfo.setCourseCode(code);
  let s = CourseInfo.getCourseCode();
  console.log('Course code:', s);
  
  const role = localStorage.getItem('role');
 
  return (
    <div className="CourseApp">
      {role === 'faculty' && <FacultyCourseSidebar />}
      {role === 'student' && <StudentCourseSidebar />}
      <CourseDashboard courseCode = {code} />
    </div>
  );
}














// 'use client';
// import { usePathname, useSearchParams } from 'next/navigation';
// import StudentCourseSidebar from '@/components_student/StudentCourseSidebar';
// import FacultyCourseSidebar from '@/components_faculty/FacultyCourseSidebar';
// import CourseDashboard from './CourseDashboard';
// import CourseInfo from '@/components_common/CourseInfo';


// export default function Page1() {
  
//   let a = useSearchParams();
//   let code = a.get('courseCode');
//   //setting the course code 
//   CourseInfo.setCourseCode(code);
//   let s = CourseInfo.getCourseCode();
//   console.log('Course code:', s);

//   return (
//     <div className="CourseApp">
//       <FacultyCourseSidebar />
//       <CourseDashboard courseCode = {code} />
//     </div>
//   );
// }

