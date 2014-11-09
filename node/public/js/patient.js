angular.module('hacksc-client', ['restangular', 'ui.bootstrap', 'ui.router'])

.controller('MainCtrl', function($scope, Restangular) {
  $scope.title = 'MapReduceMyFitness';
});
