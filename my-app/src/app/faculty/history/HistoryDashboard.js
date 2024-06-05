'use client'
import CourseCard from '../../../components_common/CourseCard';
import '../dashboard/Dashboard.css';
import { useEffect, useState } from 'react';

async function getHistoricCourses(studentId) {
  try {
    //localStorage.setItem('user_id', 403); 
    const response = await fetch(`http://ec2-54-183-22-164.us-west-1.compute.amazonaws.com:5000/get_previous_faculty_courses`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: localStorage.getItem('user_id') })
      });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching historic courses:', error);
    return [];
  }
}

export default function HistoryDashboard() {
  const colors = ['blue', 'red', 'purple', 'green'];
  const [historicCourses, setHistoricCourses] = useState([]);

  useEffect(() => {
    async function fetchHistoricCourses() {
      const courses = await getHistoricCourses(1);
      setHistoricCourses(courses);
    }
    fetchHistoricCourses();
  }, []);

  return (
    <div className="App">
      <div className="dashboard">
        <h1>Previously Taken Courses</h1>
        <div className="course-grid">
          {historicCourses.length > 0 ? (
            historicCourses.map((course, index) => (
            <CourseCard
              key={index}
              title={course.course_title}
              code={course.course_id}
              color={colors[index % colors.length]}
            />
          ))
        ) : (
          <p>No courses taught previously.</p>
        )}
        </div>
      </div>
    </div>
  );
}