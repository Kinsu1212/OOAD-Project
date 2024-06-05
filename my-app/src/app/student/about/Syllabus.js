'use client'
import React,{ useEffect, useState } from "react";
import './Syllabus.css';

export default function Syllabus() {
    // get data from back end and then return
  const [syllabus, setSyllabus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSyllabus = async () => {
      try {
        const response = await fetch('http://ec2-54-153-39-198.us-west-1.compute.amazonaws.com:5000/get_syllabus', {
                                  method: 'POST',
                                  headers: {
                                    'Content-Type': 'application/json'
                                  },
                                  body: JSON.stringify({ course_id: localStorage.getItem('courseCode'), role:localStorage.getItem('role')})
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSyllabus(data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSyllabus();
  }, []);

  return(
    <div className="syllabus">
      <h1>Syllabus</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {syllabus.map((item) => (
          <li key={item.id}>{item.syllabus}</li>
        ))}
      </ul>
    </div>
  )

}