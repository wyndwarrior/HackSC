angular.module('hacksc-client', ['restangular', 'ui.bootstrap'])

.controller('MainCtrl', function($scope, Restangular) {
  $scope.title = 'MapReduceMyFitness';
});
