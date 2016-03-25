/**
 * Created by quangnguyen on 3/20/16.
 */
app.controller('userCtrl', ['$scope', 'userSv', function($scope, userSv, filterFilter){
    $scope.add = [];
    $scope.edit = [];
    $scope.begin = 0;
    $scope.page = 1;
    $scope.currentPage = 1;
    $scope.quantity = 10;
    $scope.add.userGender = 'male';
    $scope.users = userSv.getAll();
    $scope.filteredUser = $scope.users;

    $scope.$watch('users | filter:search', function(newValue){
        $scope.filteredUser = newValue;
        console.log('----------',$scope.filteredUser.length);
        $scope.pageProcess($scope.filteredUser);
    }, true);

    $scope.$watchCollection('users', function(){
        if($scope.filteredUser){
            $scope.pageProcess($scope.filteredUser);
        }else{
            $scope.pageProcess($scope.users);
        }
    },true);

    $scope.pageProcess = function(list){
        if(!list)
            list = $scope.users;
        $scope.page = Math.ceil(list.length/$scope.quantity);
        if($scope.page > 1){
            $scope.pageRange = [];
            for(var i = 0; i < $scope.page; i++){
                $scope.pageRange.push(i + 1);
            }
        }
        if($scope.currentPage > $scope.page){
            $scope.changePage($scope.page)
        }
    };

    $scope.changePage = function(p){
        if($scope.currentPage == p){
            return;
        }else{
            $scope.currentPage = p;
            $scope.begin = (p - 1) * $scope.quantity;
        }
    };

    $scope.prevPage = function(){
        $scope.changePage($scope.currentPage - 1);
    };

    $scope.nextPage = function(){
        $scope.changePage($scope.currentPage + 1);
    };

    if($scope.users.length >= 0){
        $scope.userSelected = $scope.users[0];
        Lib.drawChart($scope.userSelected, '#chart-skills');
    }

    $scope.viewinfo = function(user){
        $scope.userSelected = user;
        if($(window).width() < 768){
            $scope.doEditUser(user);
            Lib.drawChart($scope.userSelected,'#chart-skills-responsive');
        }else{
            Lib.drawChart($scope.userSelected,'#chart-skills');
        }
    };

    $scope.doAddUser = function(){
        $scope.add.addUserSuccess = '';
        $('#add-user-modal').modal('show');
    };

    $scope.addUser = function(){
        if(!$scope.add.userName || $scope.add.userName == ''){
            $scope.add.addUserMess = 'User\'s name is required';
            return;
        }
        if(!$scope.add.userEmail || $scope.add.userEmail == ''){
            $scope.add.addUserMess = 'User\'s email is required';
            return;
        }else{
            var stt = userSv.checkEmail($scope.add.userEmail);
            if(stt !== true){
                $scope.add.addUserMess = stt;
                return;
            }
        }
        if(!$scope.add.userSkills || $scope.add.userSkills == ''){
            $scope.add.addUserMess = 'User\'s skills is required';
            return;
        }

        // Do Add User
        var skills = $scope.add.userSkills.split(',');
        for(var i = 0 ; i < skills.length ; i++){
            skills[i] = skills[i].trim();
        }
        skills = Lib.cleanArr(skills);
        userSv.addUser($scope.add.userName, $scope.add.userEmail, skills, $scope.add.userGender);
        $scope.add.addUserMess = '';
        $scope.add = [];
        $scope.add.userGender = 'male';
        $scope.add.addUserSuccess = 'User has been added';
    };

    $scope.doEditUser = function(user){
        $scope.edit.userName = user.name;
        $scope.edit.userEmail = user.email;
        $scope.edit.userGender = user.gender;
        $scope.edit.userSkills = user.skills.join(', ');
        $scope.edit.editUserSuccess = '';
        $('#edit-user-modal').modal('show')
    };

    $scope.editUser = function(){
        if(!$scope.edit.userName || $scope.edit.userName == ''){
            $scope.edit.addUserMess = 'User\'s name is required';
            return;
        }
        if(!$scope.edit.userSkills || $scope.edit.userSkills == ''){
            $scope.edit.addUserMess = 'User\'s skills is required';
            return;
        }

        // Do Edit User
        var skills = $scope.edit.userSkills.split(',');
        for(var i = 0 ; i < skills.length ; i++){
            skills[i] = skills[i].trim();
        }
        skills = Lib.cleanArr(skills);
        userSv.editUser($scope.edit.userName, $scope.edit.userEmail, skills, $scope.edit.userGender);
        $scope.edit.editUserMess = '';
        $scope.edit.editUserSuccess = 'User has been edited';
    };

    $scope.doDeleteUser = function(email){
        userSv.deleteUser(email);
        if(email == $scope.userSelected.email){
            $("#chart-skills").html('<p class="noti">Select a user who you want to view skills</p>');
        }
        $('#edit-user-modal').modal('hide');
    };

}]);