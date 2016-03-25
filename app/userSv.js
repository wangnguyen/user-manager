/**
 * Created by quangnguyen on 3/20/16.
 */
app.factory('userSv', function() {
    var generateUser = function(n){
        var u = [];
        for(var i = 0 ;i < n; i++){
            u.push(
                {
                    name: 'User Name ' + i,
                    email: 'user'+i+'@gmail.com',
                    skills: ['HTML','CSS','Javascript','PHP','Photoshop'],
                    gender: i%2 == 0 ? 'male' : 'female'
                }
            )
        }
        return u;
    };
    var userSv = {
        userData:generateUser(35),
        getAll: function(){
            return this.userData;
        },

        addUser: function(name, email, skills, gender){
            this.userData.unshift(
                {
                    name: name,
                    email: email,
                    skills: skills,
                    gender: gender
                }
            );
            return true;
        },

        editUser: function(name, email, skills, gender){
            this.userData[_.findIndex(this.userData, function(u) { return u.email == email; })] = {
                name: name,
                email: email,
                skills: skills,
                gender: gender
            };
            return true;
        },

        deleteUser: function(email){
            this.userData.splice( _.findIndex(this.userData, function(u) { return u.email == email; }), 1);
            return true;
        },

        checkEmail:function(email){
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!re.test(email)){
                return 'Invalid email address';
            }
            if(_.findIndex(this.userData, function(u) { return u.email == email; }) >= 0){
                return 'Email already exists';
            }
            return true;
        }
    };
    return userSv;

});