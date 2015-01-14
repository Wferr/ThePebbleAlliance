var UI = require('ui');
var ajax = require('ajax');

var teams = new UI.Window({
  title:'Team',
  subtitle:'Grabbing'
});

teams.show();

var teamNumber = 'frc' + '2102';
var API ='http://www.thebluealliance.com/api/v2/team/';

ajax(
  {
    url: API + teamNumber,
    type: 'json',
    headers: { 'X-TBA-App-Id' : "frc2102:pebble-app:v01"}},
  function(data) {
    console.log('Grabbed data!' + data);
    var teamInfo = data.name;
    teams.subtitle(teamInfo);
    },
  function(error) {
    console.log('Failed:' + error);
  }
);