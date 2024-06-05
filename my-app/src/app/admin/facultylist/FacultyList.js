'use client'

import React, { useEffect, useState } from 'react';
import './FacultyList.css';

function FacultyList() {
    const [faculties, setFaculties] = useState([]);
    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchFaculties();
    }, []);

    const fetchFaculties = async () => {
        const response = await fetch('http://ec2-54-67-80-169.us-west-1.compute.amazonaws.com:5000/faculty', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({faculty_id: localStorage.getItem('user_id')})
        });
        const data = await response.json();
        console.log(data[2].faculty_id)
        setFaculties(data);
    };

    const fetchCourses = async (facultyId) => {
        const response = await fetch('http://ec2-54-67-80-169.us-west-1.compute.amazonaws.com:5000/get_courses_by_faculty', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ faculty_id: facultyId })
        });
        const data = await response.json();
        setCourses(data);
        setSelectedCourse(null); // Reset selected course when changing faculty
    };

    const fetchStudents = async (courseId) => {
        const response = await fetch('http://ec2-54-67-80-169.us-west-1.compute.amazonaws.com:5000/people_in_course', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ course_id: courseId })
        });
        const data = await response.json();
        setStudents(data);
    };

    return (
        <div className="faculty-container">
            <div className="title">Faculties</div>
            <div className="faculty-list">
                {faculties.map(faculty => (
                    <div key={faculty.faculty_id} className="faculty-row" onClick={() => {
                        setSelectedFaculty(faculty);
                        fetchCourses(faculty.faculty_id);
                    }}>
                        {faculty.name}
                    </div>
                ))}
            </div>
            {selectedFaculty && (
                <div className="courses-container">
                    <div className="title">Courses by {selectedFaculty.name}</div>
                    <div className="course-list">
                        {courses.map(course => (
                            <div key={course.course_id} className="course-row" onClick={() => {
                                setSelectedCourse(course);
                                fetchStudents(course.course_id);
                            }}>
                                Course: {course.course_title} | Course Id: {course.course_id} | Semester: {course.semester}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {selectedCourse && (
                <div className="people-container">
                    <div className="title">Students in {selectedCourse.course_title}</div>
                    <div className="people-list">
                        {students.map(student => (
                            <div key={student.email} className="people-row">
                                {student.name}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default FacultyList;







// 'use client'

// import React, { useEffect, useState } from 'react';
// import './FacultyList.css';

// function FacultyList() {
//     const [faculties, setFaculties] = useState([]);

//     useEffect(() => {
//         async function fetchFaculty() {
//             try {
//                 const response = await fetch('http://ec2-54-67-80-169.us-west-1.compute.amazonaws.com:5000/faculty', {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({ user_id: localStorage.getItem('user_id') })
//                 });
                
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch');
//                 }

//                 const data = await response.json();
//                 setFaculties(data);
//             } catch (error) {
//                 console.error('Error fetching faculty:', error);
//             }
//         }

//         fetchFaculty();
//     }, []);

//     return (
//         <div className="content">
//             <div className="title">List of Faculties</div>
//             <div className="faculty-list">
//                 {faculties.map(faculty => (
//                     <div key={faculty.id} className="faculty-row">
//                         <div className="faculty-name">{faculty.name}</div>
//                         <div className="faculty-course">{faculty.course}</div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default FacultyList;



