import React, { useEffect, useState } from 'react';
import '../announcements/Announcement.css';

function Announcement() {
  const [announcement, setAnnouncement] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const response = await fetch('http://ec2-54-183-22-164.us-west-1.compute.amazonaws.com:5000/get_announcement', {
                                  method: 'POST',
                                  headers: {
                                    'Content-Type': 'application/json'
                                  },
                                  body: JSON.stringify({ course_id: localStorage.getItem('courseCode'), student_id: localStorage.getItem('user_id'), role:localStorage.getItem('role')})
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAnnouncement(data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncement();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="announcement-list">
      {announcement.length > 0 ? (
        announcement.map((item, index) => (
          <div key={index} className="announcement-item">
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
