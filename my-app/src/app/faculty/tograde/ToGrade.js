import React, { useEffect, useState } from 'react';
import './ToGrade.css';

function ToGrade() {
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        async function fetchAssignments() {
            try {
                const response = await fetch('http://localhost:5000/get_tograde_assignments', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ course_id: localStorage.getItem('courseCode') })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Assignments data:', data);
                setAssignments(data);
            } catch (error) {
                console.error('Error fetching assignments:', error);
            }
        }

        fetchAssignments();
    }, []);

    const handleGradeAssignment = async (studentId, assignmentId, totalPoints, event) => {
        const gradeInput = event.target.parentElement.querySelector('.grade-input');
        const grade = parseInt(gradeInput.value);
        
        if (isNaN(grade) || grade < 0 || grade > totalPoints) {
            alert("Please enter a valid grade.");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/assign_grade', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    student_id: studentId,
                    assignment_id: assignmentId,
                    grade: grade,
                    total_points: totalPoints
                })
            });

            if (!response.ok) {
                throw new Error('Failed to assign grade');
            }

            alert("Grade assigned successfully");
            window.location.reload();
        } catch (error) {
            console.error('Error assigning grade:', error);
            alert('Failed to assign grade');
        }
    }

    return (
        <div className="assignments-container">
            <h1>To Grade Assignments</h1>
            <div className="assignment-list">
                {assignments.map((assignment, index) => (
                    <div key={index} className="assignment-row">
                        <div className="assignment-content">{assignment.assignment_content}</div>
                        <input type="number" className="grade-input" placeholder="Enter grade" />
                        <div className="assignment-points"> / {assignment.total_points} pts</div>
                        <button onClick={(e) => handleGradeAssignment(assignment.student_id, assignment.assignment_id, assignment.total_points, e)} className="assign-btn">Assign</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ToGrade;



