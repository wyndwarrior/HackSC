angular.module('hacksc-client', ['restangular', 'ui.bootstrap', 'ui.router'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('patient', {
    url: '/patient/:id',
    controller: 'MainCtrl'
  });

  $urlRouterProvider.otherwise('/patient');
})

.controller('MainCtrl', function($scope, Restangular, $stateParams, $state) {
  $scope.title = 'MapReduceMyFitness';

  $scope.patient = {};
  $scope.prescriptions = [];

  $scope.setRoutine = function(routine) {
    $scope.routine = routine;
    test = routine.data;
    clearr(document.getElementById('action'));
    drawIn(test, document.getElementById('action'), 5 * 500 / 300);
    updateData();
  };

  function updateData() {
    Restangular.all('api/patients').get($state.params.id).then(function(patient) {
      $scope.patient = patient;
      patient.getList('prescriptions').then(function(pres) {
        $scope.prescriptions = pres;
      });
    });
  }

  if (!$stateParams.id) {
    Restangular.all('api/patients').getList().then(function(list) {
      $state.go('patient', {
        id: list[0].id
      }, {
        reload: true
      });
      updateData();
    });
  } else {
    updateData();
  }
});
