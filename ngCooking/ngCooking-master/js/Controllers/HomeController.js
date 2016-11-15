(function () {
    var HomeController = function ($scope, json, connexion)
    {
        var sortRecipes = function (arr) {
            for (var i = 0; i < arr.length; ++i)
            {
                for (var j = 0; j < arr.length; j++)
                {
                    if (arr[j].mark < arr[i].mark)
                    {
                        var tmp = arr[j];
                        arr[j] = arr[i];
                        arr[i] = tmp;
                    }
                }
            }
            return arr;
        };
        $scope.home = {};
        $scope.home.recipes = [];
        for (var i = 0; i < $scope.recipes.length; ++i)
        {
            $scope.recipes[i].mark = $scope.getMark($scope.recipes[i]);
            $scope.home.recipes.push($scope.recipes[i]);
        }
        $scope.home.recipes = sortRecipes($scope.home.recipes);
    };
    var myApp = angular.module('ngCooking');
    myApp.controller('HomeController', HomeController);
}());