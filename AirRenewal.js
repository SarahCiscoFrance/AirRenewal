/*
Author: rudferna@cisco.com
Version: v1.0
*/

const xapi = require('xapi');
xapi.config.set("RoomAnalytics PeopleCountOutOfCall", "On");
var alertDuration = 2; //in minutes
var copyDuration = alertDuration;
var refreshIntervalId;
var callEnded = false;

function displayTextOnScreen(text) {
  xapi.command('UserInterface Message Alert Display', {
  Title: 'Please Leave the Room. The Air is Renewing',
  Text: text, Duration: 0,
  });
}

function postStatusCall() {
       const text = alertDuration + "min required before using the room again";
       lockDevice();
       displayTextOnScreen(text);
       xapi.config.set('UserInterface CustomMessage', 'Waiting time: '+ alertDuration + ' minutes');
       refreshIntervalId = setInterval(updateEveryMinutes, 60*1000);
       
}

function updateEveryMinutes() {
  alertDuration = alertDuration - 1;
  if(alertDuration !== 0){
    displayTextOnScreen('Waiting time: ' + alertDuration + ' minutes');
    xapi.config.set('UserInterface CustomMessage', 'Waiting time: ' + alertDuration + ' minutes');
  }
  else{
    unlockDevice();
    xapi.config.set('UserInterface CustomMessage', '');
    xapi.command(' Audio SoundsAndAlerts Ringtone Play', {
      RingTone: 'Ringer',
    });
    clearInterval(refreshIntervalId);
     
  }
}

function lockDevice(){
  xapi.config.set('UserInterface Features HideAll', 'True');
}

function unlockDevice(){
  xapi.config.set('UserInterface Features HideAll', 'False');
}

xapi.event.on("CallDisconnect", (event) => {
        if (event.Duration > 0) {
          console.log('call ended');
          callEnded = true;
          alertDuration = copyDuration;
        }
});


xapi.status.on('RoomAnalytics PeopleCount Current', (numberofpeople) => {
    console.log(numberofpeople);
    if(numberofpeople<=0){
      if(callEnded){
        console.log('TRIGGERED');
        postStatusCall();
        callEnded = false;
      }
    }
});