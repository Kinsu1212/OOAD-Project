import util
def get_current_assignmments(engine, course_id):
    '''
    '''
    query = f'''
    SELECT a.title, a.total_points, a.due_date,a.content 
    from assignments a
    where a.course_id = {course_id} and assignment_type = 'homework' and a.is_published=1;'''
    assignmets = []
    for a in util.execute_query(engine, query).fetchall():
        assignmets.append({
            'title': a[0],
            'total_points': a[1],
            'due_date': a[2],
            'content': a[3]
        })
    #returns a list of dictionaries
    return assignmets

def get_current_quiz(engine, course_id):
    '''
    '''
    query = f'''
    SELECT a.title, a.total_points, a.due_date,a.content 
    from assignments a
    where a.course_id = {course_id} and assignment_type = 'quiz' and a.is_published=1;'''
    assignmets = []
    for a in util.execute_query(engine, query).fetchall():
        assignmets.append({
            'title': a[0],
            'total_points': a[1],
            'due_date': a[2],
            'content': a[3]
        })
    #returns a list of dictionaries
    return assignmets

def get_current_course(request_data, engine):
    semester = util.get_current_sem()
    student_id = request_data['user_id']
    query = f'''
    SELECT c.course_id, c.course_title
    FROM courses c
    JOIN enrollment e ON c.course_id = e.course_id
    WHERE e.student_id = {student_id} AND e.semester = '{semester}' AND c.is_published = 1;
    '''
    res = util.execute_query(engine, query)

    courses = util.convert_courses_rows_to_dict(res)
    
    return courses

def get_previous_courses(request_data, engine):
    semester = util.get_current_sem()
    student_id = request_data['user_id']
    query = f'''
    SELECT c.course_id, c.course_title
    FROM courses c
    JOIN enrollment e ON c.course_id = e.course_id
    WHERE e.student_id = {student_id} AND e.semester != '{semester}' AND c.is_published = 1;
    '''
    res = util.execute_query(engine, query)

    courses = util.convert_courses_rows_to_dict(res)
    
    return courses

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

def get_syllabus(request_data, engine):
    course_id = request_data['course_id']
    query = f'''
    SELECT syllabus
    FROM courses
    WHERE course_id = '{course_id}';
    '''
    res = util.execute_query(engine, query)

    syllabus = util.syllabus_rows_to_dict(res)
    
    return syllabus