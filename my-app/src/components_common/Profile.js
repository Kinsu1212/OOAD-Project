'use client';
import React, { useState, useEffect } from 'react';
import './Profile.css'; // Make sure you import the CSS file
import Link from 'next/link';
import EditProfile from './EditProfile';

function Profile() {
  // // This is just a dummy data for now, we get the courses in this format from the backend
  const [editProfileBtn, setEditProfileBtn] = useState(false);
  const [people, setPeople] = useState([]);
  
    useEffect(() => {
      async function fetchPeople() {
        
        try {
          //localStorage.setItem('course_id', 110); // This should ideally be passed as a prop or through context
        
          const response = await fetch('http://localhost:5000/profile_data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: localStorage.getItem('user_id') })
          });
          
          if (!response.ok) {
            throw new Error('Failed to fetch');
          }
  
          const data = await response.json();
          setPeople(data);
        } catch (error) {
          console.error('Error fetching people:', error);
        }
      }
  
      fetchPeople();
    }, []);

  return (
    <>
    <div className="account">
      <div className="account-header">
        <h1>Account</h1>
        {/* <button className="top-right-button"><Link href={{pathname:"/student/editdetails"}}>Edit Profile</Link></button> */}
        <button onClick={() => {setEditProfileBtn(true)}} className="top-right-button">Edit Profile</button>
      </div>
      {people.map(account => (
      <div key={account.user_id} className='account-details'>
        <h2>SCU ID: {account.user_id}</h2>
        <h2>{account.full_name}</h2>
        <p>{account.about}</p>
        <a href={account.insta} target="_blank">Github</a>
        <a href={account.linkedin} target="_blank">LinkedIn</a>

        <h6>Email Notification: {account.notification === 1 ? 'Enabled' : 'Disabled'}</h6>
      </div>
      ))}
    </div>
    {editProfileBtn &&  
    <div className="account"> <EditProfile setEditProfileBtn={setEditProfileBtn}/></div>
    }
    </>
  );
}

export default Profile;