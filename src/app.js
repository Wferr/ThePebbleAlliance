// Requires
var UI = require('ui');
var ajax = require('ajax');
var Vector2 = require('vector2');
var Accel = require('ui/accel');
var Settings = require('settings');
var Vibe = require('ui/vibe');
var Logger = require('logger.js');

//Run Splash FIRST THING
//Create Splash Window
var splashWindow = new UI.Window();
var splashLogo = new UI.Image ({
  posisiton: new Vector2 (0,0),
  size: new Vector2 (144,168),
  image: "images/logosplash.png"
});
splashWindow.add(splashLogo);
splashWindow.show();

Logger("Test Error");
var apiId ="?X-TBA-App-Id=team2102:pebble-app:v01";
var API ='http://www.thebluealliance.com/api/v2/';
var teamNumber = 'frc2102';


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

//End Static Cards
//Get Years Team has played in
var updateYearsParticipated = function(){
ajax(
  {
    url: API + 'team/' + teamNumber + '/years_participated' + apiId 
  }
);
  
};

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