import './CourseDashboard.css';
export default function CourseDashboard({courseCode}) {
  return (
    <div className="App">
      <div className="course-dashboard">
        <h1></h1>
        <div className="content">
          <p>Course Code: {courseCode}</p>
        </div>
      </div>
    </div>
  );
}   