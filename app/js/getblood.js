var getBlood = angular.module('getBlood', [
                              'ngRoute', 'ngMaterial', 'ngMdIcons'
                              ]);

getBlood.controller('MainCtrl', [
  '$scope', '$route', '$routeParams', '$location', '$mdMedia',
  function ($scope, $route, $routeParams, $location, $mdMedia) {
    $scope.go = function (path) {
      $location.url(path);
    };
  }
]);


getBlood.controller('GetBloodCtrl', [
  '$scope', '$routeParams', '$timeout', '$http',
  function ($scope, $routeParams, $timeout, $http) {
    $scope.description = 'This is the description part of the page. ' +
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat interdum felis sed interdum. Pellentesque ultrices est eget placerat tempor. Curabitur iaculis porttitor mauris. Sed dictum mattis est, sit amet tempor leo placerat id.';

    $scope.user = {};

    $scope.loading = false;
    $scope.submitted = false;
    $scope.error = false;

    $scope.submit = function () {
      var result = validate($scope.user);

      if (result) {
        $scope.error = false;
        $scope.loading = true;

        $http.post('/submit', { data: $scope.user })
          .success(function (o) {
            $scope.submitted = true;
          })
          .error(function (data, status, headers, config) {
            console.log('Error in posting');
          });
      } else {
        $scope.error = true;
      }
    }

    function validate(data) {
      var result = true;

      // FIXME: Perform better validation
      if (_.isEmpty(data.name) && _.isEmpty(data.phone) &&
          _.isEmpty(data.address) && _.isEmpty(data.group) &&
          _.isEmpty(data.quantity) && _.isEmpty(data.date)) {
        result = false;
      }

      return result;
    }
  }
]);


getBlood.controller('AboutCtrl', [
  '$scope', '$routeParams',
  function ($scope, $routeParams) {
    $scope.aboutContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat interdum felis sed interdum. Pellentesque ultrices est eget placerat tempor. Curabitur iaculis porttitor mauris. Sed dictum mattis est, sit amet tempor leo placerat id.';
  }
]);


getBlood.config(['$mdThemingProvider', '$routeProvider',
  function($mdThemingProvider, $routeProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('red')
      .accentPalette('blue');

    $routeProvider
      .when('/', {
        templateUrl: 'form.html',
        controller: 'GetBloodCtrl'
      })
      .when('/about', {
        templateUrl: 'about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
}]);
