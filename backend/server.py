from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_cors import cross_origin
from datetime import datetime
from util import *
import student
import faculty

engine = None
x = datetime.now()
app = Flask(__name__)
CORS(app)

CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/get_user_data", methods=['POST'])
def get_user_data():
    keys =[] # keys that should be present in the request
    status,msg,code = validate_request(request,keys)
    if status:
        #the request is valid and all the required keys are present
        users = authenticate_user(engine, request.get_json())
        return jsonify(users)
    else:
        #the request is invalid
        return jsonify({'error':msg}),code

@app.route("/get_previous_courses", methods=['GET','POST'])
def get_previous_courses():
    keys = ['role','user_id']
    status,msg,code = validate_request(request,keys)
    if status:
        if request.get_json()['role'] == 'student':
            courses = student.get_previous_courses(request.get_json(), engine)
            return jsonify(courses)
        else:
            return jsonify({'error': 'Invalid role'}), 400
    else:
        return jsonify({'error':msg}),code

@app.route("/get_current_courses", methods=['GET','POST'])
def get_current_courses():
    keys = ['role','user_id']
    status,msg,code = validate_request(request,keys)
    if status:
        if request.get_json()['role'] == 'student':
            courses = student.get_current_course(request.get_json(), engine)
            return jsonify(courses)
        else:
            return jsonify({'error': 'Invalid role'}), 400
    else:
        return jsonify({'error':msg}),code
    if request.method == 'POST':
        content_type = request.headers.get('Content-Type')
        if content_type != 'application/json':
            return jsonify({'error': 'Invalid content type'}), 400
    
    

@app.route("/people_in_course", methods=['GET','POST'])
def people_in_course():
    if request.method == 'POST':
        content_type = request.headers.get('Content-Type')
        if content_type != 'application/json':
            return jsonify({'error': 'Invalid content type'}), 400
        
    request_data = request.get_json()
    print(request_data)
    if request_data is None:
        return jsonify({'error': 'Invalid JSON data'}), 400
    
    course_id = request_data['course_id']
    query = f'''
    SELECT CONCAT(u.first_name, " " ,u.last_name) "Full Name", u.email
    FROM enrollment e
    JOIN users u
    ON e.student_id = u.user_id
    WHERE e.course_id = '{course_id}';
    '''
    res = execute_query(engine, query)
    
    people = convert_people_rows_to_dict(res)
    
    return jsonify(people)

