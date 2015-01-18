// Requires
var UI = require('ui');
var ajax = require('ajax');
var Vector2 = require('vector2');
var Accel = require('ui/accel');
var Settings = require('settings');
var Vibe = require('ui/vibe');

var teamNumber =null;
//Setting Team Number
Settings.config(
  { url:"http://wferr.com/ThePebbleAlliance/"}
);
Settings.option({
  teamNumber: '2102',
});
// Static Cards
var splashWindow = new UI.Window({ fullscreen: true});
var splashLogo = new UI.Image ({
  posisiton: new Vector2 (0,0),
  size: new Vector2 (144,168),
  image: "images/logosplash.png"
});

// Display Splash Card
splashWindow.add(splashLogo);
splashWindow.show();

Accel.init();

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
    Vibe.vibration('long');
    },
  function(error) {
    console.log("Error");
  });