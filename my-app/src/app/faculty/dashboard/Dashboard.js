import CourseCard from '@/components_common/CourseCard';
import './Dashboard.css'; // Make sure you import the CSS file
import React, { useEffect, useState } from 'react';

function Dashboard() {
  const [currentCourses, setCurrentCourses] = useState([]);
  const [unpublishedCourses, setUnpublishedCourses] = useState([]);

  useEffect(() => {
    // Fetch the current courses from the database
    const fetchCurrentCourses = async () => {
      try {
        const response = await fetch('http://ec2-54-153-120-83.us-west-1.compute.amazonaws.com:5000/get_current_faculty_courses', {
                                  method: 'POST',
                                  headers: {
                                    'Content-Type': 'application/json'
                                  },
                                  body: JSON.stringify({ user_id: localStorage.getItem('user_id'), role: localStorage.getItem('role')})
        });
        const data = await response.json();
        setCurrentCourses(data);
      } catch (error) {
        console.error('Error fetching current courses:', error);
      }
    };

    // Fetch the unpublished courses from the database
    const fetchUnpublishedCourses = async () => {
      try {
        const response = await fetch('http://ec2-54-153-120-83.us-west-1.compute.amazonaws.com:5000/get_unpublished_faculty_courses', {
                                  method: 'POST',
                                  headers: {
                                    'Content-Type': 'application/json'
                                  },
                                  body: JSON.stringify({ user_id: localStorage.getItem('user_id'), role: localStorage.getItem('role')})
        });
        const data = await response.json();
        setUnpublishedCourses(data);
      } catch (error) {
        console.error('Error fetching unpublished courses:', error);
      }
    };

    fetchCurrentCourses();
    fetchUnpublishedCourses();
  }, []);

  const colors = ['blue', 'red', 'purple', 'green'];
  

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Current Courses</h1>
        <div className="course-grid">
          {currentCourses.map((course, index) => (
            <CourseCard key={index} title={course.course_title} code={course.course_id} color={colors[index % colors.length]} />
          ))}
        </div>
        <h1>Unpublished Courses</h1>
        <div className="course-grid">
          {unpublishedCourses.map((course, index) => (
            <CourseCard key={index} title={course.course_title} code={course.course_id} color={colors[index % colors.length]} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

