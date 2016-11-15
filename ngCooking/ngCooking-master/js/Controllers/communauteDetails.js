(function () {
    var myApp = angular.module('ngCooking');
    var communauteDetails = function ($scope, $location, $routeParams, json, connexion) {
        var onError = function ()
        {
            $scope.error = "Couldn't fetch data";
        };


        var setUser = function (user) {
            if (user.firstname == $routeParams.firstname && user.surname == $routeParams.surname) {
                {
                    $scope.communauteDetails.user = user;
                    $scope.communauteDetails.status = connexion.status[user.level - 1];
                    $scope.communauteDetails.age = parseInt((Date().substring(11))) - user.birth;
                    $scope.communauteDetails.recipes = [];
                    for (var i = 0; i < $scope.recipes.length; ++i) {
                        if ($scope.recipes[i].creatorId == user.id) {
                            $scope.communauteDetails.recipes.push($scope.recipes[i]);
                        }
                    }
                    $scope.communauteDetails.nbRecipes = $scope.communauteDetails.recipes.length;
                }
            }
        }
        var showUser = function (users) {
            for (var i = 0; i < users.length || !$scope.user; ++i)
            {
                setUser(users[i]);
            }
        };
        $scope.communauteDetails = {};
        json.getUsers().then(showUser, onError);
    };
    myApp.controller('communauteDetails', communauteDetails);
}());