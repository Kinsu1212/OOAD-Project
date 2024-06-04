var User = (function(){
    var getUserID = function(){
        return localStorage.getItem('userID');
    }
    var setUserId = function(userId){
        localStorage.setItem('userID', userId);
    }

    var getRole = function(){
        return localStorage.getItem('role');
    }
    var setRole = function(role){
        localStorage.setItem('role', role);
    }
    return {
        getUserID: getUserID,
        setUserId: setUserId,
        getRole: getRole,
        setRole: setRole
    }
})();

export default User;