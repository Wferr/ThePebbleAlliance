// Requires
var UI = require('ui');
var ajax = require('ajax');
var Vector2 = require('vector2');
var Accel = require('ui/accel');
var Settings = require('settings');
var Vibe = require('ui/vibe');

var teamNumber = '2102';
var apiId ="?X-TBA-App-Id=team2102:pebble-app:v01";
var API ='http://www.thebluealliance.com/api/v2/team/frc'+ teamNumber + apiId;

//Setting Team Number
Settings.config(
  { url:"http://wferr.com/ThePebbleAlliance/"}
);
Settings.option({
  teamNumber: '2102',
});

// Static Cards

//Splash
//Create Splash Window
var splashWindow = new UI.Window({ fullscreen: true});

//Create Splash Logo
var splashLogo = new UI.Image ({
  posisiton: new Vector2 (0,0),
  size: new Vector2 (144,168),
  image: "images/logosplash.png"
});
//Add Splash Logo to Splash Window
splashWindow.add(splashLogo);

//Updated Window Card
var updatedWindow = new UI.Card({
  title: 'Data Updated',
  subtitle: 'You are upto Date'
});

//End Static Cards

//Update Team Info Function
var updateTeamInfo = function(){
ajax(
  {
    url: API,
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
    Vibe.vibrate('double');
    updatedWindow.show();
    },
  function(error) {
    console.log("Error Fetching Team Info Page");
  });
};




// Display Splash Card
splashWindow.show();
updateTeamInfo();

Accel.init();
var updateData = function(){
  updateTeamInfo();
  setTimeout(updatedWindow.show(), 500);
  updatedWindow.hide();
  
};
Accel.on('tap', updateData);
