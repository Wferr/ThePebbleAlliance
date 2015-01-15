// Requires
var UI = require('ui');
var ajax = require('ajax');

// Static Cards
var splashWindow = new UI.Window({
  title:'Fetching Data',
  subtitle:'Please Wait'
});


// Display Splash Card
splashWindow.show();

//r teamNumber = 'frc' + '2102';
var API ='www.thebluealliance.com/api/v2/team/frc2102';

ajax(
  {
    url: API,
    type: 'json',
    headers: { 'X-TBA-App-Id' : "frc2102:pebble-app:v01"}},
  function(data) {
    console.log("Grabbed data");
    console.log('Grabbed data!' + data);
    var teamInfo = data.name;
    var teamInfoCard= new UI.Card({
      title:'Team Info',
      subtitle:teamInfo,
    });
    teamInfoCard.show();
    },
  function(error) {
    console.log('Failed:' + error);
    console.log("Error");
  }
);