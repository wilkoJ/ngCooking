(function () {
    var connexionService = function ($cookies, json) {
        var status = ["Novice", "Confirmé", "Expert"];
        var result;
        var data = {};
        var getResult = function () {
            return result;
        };
        var onError = function () {
            result.error = "Couldn't fetch data";
        };

        var setCookie = function (key, object) {
            $cookies.putObject(key, object);
            return true;
        };
        var getCookie = function (key) {
            return ($cookies.getObject(key));
        };
        var disconnection = function (key) {
            $cookies.remove(key);
            return false;
        };

        var logUser = function (user) {
            if (user.email == data.email && user.password == data.pwd)
            {
                {
                    result = user;
                    setCookie("user", user);
                }
            }
        };

        var onLogin = function (users) {
            var prom = new Promise(function (resolve, reject) {
                for (var i = 0; i < users.length; ++i)
                {
                    logUser(users[i]);
                }
                resolve();
            })
            return prom;
        };

        var log = function (email, pwd) {
           
                data.pwd = pwd;
                data.email = email;
                return json.getUsers().then(onLogin, onError);
        };

        return {
            setCookie: setCookie,
            getCookie: getCookie,
            disconnection: disconnection,
            log: log,
            status: status,
            getResult: getResult
        }
    }
    var module = angular.module('ngCooking');
    module.factory('connexion', connexionService);
}());