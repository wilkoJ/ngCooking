(function () {
    var myApp = angular.module('ngCooking');
    var MainController = function ($scope, $location, $routeParams, json, connexion) {
        var setRecipes = function (data) {
            $scope.recipes = data;
        };

        var setUsers = function (data) {
            $scope.users = data;
        };

        var setIngredients = function (data) {
            $scope.ingredients = data;
        };
        var setCategories = function (data) {
            $scope.categories = data;
        };

        $scope.getMark = function (recipe) {
            var res = 0;
            if (recipe.comments) {
                for (var i = 0; i < recipe.comments.length; ++i) {
                    res += parseInt(recipe.comments[i].mark);
                }
                return res / recipe.comments.length;
            }
            return 0;
        };

        $scope.toArray = function (num) {
            return new Array((num >> 0));
        };

        $scope.disconnection = function () {
            connexion.disconnection("user");
            $scope.showConnect = false;
        };
        $scope.onError = function () {
            $scope.error = "Couldn't fetch data";
        };

        $scope.connexion = function () {
            $scope.showForm = true;
        };

        $scope.setUser = function () {
            $scope.user = connexion.getResult();
            if ($scope.user) {
                $scope.showConnect = true;
                $scope.showForm = false;
            }
        };

        $scope.log = function () {
            connexion.log($scope.loginData.email, $scope.loginData.password).then($scope.setUser, $scope.onError);
            
        };

        $scope.closeForm = function () {
            $scope.showForm = false;
        }

        $scope.recipes = {};
        $scope.users = {};
        $scope.ingredients = {};
        $scope.categories = {};
        $scope.user = connexion.getCookie("user");
        if ($scope.user == undefined)
            $scope.showConnect = false;
        else
            $scope.showConnect = true;
        $scope.showForm = false;

        json.getRecipes().then(setRecipes, $scope.onError);
        json.getUsers().then(setUsers, $scope.onError);
        json.getIngredients().then(setIngredients, $scope.onError);
        json.getRecipesApi().then(function (data) { console.log(data) }, $scope.onError);
        json.getCategories().then(setCategories, $scope.onError);

        //json.postComment({ "recipeId": 1, "userId": 1, "title": "Good one", "comment": "this is what we need", "mark": 3 }).then(function (data) { console.log(data), $scope.onError });
        $scope.loginData = { email: "", password: "" };
        $scope.sortOrder = '+firstname';
    };
    myApp.controller('MainController', MainController);
}());