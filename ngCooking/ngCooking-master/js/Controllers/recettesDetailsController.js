(function () {
    var myApp = angular.module('ngCooking');
    var recettesDetailsController = function ($scope, $routeParams, json) {

        $scope.recettesDetails = {};
        $scope.recettesDetails.ingredients = [];
        $scope.recettesDetails.com = {};
        $scope.recettesDetails.limitCom = 1;
        var setRecettesDetails = function () {
            for (var i = 0; i < $scope.recipes.length; ++i) {
                if ($scope.recipes[i].name == $routeParams.recette)
                    $scope.recettesDetails.recipe = $scope.recipes[i];
            }
            for (var i = 0; i < $scope.recettesDetails.recipe.ingredients.length; ++i) {
                console.log($scope.recettesDetails.recipe.ingredients[i])
                for (var j = 0; j < $scope.ingredients.length; ++j) {
                    if ($scope.recettesDetails.recipe.ingredients[i].toLowerCase() == $scope.ingredients[j].name.toLowerCase())
                        $scope.recettesDetails.ingredients.push($scope.ingredients[j]);
                }
            }
        };

        setRecettesDetails();
        $scope.recettesDetails.getName = function (userId) {
            for (var i = 0; i < $scope.users.length; ++i) {
                if ($scope.users[i].id == userId)
                    return {firstname:$scope.users[i].firstname, surname:$scope.users[i].surname};
            }
            return "";
        };
        $scope.recettesDetails.setCommentaires = function () {
            $scope.recettesDetails.com.userId = 1;
            for (var i = 0; i < $scope.recipes.length; ++i) {
                if ($scope.recipes[i].name == $scope.recettesDetails.recipe.name) {
                    $scope.recipes[i].comments.push($scope.recettesDetails.com);
                }
            }
            json.setRecettes(JSON.stringify($scope.recipes));
        };

        $scope.recettesDetails.moreComs = function () {
            $scope.recettesDetails.limitCom += 2;
        };
    };
    myApp.controller('recettesDetailsController', recettesDetailsController);
}());