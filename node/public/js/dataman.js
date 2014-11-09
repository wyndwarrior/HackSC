/**
 * @author Ian Macalinao <me@ian.pw>
 */
$(function() {

  var client = window.rest = new $.RestClient('/api/');
  
  client.add('patients');
  client.add('prescriptions');
  client.add('food');
  
  window.patients = client.patients;
  window.prescriptions = client.prescriptions;
  window.food = client.food;
});
