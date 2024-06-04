import json
from sqlalchemy import create_engine
from sqlalchemy.sql import text
from datetime import datetime

def read_secret():
    with open('./secrets.json') as f:
        secrets = json.load(f)
    return secrets

def get_engine():
    #read the the secrets.json  file
    secrets = read_secret()
    # Replace the following variables with your database details
    username = secrets['user']
    password = secrets['password']
    host = secrets['host']
    port = secrets['port']
    database = secrets['database']

    # Create the database URL
    database_url = f"mysql+pymysql://{username}:{password}@{host}:{port}/{database}"

    # Create the engine
    engine = create_engine(database_url, echo=True,pool_recycle=3600)  # Set echo=True to log all statements
    return engine

def execute_query(engine,query):
    with engine.connect() as connection:
        result = connection.execute(text(query))
        connection.commit()
        return result

def get_current_sem():
    x = datetime.now()
    year = x.year-2000
    month = x.month
    if month < 7:
        return f"Spring {year}"
    else:
        return f"Fall {year}"


def convert_course_list_rows_to_dict(res):
    courses = []
    for row in res.fetchall():
        courses.append({'course_id': row[0], 'semester': row[1], 'course_title': row[2]})
    return courses

def convert_people_rows_to_dict(res):
    people = []
    for row in res.fetchall():
        people.append({'name': row[0], 'email': row[1]})
    return people

def convert_user_rows_to_dict(res):
    user_roles = []
    for row in res.fetchall():
        user_roles.append({'id': row[0], 'password': row[1], 'role': row[2]})
    return user_roles


def convert_courses_rows_to_dict(res):
    courses = []
    for row in res.fetchall():
        courses.append({'course_id': row[0], 'course_title': row[1]})
    return courses

def profile_rows_to_dict(res):
    profile = []
    for row in res.fetchall():
        profile.append({'full_name': row[0], 'user_id': row[1], 'about': row[2], 'linkedin': row[3], 'insta': row[4], 'notification': row[5]})
    return profile

def announcement_rows_to_dict(res):
    announcement = []
    for row in res.fetchall():
        announcement.append({'title': row[0], 'content': row[1], 'published_date': row[2]})
    return announcement

def assignment_rows_to_dict(res):
    assignment = []
    for row in res.fetchall():
        assignment.append({'assignment_id': row[0], 'title': row[1], 'content': row[2], 'total_points': row[3] , 'due_date': row[4], 'is_published': row[5]})
    return assignment

def courses_rows_to_dict(res):
    course = []
    for row in res.fetchall():
        course.append({'course_id': row[0], 'course_title': row[1], 'course_content': row[2], 'syllabus': row[3]})
    return course

def assign_courses_rows_to_dict(res):
    courses = []
    for row in res.fetchall():
        courses.append({'course_id': row[0] ,'course_title': row[1] , 'semester': row[2]})
    return courses

def faculties_rows_to_dict(res):
    faculties = []
    for row in res.fetchall():
        faculties.append({'faculty_id': row[0] ,'name': row[1]})
    return faculties

def tograde_rows_to_dict(res):
    togrades = []
    for row in res.fetchall():
        togrades.append({'assignment_content': row[0], 'student_id': row[1], 'assignment_id': row[2], 'total_points': row[3] })
    return togrades

def convert_faculty_list_rows_to_dict(res):
    faculty = []
    for row in res.fetchall():
        faculty.append({'name': row[0], 'course': row[1], 'faculty_id': row[2]})
    return faculty

def scores_rows_to_dict(res):
    scores = []
    for row in res.fetchall():
        scores.append({'student_name': row[0], 'score': row[1]})
    return scores

def all_keys_present(request, keys):
    #this function checks if all the required keys are present inside the request
    for key in keys:
        if key not in request:
            return False
    return True


def validate_request(request, keys):
    #first check is the request is post
    if request.method != 'POST':
        return False, "Only POST requests are allowed", 405
    #check if content type is application/json
    if request.content_type != 'application/json':
        return False, "Content type should be application/json", 415
    #check if all required keys are present
    if not all_keys_present(request.json, keys):
        return False, "Required keys are missing", 400
    else:
        return True, "Request is valid",200
    
def authenticate_user(engine, request_data):
    user_id = request_data['user_id']
    password = request_data['password']
    query = f'''
    SELECT user_id, password, user_role
    FROM users
    WHERE user_id = '{user_id}' and password = '{password}';
    '''
    res = execute_query(engine, query)
    
    users = convert_user_rows_to_dict(res)
    return users

def syllabus_rows_to_dict(res):
    syllabus = []
    for row in res.fetchall():
        syllabus.append({'syllabus': row[0]})
    return syllabus