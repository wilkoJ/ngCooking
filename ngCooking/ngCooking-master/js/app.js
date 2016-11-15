(function () {
    var myApp = angular.module('ngCooking', ["ngRoute", "ngCookies","ngSanitize"]);

    myApp.config(function ($routeProvider) {
        $routeProvider.when("/home", {
            templateUrl: "home.html",
            controller: "HomeController"
        }).when("/profile/:firstname/:surname", {
            templateUrl: "communaute_details.html",
            controller: "communauteDetails"
        }).when("/communaute", {
            templateUrl: "communaute.html",
            controller: "communauteController"
        }).when("/ingredients", {
            templateUrl: "ingredients.html",
            controller: "ingredientsController"
        }).when("/recettes", {
            templateUrl: "recettes.html",
            controller: "recettesController"
        }).when("/recettes/:recette", {
            templateUrl: "recettes_details.html",
            controller: "recettesDetailsController"
        }).when("/recettes_new", {
            templateUrl: "recettes_new.html",
            controller: "recettesNewController"
        }).otherwise({ redirectTo: "/home" });
    });
}());
