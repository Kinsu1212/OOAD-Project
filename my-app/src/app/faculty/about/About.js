// import React, { useEffect, useState } from 'react';
// import '../assignments/Assignment.css';

// function CourseContent() {
//   const [contents, setContents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [retry, setRetry] = useState(0);
//   const [newContent, setNewContent] = useState({
//     title: '',
//     description: ''
//   });

//   const fetchCourseContent = async () => {
//     try {
//       const response = await fetch('http://ec2-54-183-22-164.us-west-1.compute.amazonaws.com:5000/get_course_content', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ course_id: localStorage.getItem('courseCode') })
//       });
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       setContents(data);
//     } catch (error) {
//       console.error('Error fetching course content:', error);
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCourseContent();
//   }, [retry]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewContent(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://ec2-54-183-22-164.us-west-1.compute.amazonaws.com:5000/add_course_content', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           ...newContent,
//           course_id: localStorage.getItem('courseCode')
//         })
//       });
//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.error || 'Failed to create course content');
//       }
//       setRetry(retry + 1);
//       setContents([...contents, data]);
//       setNewContent({ title: '', description: ''}); // Reset form
//     } catch (error) {
//       console.error('Error creating course content:', error);
//       setError(error.message);
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="content-list">
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="title" value={newContent.title} onChange={handleInputChange} placeholder="Title" required />
//         <textarea name="description" value={newContent.description} onChange={handleInputChange} placeholder="Description" required />
//         <button type="submit">Add Content</button>
//       </form>
//       {contents.length > 0 ? (
//         contents.map((item, index) => (
//           <div key={index} className="content-item">
//             <h3>{item.title}</h3>
//             <p>{item.description}</p>
//           </div>
//         ))
//       ) : (
//         <div>No course content available.</div>
//       )}
//     </div>
//   );
// }

// export default CourseContent;


// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';

// // const AddCourseContent = () => {
// //     const [title, setTitle] = useState('');
// //     const [content, setContent] = useState('');

// //     useEffect(() => {
// //         // Fetch course content when component mounts
// //         fetchCourseContent();
// //     }, []);

// //     const fetchCourseContent = async () => {
// //         try {
// //             const response = await axios.post('http://ec2-54-183-22-164.us-west-1.compute.amazonaws.com:5000/get_course_content', { course_id: 'YOUR_COURSE_ID_HERE' });
// //             const { course_title, course_content } = response.data;
// //             setTitle(course_title);
// //             setContent(course_content);
// //         } catch (error) {
// //             console.error('Error while fetching course content:', error);
// //         }
// //     };

// //     const handleSubmit = async () => {
// //         try {
// //             const response = await axios.post('http://ec2-54-183-22-164.us-west-1.compute.amazonaws.com:5000/update_course_content', {
// //                 course_id: 'YOUR_COURSE_ID_HERE',
// //                 title,
// //                 content
// //             });
// //             console.log('Update successful:', response.data);
// //         } catch (error) {
// //             console.error('Error submitting course content:', error);
// //         }
// //     };

// //     return (
// //         <div>
// //             <input
// //                 value={title}
// //                 onChange={(e) => setTitle(e.target.value)}
// //                 placeholder="Title"
// //             />
// //             <textarea
// //                 value={content}
// //                 onChange={(e) => setContent(e.target.value)}
// //                 rows={5}
// //                 cols={50}
// //             />
// //             <button onClick={handleSubmit}>Submit</button>
// //         </div>
// //     );
// // };

// // export default AddCourseContent;


// import React, { useEffect, useState } from 'react';
// import '../about/About.css';

// function About() {
//   const [quizzes, setQuizzes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [trying, setTrying] = useState(0);
//   const [newQuiz, setNewQuiz] = useState({
//     title: '',
//     content: ''
//   });

