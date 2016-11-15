(function () {
    var myApp = angular.module('ngCooking');
    myApp.filter("searchFor", function () {
        return function (data, str) {
            if (!str)
                return data;
            var res = [];
            str = str.toLowerCase();
            angular.forEach(data, function (i) {
                if (i.name.toLowerCase().substring(0, str.length) == str)
                    res.push(i);
            });
            return res;
        };
    });
    myApp.filter("betweenCalories", function () {
        return function (data, min, max) {
            //if (!min && !max) {
            //}
            var res = [];
            angular.forEach(data, function (i) {
                if ((i.calories > min && i.calories < max))
                    res.push(i);
            });
            return res;
        };
    });
    var ingredientsController = function ($scope) {

        var setSimilar = function () {
            for (var i = 0; i < $scope.ingredients.length; ++i) {
                $scope.ingredients[i].similar = [];
                for (var j = 0; j < $scope.ingredients.length; ++j) {
                    if ($scope.ingredients[i].category == $scope.ingredients[j].category)
                        $scope.ingredients[i].similar.push($scope.ingredients[j]);
                }
            }
        };
        $scope.ingredient = {};
        $scope.ingredient.showMore = function () {
            $scope.ingredient.ingredientsLimit += 8;
        };
        $scope.ingredient.ingredientsOrder = "";
        setSimilar();
        $scope.ingredient.maxCalories = 1000;
        $scope.ingredient.minCalories = 0;
        $scope.ingredient.ingredientsLimit = 8;
        $scope.ingredient.similarLimit = 4;
    };

    myApp.controller('ingredientsController', ingredientsController);
}());