import React, { useEffect, useState } from 'react';
import '../announcements/Announcement.css';
import CreateAnnouncement from './CreateAnnouncement';

function Announcement() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(1);

  useEffect(() => {
    console.log(reload);
    fetchAnnouncements();
  }, [reload]);

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch('https://ec2-54-67-80-169.us-west-1.compute.amazonaws.com:3000:5000/get_announcement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ course_id: localStorage.getItem('courseCode'), role: localStorage.getItem('role')})
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAnnouncements(data);
      
    } catch (error) {
      console.error('Error fetching announcements:', error);
      setError(error.message);
    } finally {
      setLoading(false);
      
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="announcement-list">
      <div className="account-header">
        <h1>Announcements</h1>
      </div>
      <div className="account-header-item">
      <CreateAnnouncement fetchAnnouncements={fetchAnnouncements} reload={reload} setReload={setReload} />
      </div>
      {announcements.length > 0 ? (
        announcements.map((item) => (
          <div key={item.announcement_id} className="announcement-item">
            <h3>{item.title}</h3>
            <p>{item.content}</p>
            <span>{new Date(item.published_date).toLocaleDateString()}</span>
          </div>
        ))
      ) : (
        <div>No announcements available.</div>
      )}
    </div>
  );
}

export default Announcement;
