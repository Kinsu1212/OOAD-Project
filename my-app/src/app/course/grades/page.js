'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import StudentCourseSidebar from '@/components_student/StudentCourseSidebar';
import GradeDashboard from './GradeDashboard';

export default function GradePage() {
  const pathname = usePathname();
  let a = useSearchParams();
  console.log('Pathname:', pathname);
  let code = a.get('courseCode');
  console.log(a.get('courseCode'));


  return (
    <div className="GradeApp">
      <StudentCourseSidebar />
      <GradeDashboard/>
    </div>
  );
}