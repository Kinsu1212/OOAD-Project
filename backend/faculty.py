import util
def get_current_course(engine, request_data):
    semester = util.get_current_sem()
    user_id = request_data['user_id']
    query = f'''
    SELECT course_id, course_title, faculty_id
    FROM courses
    WHERE faculty_id = '{user_id}' AND semester = '{semester}';
    '''
    res = util.execute_query(engine, query)

    courses = util.convert_courses_rows_to_dict(res)
    return courses

def get_announcements(request_data, engine):
    course_id = request_data['course_id']
    query = f'''
    SELECT title, content, published_date
    FROM announcement
    WHERE course_id = '{course_id}'
    ORDER BY published_date DESC;
    '''
    res = util.execute_query(engine, query)

    announcements = util.announcement_rows_to_dict(res)
    
    return announcements

def get_current_assignmments(engine,request_data):
    course_id = request_data['course_id']
    assignment_type = request_data['assignment_type']
    query = f'''
        SELECT assignment_id, title, content, total_points, due_date, is_published 
        FROM assignments
        WHERE 
                course_id = '{course_id}' AND
                assignment_type = '{assignment_type}';
    '''

    res = util.execute_query(engine, query)

    assignments = util.assignment_rows_to_dict(res)

    return assignments

def get_course_grades(request_data, engine):
    course_id = request_data['course_id']
    student_id = request_data['student_id']
    query = f'''
    SELECT g.grades,a.title, a.total_points
    FROM grades g
    JOIN assignments a ON g.assignment_id = a.assignment_id
    WHERE a.course_id = {course_id} AND g.student_id = {student_id};
    '''

    res = util.execute_query(engine, query)

    grades = []
    for r in res.fetchall():
        d = {}
        d['marksReceived'] = r[0]
        d['name'] = r[1]
        d['totalMarks'] = r[2]
        grades.append(d)
    print(len(grades))
    return grades
