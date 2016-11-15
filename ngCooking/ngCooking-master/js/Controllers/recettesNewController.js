(function () {
    var myApp = angular.module('ngCooking');
    myApp.directive("fileread", [function () {
        return {
            scope: {
                fileread: "="
            },
            link: function (scope, element, attributes) {
                element.bind("change", function (changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        scope.$apply(function () {
                            scope.fileread = loadEvent.target.result;
                        });
                    }
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        }
    }]);
    var recettesNewController = function ($scope) {
        $scope.recettesNew = {};
        $scope.recettesNew.new = {};
        $scope.recettesNew.new.ingredients = [];
        $scope.recettesNew.new.calories = 0;
        $scope.recettesNew.new.picture = "img/recette_placeholder.jpg";
        $scope.recettesNew.ingredientSelected = $scope.ingredients[0].name;
        $scope.recettesNew.categorySelected = "all";
        $scope.recettesNew.new.category = $scope.categories[0].id;
        $scope.recettesNew.isWrong = false;
        $scope.recettesNew.isGood = false;

        $scope.recettesNew.submitNewRecettes = function () {
            console.log($scope.recettesNew.new);
            if ($scope.recettesNew.new.ingredients.length < 3) {
                $scope.recettesNew.isWrong = true;
                $scope.recettesNew.isGood = false;
            }
            else {
                $scope.recettesNew.isGood = true;
                $scope.recettesNew.isWrong = false;
            }
        };

        $scope.recettesNew.addIngredient = function () {
            for (var i = 0; i < $scope.ingredients.length; ++i)
            {
                if ($scope.recettesNew.ingredientSelected == $scope.ingredients[i].name)
                {
                    for (var j = 0; j < $scope.recettesNew.new.ingredients.length; ++j)
                        if ($scope.recettesNew.new.ingredients[j].name == $scope.recettesNew.ingredientSelected)
                            return;
                    $scope.recettesNew.new.calories += $scope.ingredients[i].calories;
                    $scope.recettesNew.new.ingredients.push($scope.ingredients[i]);
                }
            }
            console.log($scope.recettesNew.new.ingredients);
        };
        $scope.recettesNew.removeIngredient = function (ing) {
            for (var i = 0; i < $scope.recettesNew.new.ingredients.length; ++i)
            {
                if (ing.name == $scope.recettesNew.new.ingredients[i].name){
                    $scope.recettesNew.new.ingredients.splice(i, 1);
                }   
            }
        }
    };
    myApp.controller('recettesNewController', recettesNewController);
}());