// Team Requests API From BlueAlliance.
var TeamRequests = module.exports;

// Team List Request
var TeamRequests.teamlist = function.teamlist(e)
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