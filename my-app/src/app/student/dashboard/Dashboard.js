import CourseCard from '../../../components_common/CourseCard';
// import './Dashboard.css'; // Make sure you import the CSS file
import '../dashboard/Dashboard.css';
import React, { useEffect, useState } from 'react';

function Dashboard() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch the courses from the database
    const fetchCourses = async () => {
      try {
        //localStorage.setItem('user_id', 418); // this should be then later handled by login, the logic page will implement it and we can then just read it
        const response = await fetch('http://ec2-54-153-120-83.us-west-1.compute.amazonaws.com:5000/get_current_courses', {
                                  method: 'POST',
                                  headers: {
                                    'Content-Type': 'application/json'
                                  },
                                  body: JSON.stringify({ user_id: localStorage.getItem('user_id'), role:localStorage.getItem('role')})
        }); 
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const colors = ['blue', 'red', 'purple', 'green'];
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className='dashboard-header-content'>Dashboard</h1>
      </div>
      <div className="course-grid">
        {courses.map((course, index) => (
          <CourseCard key={index} title={course.course_title} code={course.course_id} color={colors[index % colors.length]} />
        ))}
      </div>
    </div>
  );
}


export default Dashboard;