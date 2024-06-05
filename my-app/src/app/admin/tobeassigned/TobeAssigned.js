import React, { useEffect, useState } from 'react';
import './TobeAssigned.css'; // Assuming the CSS file is in the same directory

function TobeAssigned() {
  const [courses, setCourses] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
    fetchFaculty();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('https://ec2-54-67-80-169.us-west-1.compute.amazonaws.com:5000/get_courses_tobe_assigned', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({})  // Sending empty JSON object
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchFaculty = async () => {
    try {
      const response = await fetch('https://ec2-54-67-80-169.us-west-1.compute.amazonaws.com:5000/get_faculty_user_ids', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}) 
      });
      if (!response.ok) {
        throw new Error('Failed to fetch faculty');
      }
      const data = await response.json();
      setFaculty(data);
    } catch (error) {
      console.error('Error fetching faculty:', error);
      setError(error.message);
    }
  };

  const handleFacultyChange = (courseId, facultyId) => {
    setSelectedFaculty(prev => ({ ...prev, [courseId]: facultyId }));
  };

  const assignCourse = async (courseId) => {
    const facultyId = selectedFaculty[courseId];
    if (!facultyId) return;

    try {
      await fetch('https://ec2-54-67-80-169.us-west-1.compute.amazonaws.com:5000/assign_course', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ course_id: courseId, faculty_id: facultyId })
      });
      alert('Faculty assigned successfully');
    } catch (error) {
      console.error('Error assigning faculty:', error);
      alert('Failed to assign faculty');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="tobeassigned-list">
      <div className="account-header-assign">
        <h1>Courses to be Assigned</h1>
      </div>
      {courses.length > 0 ? (
        courses.map((course) => (
          <div key={course.course_id} className="course-item">
            <h3>{course.course_title}</h3>
            <p>Semester: {course.semester}</p>
            <select value={selectedFaculty[course.course_id] || ''} onChange={(e) => handleFacultyChange(course.course_id, e.target.value)}>
              <option value="">Select Faculty</option>
              {faculty.map(f => (
                <option key={f.faculty_id} value={f.faculty_id}>{f.name}</option>
              ))}
            </select>
            <button onClick={() => assignCourse(course.course_id)}>Assign</button>
          </div>
        ))
      ) : (
        <div>No courses available to be assigned.</div>
      )}
    </div>
  );
}

export default TobeAssigned;





