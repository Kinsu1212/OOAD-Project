import React, { useState, useEffect } from 'react';
import './EditProfile.css';

const EditProfile = ({ setEditProfileBtn }) => {
  const [bio, setBio] = useState('');
  const [instagramLink, setInstagramLink] = useState('');
  const [linkedinLink, setLinkedinLink] = useState('');
  const [notification, setNotification] = useState('enabled'); // default to 'enabled'

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://ec2-54-153-120-83.us-west-1.compute.amazonaws.com:5000/profile_data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: localStorage.getItem('user_id') })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        const userData = await response.json();
        console.log(userData)
        if (userData.length > 0) {
          const profileData = userData[0]; // Assuming userData is an array with one object
          setBio(profileData.about || ''); 
          setInstagramLink(profileData.insta || ''); 
          setLinkedinLink(profileData.linkedin || ''); 
          setNotification(profileData.notification ? 'enabled' : 'disabled'); // Adjust based on actual data structure
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleInstagramChange = (event) => {
    setInstagramLink(event.target.value);
  };

  const handleLinkedinChange = (event) => {
    setLinkedinLink(event.target.value);
  };

  const handleNotificationChange = (event) => {
    setNotification(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const user_id = parseInt(localStorage.getItem('user_id'), 10);
      const response = await fetch('http://ec2-54-153-120-83.us-west-1.compute.amazonaws.com:5000/edit_profile_data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user_id,
          about: bio,
          instagram: instagramLink,
          linkedin: linkedinLink,
          notification: notification
        }),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to submit profile data');
      }

      setEditProfileBtn(false);
      window.location.reload();
    } catch (error) {
      console.error('Error submitting profile data:', error);
    }
  };

  return (
    <div className="edit-profile">
      <div className="input-group">
        <label htmlFor="bio">Bio:</label>
        <input type="text" id="bio" value={bio} onChange={handleBioChange} placeholder="Your bio" />
      </div>
      <div className="input-group">
        <label htmlFor="instagram">Github:</label>
        <input type="text" id="instagram" value={instagramLink} onChange={handleInstagramChange} placeholder="Instagram link" />
      </div>
      <div className="input-group">
        <label htmlFor="linkedin">LinkedIn:</label>
        <input type="text" id="linkedin" value={linkedinLink} onChange={handleLinkedinChange} placeholder="LinkedIn link" />
      </div>
      <div className="input-group">
        <label htmlFor="notification">Email Notifications:</label>
        <select id="notification" value={notification} onChange={handleNotificationChange}>
          <option value="enabled">Enabled</option>
          <option value="disabled">Disabled</option>
        </select>
      </div>
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
};

export default EditProfile;



// import React, { useState, useEffect } from 'react';
// import './EditProfile.css';

// const EditProfile = ({setEditProfileBtn}) => {
//   const [bio, setBio] = useState('');
//   const [instagramLink, setInstagramLink] = useState('');
//   const [linkedinLink, setLinkedinLink] = useState('');

//   // Fetch user data
//   useEffect(() => {
//     const fetchUserData = async () => {
//       // Simulate fetching data from an API
      
//       try {
//         //localStorage.setItem('course_id', 110); // This should ideally be passed as a prop or through context
      
//         const response = await fetch('http://ec2-54-153-120-83.us-west-1.compute.amazonaws.com:5000/profile_data', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ user_id: localStorage.getItem('user_id') })
//         });
        
//         if (!response.ok) {
//           throw new Error('Failed to fetch');
//         }

//         const userData = await response.json();
//         console.log(userData)
//         if (userData.length > 0) {
//           const profileData = userData[0]; // Assuming that userData is an array with one object
//           setBio(profileData.about || ''); // Use empty string as fallback
//           setInstagramLink(profileData.insta || ''); // Use empty string as fallback
//           setLinkedinLink(profileData.linkedin || ''); // Use empty string as fallback
//         }
//       } catch (error) {
//         console.error('Error fetching people:', error);
//       }

//     };

//     fetchUserData();
//   }, []);

//   const handleBioChange = (event) => {
//     setBio(event.target.value);
//   };

//   const handleInstagramChange = (event) => {
//     setInstagramLink(event.target.value);
//   };

//   const handleLinkedinChange = (event) => {
//     setLinkedinLink(event.target.value);
//   };

//   const handleSubmit = async () => {
//     try {
//       const user_id = parseInt(localStorage.getItem('user_id'), 10);
//       const response = await fetch('http://ec2-54-153-120-83.us-west-1.compute.amazonaws.com:5000/edit_profile_data', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           user_id: user_id,
//           about: bio,
//           instagram: instagramLink,
//           linkedin: linkedinLink
//         }),
//         credentials: 'include' // If you are using cookies/session authentication
//       });

//       if (!response.ok) {
//         throw new Error('Failed to submit profile data');
//       }

//       // Handle the response if needed, or close the edit profile modal
//       setEditProfileBtn(false);

//       // You might want to refresh the user data on the Profile page or globally

//     } catch (error) {
//       console.error('Error submitting profile data:', error);
//       console.log(JSON.stringify({
//         user_id: localStorage.getItem('user_id'),
//         about: bio,
//         instagram: instagramLink,
//         linkedin: linkedinLink}))
//     }
//   };

//   return (
//     <div className="edit-profile">
//       <div className="input-group">
//         <label htmlFor="bio">Bio:</label>
//         <input
//           type="text"
//           id="bio"
//           value={bio}
//           onChange={handleBioChange}
//           placeholder="Your bio"
//         />
//       </div>
//       <div className="input-group">
//         <label htmlFor="instagram">Instagram:</label>
//         <input
//           type="text"
//           id="instagram"
//           value={instagramLink}
//           onChange={handleInstagramChange}
//           placeholder="Instagram link"
//         />
//       </div>
//       <div className="input-group">
//         <label htmlFor="linkedin">LinkedIn:</label>
//         <input
//           type="text"
//           id="linkedin"
//           value={linkedinLink}
//           onChange={handleLinkedinChange}
//           placeholder="LinkedIn link"
//         />
//       </div>
//       <button onClick={handleSubmit}>Save</button>
//     </div>
//   );
// };

// export default EditProfile;