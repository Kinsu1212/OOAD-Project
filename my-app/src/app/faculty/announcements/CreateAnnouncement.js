import React, { useState } from 'react';
import './CreateAnnouncement.css';

const CreateAnnouncement = ({ fetchAnnouncements,reload, setReload }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('ec2-54-183-22-164.us-west-1.compute.amazonaws.com:5000/create_announcement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          course_id: localStorage.getItem('courseCode')
        })
      });
      if (!response.ok) {
        throw new Error('Failed to submit announcement data');
      }
      setTitle('');
      setContent('');
      fetchAnnouncements();  // Refresh the announcements listz
    } catch (error) {
      console.error('Error submitting announcement:', error);
    }
  };
   const handleCreateAnnouncement = () => {
    setReload(reload+1);
   }

  return (
    <form className="create-announcement" onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Announcement Title"
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Announcement Content"
          required
        />
      </div>
      <button type="submit" onClick={() => {handleCreateAnnouncement()}}>Create Announcement</button>
    </form>
  );
};

export default CreateAnnouncement;