@app.route("/get_current_faculty_courses", methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def get_current_faculty_courses():
    # keys = ['user_id','role']
    # status,msg,code = validate_request(request,keys)
    # if status:
    #     if request.json['role'] == 'faculty':
    #         courses = faculty.get_current_course(engine,request.get_json())
    #         return jsonify(courses)
    #     else:
    #         return jsonify({'error': 'Invalid role'}), 400
    # else:
    #     return jsonify({'error':msg}),code
    if request.method == 'POST':
        content_type = request.headers.get('Content-Type')
        if content_type != 'application/json':
            return jsonify({'error': 'Invalid content type'}), 400
    
    request_data = request.get_json()
    print(request_data)
    if request_data is None:
        return jsonify({'error': 'Invalid JSON data'}), 400
    
    semester = get_current_sem()
    user_id = request_data['user_id']
    query = f'''
    SELECT course_id, course_title, faculty_id
    FROM courses
    WHERE faculty_id = '{user_id}' AND semester = '{semester}';
    '''
    res = execute_query(engine, query)

    courses = convert_courses_rows_to_dict(res)
    
    return jsonify(courses)

@app.route("/get_unpublished_faculty_courses", methods=['GET','POST'])
def get_unpublished_faculty_courses():
    request_data = request.get_json()
    print(request_data)
    if request_data is None:
        return jsonify({'error': 'Invalid JSON data'}), 400
    user_id = request_data['user_id']
    query = f'''
    SELECT course_id, course_title, faculty_id
    FROM courses
    WHERE faculty_id = '{user_id}' AND course_date > NOW();
    '''
    res = execute_query(engine, query)
    
    courses = convert_courses_rows_to_dict(res)
    
    return jsonify(courses)

@app.route("/get_previous_faculty_courses", methods=['GET','POST'])
def get_previous_faculty_courses():
    request_data = request.get_json()
    print(request_data)
    if request_data is None:
        return jsonify({'error': 'Invalid JSON data'}), 400
    semester = get_current_sem()
    user_id = request_data['user_id']
    query = f'''
    SELECT course_id, course_title, faculty_id
    FROM courses
    WHERE faculty_id = '{user_id}' AND semester != '{semester}' AND course_date < NOW();
    '''
    res = execute_query(engine, query)
    
    courses = convert_courses_rows_to_dict(res)
    
    return jsonify(courses)

@app.route("/get_tograde_assignments", methods=['GET','POST'])
def get_tograde_assignments():
    if request.method == 'POST':
        content_type = request.headers.get('Content-Type')
        if content_type != 'application/json':
            return jsonify({'error': 'Invalid content type'}), 400
        
    request_data = request.get_json()
    print(request_data)
    if request_data is None:
        return jsonify({'error': 'Invalid JSON data'}), 400
    
    course_id = request_data['course_id']
    query = f'''
    SELECT CONCAT(f.title, ' By ', u.first_name, ' ', u.last_name, ' (',f.student_id,')') assignment_by_whom, 
        f.student_id, f.assignment_id, f.total_points
    FROM users u
    JOIN
        (
        SELECT g.student_id, g.assignment_id, g.grades, a.course_id, a.title, a.total_points 
        FROM grades g
        JOIN assignments a
        ON g.assignment_id = a.assignment_id
        ) f
    ON u.user_id = f.student_id
    WHERE f.course_id = {course_id} AND f.grades IS null
    ORDER BY f.assignment_id, assignment_by_whom; 
    '''
    res = execute_query(engine, query)
    
    tograde = tograde_rows_to_dict(res)

    print (tograde)
    
    return jsonify(tograde)


@app.route("/assign_grade", methods=['POST'])
@cross_origin(supports_credentials=True)
def assign_grade():
    if request.method == 'POST':
        content_type = request.headers.get('Content-Type')
        if content_type != 'application/json':
            return jsonify({'error': 'Invalid content type'}), 400
        
    request_data = request.get_json()
    print(request_data)
    if request_data is None:
        return jsonify({'error': 'Invalid JSON data'}), 400
    
    student_id = request_data['student_id']
    assignment_id = request_data['assignment_id']
    grade = int(request_data['grade'])
    total_points = int(request_data['total_points'])
    if grade >= 0 and grade <= total_points:
        query = f'''
        UPDATE grades
        SET grades = {grade}
        WHERE student_id = {student_id} AND assignment_id = {assignment_id};
        '''
        execute_query(engine, query)

        return jsonify({"success": "Grade assigned successfully"})
    else:
        return jsonify({"failure": "Assign valid integer grade"})


@app.route("/profile_data", methods=['GET','POST'])
def profile_data():
    key = ['user_id']
    status,msg,code = validate_request(request,key)
    if status:
        user_id = request.json['user_id']
        query = f'''
        SELECT CONCAT(u.first_name, " " ,u.last_name) "Full Name", p.user_id, p.about, p.linkedin_link, p.instagram_link, p.notification_channel
        FROM profile p
        JOIN users u
        ON p.user_id = u.user_id
        WHERE p.user_id = '{user_id}';
        '''
        res = execute_query(engine, query)
        
        profile = profile_rows_to_dict(res)
        
        return jsonify(profile)
    else:
        return jsonify({'error':msg}),code



@app.route("/edit_profile_data", methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def edit_profile_data():
    try:
        request_data = request.get_json()
        if request_data is None:
            return jsonify({'error': 'Invalid JSON data'}), 400
    
        user_id = request_data['user_id']
        about = request_data['about']
        linkedin = request_data['linkedin']
        insta = request_data['instagram']
        if request_data['notification'] == 'enabled':
            notification = 1
        else:
            notification = 0
        query = f'''
        UPDATE profile 
        SET about = '{about}', linkedin_link = '{linkedin}', instagram_link = '{insta}', notification_channel = {notification}
        WHERE user_id = '{user_id}' ;
        '''
        print("SQL Query:", query)  # Log SQL query for debugging
        res = execute_query(engine, query)

        # Check if the query executed successfully
        if res is None:
            return jsonify({'error': 'Failed to update profile'}), 500
        
        return jsonify({'Success': 'Details Updated Successfully (Refresh to Verify)'})
        
    
    except Exception as e:
        # Log the exception for debugging
        print(f"An error occurred: {e}")
        # Return a generic error message to the client
        return jsonify({'error': 'An internal error occurred'}), 500
    
@app.route("/get_courses_tobe_assigned", methods=['GET','POST'])
def get_courses_tobe_assigned():
    if request.method == 'POST':
        content_type = request.headers.get('Content-Type')
        if content_type != 'application/json':
            return jsonify({'error': 'Invalid content type'}), 400
        
    request_data = request.get_json()
    print(request_data)
    if request_data is None:
        return jsonify({'error': 'Invalid JSON data'}), 400
    
    query = f'''
    SELECT course_id, course_title, semester 
    FROM courses 
    WHERE course_date  > NOW() AND faculty_id = 0
    ORDER BY course_date;
    '''
    res = execute_query(engine, query)
    
    courses = assign_courses_rows_to_dict(res)
    
    return jsonify(courses)

@app.route("/get_courses_by_faculty", methods=['GET','POST'])
def get_courses_by_faculty():
    if request.method == 'POST':
        content_type = request.headers.get('Content-Type')
        if content_type != 'application/json':
            return jsonify({'error': 'Invalid content type'}), 400
    
    request_data = request.get_json()
    print(request_data)
    if request_data is None:
        return jsonify({'error': 'Invalid JSON data'}), 400
    
    faculty_id = request_data['faculty_id']
    query = f'''
    SELECT course_id, semester, course_title
    FROM courses 
    WHERE faculty_id = {faculty_id}
    ORDER BY course_date;
    '''
    res = execute_query(engine, query)
    courses = convert_course_list_rows_to_dict(res)
    return jsonify(courses)

@app.route("/get_faculty_user_ids", methods=['GET','POST'])
def get_faculty_user_ids():
    if request.method == 'POST':
        content_type = request.headers.get('Content-Type')
        if content_type != 'application/json':
            return jsonify({'error': 'Invalid content type'}), 400
        
    request_data = request.get_json()
    print(request_data)
    if request_data is None:
        return jsonify({'error': 'Invalid JSON data'}), 400
    
    query = f'''
    SELECT user_id, CONCAT(first_name, " " ,last_name) "Full Name"
    FROM users 
    WHERE user_role = 'faculty';
    '''
    res = execute_query(engine, query)
    
    faculty_ids = faculties_rows_to_dict(res)
    
    return jsonify(faculty_ids)

@app.route("/faculty", methods=['GET','POST'])
def faculty_fn():
    if request.method == 'POST':
        content_type = request.headers.get('Content-Type')
        if content_type != 'application/json':
            return jsonify({'error': 'Invalid content type'}), 400
        
    query = f'''
    SELECT CONCAT(u.first_name, " " ,u.last_name) "Full Name", c.course_title, c.faculty_id
    FROM users u
    JOIN courses c ON u.user_id = c.faculty_id
    WHERE u.user_role = 'faculty'
    GROUP BY u.user_id;
    '''
    res = execute_query(engine, query)
    
    faculty = convert_faculty_list_rows_to_dict(res)
    
    return jsonify(faculty)

@app.route("/assign_course", methods=['POST'])
@cross_origin(supports_credentials=True)
def assign_course():
    if request.method == 'POST':
        content_type = request.headers.get('Content-Type')
        if content_type != 'application/json':
            return jsonify({'error': 'Invalid content type'}), 400
        
    request_data = request.get_json()
    print(request_data)
    if request_data is None:
        return jsonify({'error': 'Invalid JSON data'}), 400
    
    course_id = request_data['course_id']
    faculty_id = request_data['faculty_id']
    query = f'''
    UPDATE courses
    SET faculty_id = {faculty_id}
    WHERE course_id = {course_id}
    '''
    execute_query(engine, query)

    return jsonify({"success": "Faculty assigned successfully"})    

@app.route("/get_scores_by_student", methods=['GET','POST'])
def get_scores_by_student():
    if request.method == 'POST':
        content_type = request.headers.get('Content-Type')
        if content_type != 'application/json':
            return jsonify({'error': 'Invalid content type'}), 400
    
    request_data = request.get_json()
    print(request_data)
    if request_data is None:
        return jsonify({'error': 'Invalid JSON data'}), 400
    
    course_id = request_data['course_id']
    query = f'''
            SELECT CONCAT(u.first_name, ' ', u.last_name, ' (', s.student_id, ')') student_name, ROUND(100*(SUM(s.grades)/SUM(s.total_points)), 2) score 
            FROM 
                    (
                    SELECT g.student_id, g.grades, a.total_points 
                    FROM grades g
                    JOIN assignments a
                    ON g.assignment_id = a.assignment_id
                    WHERE grades IS NOT NULL AND course_id = {course_id}
                    ) s
            JOIN users u
            ON u.user_id = s.student_id 
            GROUP BY s.student_id;
    '''
    res = execute_query(engine, query)

    scores = scores_rows_to_dict(res)

    return jsonify(scores)

@app.route("/get_announcement", methods=['GET','POST'])
def get_announcement():
    if request.method == 'POST':
        content_type = request.headers.get('Content-Type')
        if content_type != 'application/json':
            return jsonify({'error': 'Invalid content type'}), 400
    
    request_data = request.get_json()
    print(request_data)
    if request_data is None:
        return jsonify({'error': 'Invalid JSON data'}), 400
        # Convert datetime to ISO format
    # for a in announcement:
    #     a['published_date'] = a['published_date'].isoformat()
    if request_data['role'] == 'student':
        announcements = student.get_announcements(request_data, engine)
    if request_data['role'] == 'faculty':
        announcements = faculty.get_announcements(request_data, engine)
    return jsonify(announcements)

@app.route('/get_course_grades', methods=['GET','POST'])
def get_course_grades():
    keys = ['role','course_id','student_id']
    status,msg,code = validate_request(request,keys)
    if status:
        if request.get_json()['role'] == 'student':
            grades = student.get_course_grades(request.get_json(), engine)
            return jsonify(grades)
        elif request.json['role'] == 'faculty':
            grades = faculty.get_course_grades(request.get_json(), engine)
            return jsonify(grades)
        else:
            return jsonify({'error': 'Invalid role'}), 400
    else:
        return jsonify({'error':msg}),code

@app.route("/create_assignment", methods=['POST'])
@cross_origin(supports_credentials=True)
def create_assignment():
    request_data = request.get_json()
    if request_data is None:
        return jsonify({'error': 'Invalid JSON data'}), 400

    course_id = request_data['course_id']
    title = request_data['title']
    content = request_data['content']
    is_published = request_data['is_published']
    total_points = request_data['total_points']
    assignment_type = request_data['assignment_type']
    due_date_str = request_data['due_date']
    due_date = datetime.strptime(due_date_str, '%Y-%m-%d').date()

    try:
        query = f'''
        INSERT INTO assignments (course_id, title, content, total_points, assignment_type, is_published, due_date)
        VALUES ("{course_id}", '{title}', '{content}', "{total_points}", '{assignment_type}', "{is_published}", "{due_date}");
        '''
        res = execute_query(engine, query)
        return jsonify({'success': 'Assignment created successfully'}), 201  # Successful creation
    except Exception as e:
        print(f"An error occurred: {e}")  # Logging the error can help with debugging
        return jsonify({'error': str(e)}), 500

@app.route('/toggle_publish/<quiz_id>', methods=['POST'])
def toggle_publish(quiz_id):
    data = request.get_json()
    is_published = data['is_published']
    try:
        query = f"UPDATE assignments SET is_published = {is_published} WHERE assignment_id = '{quiz_id}';"
        execute_query(engine, query)
        return jsonify({'success': 'Publish state updated successfully'}), 200
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({'error': str(e)}), 500

# @app.route("/get_course_content", methods=['POST'])
# def add_course_content():
#     try:
#         request_data = request.get_json()
#         if request_data is None:
#             return jsonify({'error': 'Invalid JSON data'}), 400
    
#         course_id = request_data['course_id']
#         query = f"SELECT course_title, course_content FROM courses WHERE course_id = '{course_id}';"
#         execute_query(engine, query)
#         # Logic to save the course content to the database or perform any other necessary operations
#         # Example:
#         # Insert the course content into the database
#         # db.insert_course_content(title, content)

#         # Return a success response
#         return jsonify({'success': 'Course content added successfully'}), 200
    
#     except Exception as e:
#         print(f"An error occurred: {e}")
#         return jsonify({'error': 'An internal error occurred'}), 500
    
@app.route("/get_course_content", methods=['POST'])
def get_course_content():
    try:
        request_data = request.get_json()
        if request_data is None:
            return jsonify({'error': 'Invalid JSON data'}), 400
    
        course_id = request_data['course_id']
        query = f"SELECT course_id, course_title, course_content, syllabus FROM courses WHERE course_id = '{course_id}';"
        res = execute_query(engine, query)

        courses = courses_rows_to_dict(res)

        return jsonify(courses)
    
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({'error': 'An internal error occurred'}), 500


@app.route("/edit_course_content", methods=['POST'])
@cross_origin(supports_credentials=True)
def add_course_content():
    try:
        request_data = request.get_json()
        if request_data is None:
            return jsonify({'error': 'Invalid JSON data'}), 400
    
        title = request_data['title']
        course_id = request_data['course_id']
        content = request_data['content']
        syllabus = request_data['syllabus']
        query = f"UPDATE courses SET course_title = '{title}', course_content = '{content}', syllabus = '{syllabus}' WHERE course_id = '{course_id}';"
        print("SQL Query:", query)  # Log SQL query for debugging
        res = execute_query(engine, query)

        if res is None:
            return jsonify({'error': 'Failed to update profile'}), 500
        
        query = f"SELECT course_title, course_content FROM courses WHERE course_id = '{course_id}';"
        res = execute_query(engine, query)

        courses = courses_rows_to_dict(res)

        return jsonify(courses)
    
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({'error': 'An internal error occurred'}), 500

@app.route("/create_announcement", methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def create_announcement():
    if request.method == 'POST':
        content_type = request.headers.get('Content-Type')
        if content_type != 'application/json':
            return jsonify({'error': 'Invalid content type'}), 400
    
    request_data = request.get_json()
    print(request_data)
    if request_data is None:
        return jsonify({'error': 'Invalid JSON data'}), 400
    
    course_id = request_data['course_id']
    title = request_data['title']
    content = request_data['content']
    query = f'''
    INSERT INTO announcement (title, content, course_id, published_date)
    VALUES ("{title}", "{content}", {course_id}, NOW());
    '''
    res = execute_query(engine, query)

    announcement = announcement_rows_to_dict(res)

    print(announcement)
    return jsonify(announcement)

@app.route("/edit_announcement", methods=['GET','POST','PUT'])
@cross_origin(supports_credentials=True)
def edit_announcement():
    if request.method == 'POST':
        content_type = request.headers.get('Content-Type')
        if content_type != 'application/json':
            return jsonify({'error': 'Invalid content type'}), 400
    
    request_data = request.get_json()
    print(request_data)
    if request_data is None:
        return jsonify({'error': 'Invalid JSON data'}), 400
    
    announcement_id = request_data['announcement_id']
    title = request_data['title']
    content = request_data['content']
    #published_date = request_data['published_date']
    query = f'''
    UPDATE announcement
    SET title = "{title}",
    content = "{content}",
    published_date = NOW()
    WHERE announcement_id = "{announcement_id}";
    '''
    res = execute_query(engine, query)

    announcement = announcement_rows_to_dict(res)
        # Convert datetime to ISO format
    # for a in announcement:
    #     a['published_date'] = a['published_date'].isoformat()
    print(announcement)
    return jsonify(announcement)

@app.route("/get_assignment", methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def get_assignment():
    keys = ['role','course_id']
    status,msg,code = validate_request(request,keys)
    if status:
        if request.get_json()['role'] == 'student':
            assignment = student.get_current_assignmments(engine, request.json['course_id'])
            return jsonify(assignment)
        elif request.get_json()['role'] == 'faculty':
            assignment = faculty.get_current_assignmments(engine, request.json)
            return jsonify(assignment)
        else:
            return jsonify({'error': 'Invalid role'}), 400
    else:
        return jsonify({'error':msg}),code

# @app.route("/get_assignment", methods=['GET','POST'])
# @cross_origin(supports_credentials=True)
# def get_assignment():
#     if request.method == 'POST':
#         content_type = request.headers.get('Content-Type')
#         if content_type != 'application/json':
#             return jsonify({'error': 'Invalid content type'}), 400
    
#     request_data = request.get_json()
#     # print(request_data)
#     if request_data is None:
#         return jsonify({'error': 'Invalid JSON data'}), 400
    
#     course_id = request_data['course_id']
#     assignment_type = request_data['assignment_type']
#     query = f'''
#         SELECT assignment_id, title, content, total_points, due_date, is_published 
#         FROM assignments
#         WHERE 
#                 course_id = '{course_id}' AND
#                 assignment_type = '{assignment_type}';
#     '''

#     res = execute_query(engine, query)

#     assignments = assignment_rows_to_dict(res)

#     return jsonify(assignments)
    
@app.route("/get_quiz", methods=['GET','POST'])
def get_quiz():
    keys = ['role','course_id']
    status,msg,code = validate_request(request,keys)
    if status:
        if request.get_json()['role'] == 'student':
            quiz = student.get_current_quiz(engine, request.json['course_id'])
            return jsonify(quiz)
        else:
            return jsonify({'error': 'Invalid role'}), 400
    else:
        return jsonify({'error':msg}),code
    
@app.route("/get_syllabus", methods=['GET','POST'])
def get_syllabus():
    keys =['role','course_id']
    status,msg,code = validate_request(request,keys)
    if status:
        if request.json['role']=='student':
            syllabus = student.get_syllabus(request.json, engine)
            return jsonify(syllabus)
        else:
            return jsonify({'error': 'Invalid role'}), 400
    else:
        return jsonify({'error':msg}),code

 # Running app
if __name__ == '__main__':  
    engine = get_engine()
    app.run(debug=True)
    

    