//     const fetchQuizzes = async () => {
//       try {
//         const response = await fetch('http://ec2-54-183-22-164.us-west-1.compute.amazonaws.com:5000/get_course_content', {
//                                   method: 'POST',
//                                   headers: {
//                                     'Content-Type': 'application/json'
//                                   },
//                                   body: JSON.stringify({course_id: localStorage.getItem('courseCode')})
//         });
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setQuizzes(data);
//         console.log(data);
//       } catch (error) {
//         console.error('Error fetching quizzes:', error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//   useEffect(() => {
//     fetchQuizzes();
//   }, [trying]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewQuiz(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://ec2-54-183-22-164.us-west-1.compute.amazonaws.com:5000/add_course_content', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           ...newQuiz,
//           course_id: localStorage.getItem('courseCode')
//         })
//       });
//       // if (!response.ok) {
//       //   throw new Error('Failed to create quiz');
//       // }
//       // const addedQuiz = await response.json();
//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.error || 'Failed to create assignment');
//       }
//       else setTrying(trying + 1);
//       setQuizzes([...quizzes, data]);
//       setNewQuiz({ course_title: '', course_content: '' }); // Reset form
//     } catch (error) {
//       console.error('Error creating quiz:', error);
//       setError(error.message);
//     }
//   };


//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="quiz-list">
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="title" value={newQuiz.title} onChange={handleInputChange} placeholder="Title" required />
//         <textarea name="content" value={newQuiz.content} onChange={handleInputChange} placeholder="Content" required />
//         <input type="number" name="total_points" value={newQuiz.total_points} onChange={handleInputChange} placeholder="Total Points" required />
//         <input type="date" name="due_date" value={newQuiz.due_date} onChange={handleInputChange} required />
//         <button type="submit">Create Quiz</button>
//       </form>
//       {quizzes.length > 0 ? (
//         quizzes.map((item, index) => (
//           <div key={index} className="quiz-item">
//             <h3>{item.title}</h3>
//             <p>{item.content}</p>
//             <span>Points: {item.total_points}</span>
//             <span>Due: {new Date(item.due_date).toLocaleDateString()}</span>
//             <button onClick={() => togglePublish(item.assignment_id, item.is_published)}>Toggle Publish</button>
//           </div>
//         ))
//       ) : (
//         <div>No quizzes available.</div>
//       )}
//     </div>
//   );
// }


//   return (
//     <div className="content-list">
//     <h1>Account</h1>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="title" value={newQuiz.course_title} onChange={handleInputChange} placeholder="Title" required />
//         <textarea name="description" value={newQuiz.course_content} onChange={handleInputChange} placeholder="Description" required />
//         <textarea name="syllabus" value={newQuiz.syllabus} onChange={handleInputChange} placeholder="Syllabus" required />
//         <button type="submit">Edit Content</button>
//       </form>
//       {quizzes.length > 0 ? (
//         quizzes.map((item, index) => (
//           <div key={index} className="content-item">
//             <h3>{item.course_title}</h3>
//             <p>{item.course_content}</p>
//             <p>{item.syllabus}</p>
//           </div>
//         ))
//       ) : (
//         <div>No course content available.</div>
//       )}
//     </div>
//   );
// }


// export default About;

import React, { useState, useEffect } from 'react';
import './About.css';
import AboutEdit from './AboutEdit';

function About() {
  const [courseDetails, setCourseDetails] = useState([{course_title: '', course_content: '', syllabus: ''}]);
  const [editCourseBtn, setEditCourseBtn] = useState(false);
//   const [courseId, setCourseId] = useState(localStorage.getItem('courseCode'));

  useEffect(() => {
    // if (!courseId) {
    //     return;
    //   }

    async function fetchCourseContent() {
      const response = await fetch('http://ec2-54-183-22-164.us-west-1.compute.amazonaws.com:5000/get_course_content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ course_id: localStorage.getItem('courseCode')})
      });

      if (response.ok) {
        const data = await response.json();
        setCourseDetails({course_title:data[0].course_title, course_content:data[0].course_content, syllabus:data[0].syllabus});
      } else {
        console.error('Failed to fetch course content');
      }
    }

    fetchCourseContent();
  }, []);

  if (!courseDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="about">
      <div className="account-header">
        <h1>{courseDetails.course_title}</h1>
        {/* <button className="top-right-button"><Link href={{pathname:"/student/editdetails"}}>Edit Profile</Link></button> */}
        <button onClick={() => {setEditCourseBtn(true)}} className="top-right-button">Edit Course</button>
      </div>
      <div className='account-details'>
        <p>{courseDetails.course_content}</p>
        <p>{courseDetails.syllabus}</p>
      </div>
    {editCourseBtn &&  
    <div className="account"> <AboutEdit setEditCourseBtn={setEditCourseBtn} /></div>
    }
    </div>
  );
}

export default About;
