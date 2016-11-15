(function () {
    var myApp = angular.module('ngCooking');
    var communauteController = function ($scope, connexion) {
        var setUserRecipes = function () {
            for (var i = 0; i < $scope.communaute.users.length; ++i) {
                $scope.communaute.users[i].nbRecipes = 0;
                for (var j = 0; j < $scope.recipes.length; ++j){
                    if ($scope.recipes[j].creatorId == $scope.communaute.users[i].id) {
                        $scope.communaute.users[i].nbRecipes++;
                    }
                }
            }
        };

        $scope.incrementUser = function () {
            $scope.communaute.userLimit += 4;
        };
        $scope.communaute = {};
        $scope.communaute.userLimit = 8;
        $scope.communaute.status = connexion.status;
        $scope.communaute.users = $scope.users;
        setUserRecipes();
    };
    myApp.controller('communauteController', communauteController);
}());