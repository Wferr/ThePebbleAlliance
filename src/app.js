// Requires
var UI = require('ui');
var ajax = require('ajax');
//var Settings = require('settings');
var teamNumber = ('2102');


//Setting Team Number
//Settings.config({
//  Settings.option(teamNumber, "2102");
//});
// Static Cards
var splashWindow = new UI.Window({
  title:'Fetching Data',
  subtitle:'Please Wait'
});


// Display Splash Card
splashWindow.show();

var apiId ="?X-TBA-App-Id=team2102:pebble-app:v01";
var API ='http://www.thebluealliance.com/api/v2/team/frc'+ teamNumber + apiId;

ajax(
  {
    url: API,
    type: 'json',
   // headers: { 'X-TBA-App-Id' : "frc2102:pebble-app:v01"}
  },
  function(data) {
    console.log("Grabbed data");
    var teamInfoMenu= new UI.Menu({
  sections: [{
    title: 'Team Info',
    items: [{
      title: 'Team Name',
      subtitle: data.nickname 
    }, {
      title: 'Team Number',
      subtitle: data.team_number
    }, {
      title: 'Rookie Year',
      subtitle: data.rookie_year
    }, {
      title: 'Team Location',
      subtitle: data.location
    }]
  }]
});
    teamInfoMenu.show();
    splashWindow.hide();
    },
  function(error) {
    console.log("Error");
  });