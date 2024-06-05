// import React, { useEffect, useState } from 'react';
// import '../assignments/Assignment.css';

// function Quiz() {
//   const [quizzes, setQuizzes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [trying, setTrying] = useState(0);
//   const [newQuiz, setNewQuiz] = useState({
//     title: '',
//     content: '',
//     total_points: '',
//     due_date: ''
//   });

//     const fetchQuizzes = async () => {
//       try {
//         localStorage.setItem('assignment_type', 'quiz');
//         const response = await fetch('http://ec2-54-153-39-198.us-west-1.compute.amazonaws.com:5000/get_assignment', {
//                                   method: 'POST',
//                                   headers: {
//                                     'Content-Type': 'application/json'
//                                   },
//                                   body: JSON.stringify({ course_id: localStorage.getItem('courseCode'), assignment_type: localStorage.getItem('assignment_type')})
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
//       const response = await fetch('http://ec2-54-153-39-198.us-west-1.compute.amazonaws.com:5000/create_assignment', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           ...newQuiz,
//           course_id: localStorage.getItem('courseCode'),  // Ensure this is being correctly set and retrieved
//           assignment_type: localStorage.getItem('assignment_type'), // Also ensure this is set
//           is_published: 0  // Assuming you want to auto-publish; adjust as necessary
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
//       setNewQuiz({ title: '', content: '', total_points: '', due_date: '' }); // Reset form
//     } catch (error) {
//       console.error('Error creating quiz:', error);
//       setError(error.message);
//     }
//   };

//   const togglePublish = async (quizId, isPublished) => {
//     try {
//       localStorage.setItem('assignment_id', quizId);
//       const response = await fetch(`http://ec2-54-153-39-198.us-west-1.compute.amazonaws.com:5000/toggle_publish/${quizId}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({is_published: isPublished ? 0 : 1 })  // Toggle the state
//       });
//       const data = await response.json();
//       console.log(isPublished, data);
//       if (!response.ok) {
//         throw new Error(data.error || 'Failed to toggle publish state');
//       }
//       fetchQuizzes();  // Re-fetch quizzes to update the list
//     } catch (error) {
//       console.error('Error toggling publish state:', error);
//       setError(error.message);
//     }
//   };


//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   const sortedQuizzes = [...quizzes].sort((a, b) => new Date(a.due_date) - new Date(b.due_date));

//   return (
//     <div className="quiz-list">
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="title" value={newQuiz.title} onChange={handleInputChange} placeholder="Title" required />
//         <textarea name="content" value={newQuiz.content} onChange={handleInputChange} placeholder="Content" required />
//         <input type="number" name="total_points" value={newQuiz.total_points} onChange={handleInputChange} placeholder="Total Points" required />
//         <input type="date" name="due_date" value={newQuiz.due_date} onChange={handleInputChange} required />
//         <button type="submit">Create Quiz</button>
//       </form>
//       {sortedQuizzes.length > 0 ? (
//         sortedQuizzes.map((item, index) => (
//           <div key={index} className="quiz-item">
//             <div className="quiz-title-wrapper">
//               <h3>{item.title}</h3>
//               <button className={`${item.is_published ? 'published' : 'not-published'}`} onClick={() => togglePublish(item.assignment_id, item.is_published)}>{item.is_published ? 'Unpublish' : 'Publish'}</button>
//             </div>
//             <p>{item.content}</p>
//             <span>Points: {item.total_points}</span>
//             {item.due_date && (
//             <span>Due: {new Date(item.due_date).toLocaleDateString()}</span>
//             )}
//           </div>
//         ))
//       ) : (
//         <div>No quizzes available.</div>
//       )}
//     </div>
//   );
// }

// export default Quiz;

import React, { useEffect, useState } from 'react';
import '../assignments/Assignment.css';

function Quiz() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trying, setTrying] = useState(0);
  const [newQuiz, setNewQuiz] = useState({
    title: '',
    content: '',
    total_points: '',
    due_date: ''
  });

    const fetchQuizzes = async () => {
      try {
        localStorage.setItem('assignment_type', 'quiz');
        const response = await fetch('http://ec2-54-153-39-198.us-west-1.compute.amazonaws.com:5000/get_assignment', {
                                  method: 'POST',
                                  headers: {
                                    'Content-Type': 'application/json'
                                  },
                                  body: JSON.stringify({ course_id: localStorage.getItem('courseCode'), assignment_type: localStorage.getItem('assignment_type'), role: localStorage.getItem('role')})
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setQuizzes(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchQuizzes();
  }, [trying]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewQuiz(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://ec2-54-153-39-198.us-west-1.compute.amazonaws.com:5000/create_assignment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...newQuiz,
          course_id: localStorage.getItem('courseCode'),  // Ensure this is being correctly set and retrieved
          assignment_type: localStorage.getItem('assignment_type'), // Also ensure this is set
          is_published: 0  // Assuming you want to auto-publish; adjust as necessary
        })
      });
      // if (!response.ok) {
      //   throw new Error('Failed to create quiz');
      // }
      // const addedQuiz = await response.json();
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create assignment');
      }
      else setTrying(trying + 1);
      setQuizzes([...quizzes, data]);
      setNewQuiz({ title: '', content: '', total_points: '', due_date: '' }); // Reset form
    } catch (error) {
      console.error('Error creating quiz:', error);
      setError(error.message);
    }
  };

  const togglePublish = async (quizId, isPublished) => {
    try {
      localStorage.setItem('assignment_id', quizId);
      const response = await fetch(`http://ec2-54-153-39-198.us-west-1.compute.amazonaws.com:5000/toggle_publish/${quizId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({is_published: isPublished ? 0 : 1 })  // Toggle the state
      });
      const data = await response.json();
      console.log(isPublished, data);
      if (!response.ok) {
        throw new Error(data.error || 'Failed to toggle publish state');
      }
      fetchQuizzes();  // Re-fetch quizzes to update the list
    } catch (error) {
      console.error('Error toggling publish state:', error);
      setError(error.message);
    }
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const sortedQuizzes = [...quizzes].sort((a, b) => new Date(a.due_date) - new Date(b.due_date));

  return (
    <div className="quiz-list">
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={newQuiz.title} onChange={handleInputChange} placeholder="Title" required />
        <textarea name="content" value={newQuiz.content} onChange={handleInputChange} placeholder="Content" required />
        <input type="number" name="total_points" value={newQuiz.total_points} onChange={handleInputChange} placeholder="Total Points" required />
        <input type="date" name="due_date" value={newQuiz.due_date} onChange={handleInputChange} required />
        <button type="submit">Create Quiz</button>
      </form>
      {sortedQuizzes.length > 0 ? (
        sortedQuizzes.map((item, index) => (
          <div key={index} className="quiz-item">
            <div className="quiz-title-wrapper">
              <h3>{item.title}</h3>
              <button className={`${item.is_published ? 'published' : 'not-published'}`} onClick={() => togglePublish(item.assignment_id, item.is_published)}>{item.is_published ? 'Unpublish' : 'Publish'}</button>
            </div>
            <p>{item.content}</p>
            <span>Points: {item.total_points}</span>
            {item.due_date && (
            <span>Due: {new Date(item.due_date).toLocaleDateString()}</span>
            )}
          </div>
        ))
      ) : (
        <div>No quizzes available.</div>
      )}
    </div>
  );
}

export default Quiz;