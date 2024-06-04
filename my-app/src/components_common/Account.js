import React from 'react';
import './Account.css'; // Make sure you import the CSS file

function Account() {
  // This is just a dummy data for now, we get the courses in this format from the backend
  const account = [
    { id: 1, fname: 'Samarth', lname: "Sharma", bio: 'Hi everyone', instagram: "https://www.instagram.com", linkedin: "https://www.linkedin.com"},
    // { id: 2, fname: 'Ravi', lname: "wadnerkar", bio: 'Bye everyone' }
    // ... other courses
  ];

  return (
    <div className="account">
      <div className="account-header">
        <h1>Account</h1>
      </div>
      {account.map(account => (
      <div key={account.id} className='account-details'>
        <p>SCU ID: {account.id}</p>
        <h2>{account.fname} {account.lname}</h2>
        <p>{account.bio}</p>
        <a href={account.instagram} target="_blank">Insta</a>
        <a href={account.linkedin} target="_blank">LinkedIn</a>
      </div>
      ))}
    </div>
  );
}

export default Account;