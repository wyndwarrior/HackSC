angular.module('hacksc', ['restangular', 'ui.bootstrap'])

.controller('MainCtrl', function($scope, Restangular, $modal) {

  $scope.title = 'MapReduceMyFitness';

  var Patients = Restangular.all('api/patients');
  var Foods = Restangular.all('api/foods');

  $scope.patients = Patients.getList().$object;
  $scope.foods = Foods.getList().$object;

  $scope.setPatient = function(patient) {
    $scope.activePatient = patient;
    $scope.prescriptions = $scope.activePatient.getList('Prescriptions').$object;
  };

  $scope.openNewPatientModal = function() {

    var modalInstance = $modal.open({
      templateUrl: 'tpls/add-patient-modal.html',
      controller: function($scope, $modalInstance) {
        $scope.create = function() {
          $modalInstance.close($scope.patientName);
        };

        $scope.cancel = function() {
          $modalInstance.dismiss(null);
        };
      },
      size: 'sm'
    });

    modalInstance.result.then(function(patientName) {
      if (!patientName) {
        return;
      }

      Patients.post({
        name: patientName
      }).then(function() {
        $scope.patients = Patients.getList().$object;
      });
    });
  };

  $scope.createRoutine = function() {
    var routine = $scope.routine;

    $scope.activePatient.post('Prescriptions', {
      name: routine.name,
      repetitions: routine.repetitions,
      data: window.fdata
    }).then(function() {
      $scope.routine = {};
      $scope.prescriptions = $scope.activePatient.getList('Prescriptions').$object;
    });
  };

});
