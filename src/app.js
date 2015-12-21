// Requires
var UI = require('ui');
var ajax = require('ajax');
var Accel = require('ui/accel');
var Settings = require('settings');
var Vibe = require('ui/vibe');
var Wakeup = require('wakeup');
var Timeline = require('timeline');
// Custom
var apiId ="?X-TBA-App-Id=team2102:pebble-app:v01";
var API ='http://www.thebluealliance.com/api/v2/';
var teamNumber = 'frc2102';
var logger = require('logger.js');

logger.log("Hello");

var splashScreen = new UI.Card({
  title: 'Loading Data'
});
splashScreen.show();

//Setting Team Number
Settings.config(
  { url:"http://wferr.com/ThePebbleAlliance/"}
);
Settings.option({
  teamNumber: '2102',
});

// Static Cards

//Updated Window Card
var updatedWindow = new UI.Card({
  title: 'Data Updated',
  subtitle: 'You are upto Date'
});

//Update Team Info Function
var updateTeamInfo = function(){
ajax(
  {
    url: API + 'team/' + teamNumber + apiId,
    type: 'json',
  },
  function(data) {
    console.log("Grabbed Team Info Page");
    var teamInfoMenu= new UI.Menu({
  sections: [{
    title: data.nickname + ' ' + data.team_number,
    items: [{
      title: data.nickname,
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
    splashScreen.hide();
    },
  function(error) {
    console.log("Error Fetching Team Info Page");
  });
};

updateTeamInfo();

var updateData = function(){
  updateTeamInfo();
  Vibe.vibrate('double');
  updatedWindow.show();
};
Accel.init();
Accel.on('tap', updateData);