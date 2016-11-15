(function () {
    var myApp = angular.module('ngCooking');
    myApp.filter("searchForIngredient", function () {
        return function (recipes, str) {
            if (!str) {
                return recipes;
            }
            var arrStr = str.split(';');
            if (arrStr.length > 1)
                arrStr.splice(arrStr.length -1, 1);
            var res = [];
            angular.forEach(recipes, function (recipe) {
                var cpy = arrStr.slice();
                for (var i = 0; i < recipe.ingredients.length; ++i){
                    for (var j = 0; j < cpy.length; ++j) {
                        if (cpy[j].toLowerCase() == recipe.ingredients[i].toLowerCase())
                        {
                            var index = cpy.indexOf(cpy[j]);
                            cpy.splice(index, 1);
                        }
                    }
                }
                if (cpy.length == 0) {
                    res.push(recipe);
                }
            });
            return res;
        };
    });
    var recettesController = function ($scope) {
        var sortRecipes = function (arr) {
            for (var i = 0; i < arr.length; ++i) {
                for (var j = 0; j < arr.length; j++) {
                    if (arr[j].mark < arr[i].mark) {
                        var tmp = arr[j];
                        arr[j] = arr[i];
                        arr[i] = tmp;
                    }
                }
            }
            return arr;
        };
        $scope.recettes = {};
        $scope.recettes.showMore = function () {
            $scope.recettes.recettesLimit += 4;
        };
        $scope.recettes.minCalories = 0;
        $scope.recettes.maxCalories = 1000;
        $scope.recettes.showRecetes = true;
        $scope.recettes.recettesLimit = 4;
        $scope.recettes.recipes = [];
        for (var i = 0; i < $scope.recipes.length; ++i) {
            $scope.recipes[i].mark = $scope.getMark($scope.recipes[i]);
            $scope.recettes.recipes.push($scope.recipes[i]);
        }
        $scope.recettes.recipes = sortRecipes($scope.recettes.recipes);
    };

    myApp.controller('recettesController', recettesController);
}());