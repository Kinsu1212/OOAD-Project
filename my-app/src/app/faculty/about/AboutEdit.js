import React, { useState, useEffect } from 'react';
import './AboutEdit.css';

function AboutEdit({}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [syllabus, setSyllabus] = useState('');

  useEffect(() => {
    async function fetchCourseContent() {
      const response = await fetch('http://ec2-54-67-80-169.us-west-1.compute.amazonaws.com:5000/get_course_content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ course_id: localStorage.getItem('course_id') })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          const courseData = data[0]; // Assuming that data is an array with at least one object
          setTitle(courseData.course_title || '');
          setContent(courseData.course_content || '');
          setSyllabus(courseData.syllabus || '');
        }
      } else {
        throw new Error('Failed to fetch course content');
      }
    }

    fetchCourseContent();
  }, []);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSyllabusChange = (event) => {
    setSyllabus(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://ec2-54-67-80-169.us-west-1.compute.amazonaws.com:5000/edit_course_content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ course_id, title, content, syllabus })
    });

    if (response.ok) {
      alert('Course updated successfully');
      setEditing(false);
    } else {
      alert('Failed to update course');
    }
  };

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={handleTitleChange} placeholder="Course Title" />
      <textarea value={content} onChange={handleContentChange} placeholder="Course Content"></textarea>
      <textarea value={syllabus} onChange={handleSyllabusChange} placeholder="Syllabus"></textarea>
      <button type="submit">Save Changes</button>
    </form>
  );
}

export default AboutEdit;
