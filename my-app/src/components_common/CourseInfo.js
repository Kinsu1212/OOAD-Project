var CourseInfo = (function(){
    var getCourseCode = function(){
        return localStorage.getItem('courseCode');
    }
    var setCourseCode = function(code){
        localStorage.setItem('courseCode', code);
    }
    return {
        getCourseCode: getCourseCode,
        setCourseCode: setCourseCode
    }
})();

export default CourseInfo;