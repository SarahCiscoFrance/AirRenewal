/*
Author: rudferna@cisco.com
Version: v1.0
*/

const xapi = require('xapi');
const OPTION = 2 // 1: DIGITAL SIGNAGE OR 2: ALERT MESSAGE
xapi.config.set("RoomAnalytics PeopleCountOutOfCall", "On");
xapi.config.set("Standby Signage Mode", "On");
var alertDuration = 2; //in minutes
var copyDuration = alertDuration;
var refreshIntervalId;
var callEnded = false;

/*OPTION 1 FUNCTIONS: ALERT MESSAGE*/
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

/*END OPTION 1 */

/*OPTION 2 FUNCTIONS : DIGITAL SIGNAGE*/
function displayLockScreen(){
  lockDevice();
  refreshIntervalId = setInterval(updateEveryMinutes, 60*1000);
  xapi.config.set("Standby Signage Url", "http://websrv2.ciscofrance.com:15198/airRenewal/?dc=" + alertDuration);
  xapi.command('Standby Halfwake'); 
}
/*END OPTION 2*/


/* FUNCTION USED BY THE 2 OPTIONS*/
function updateEveryMinutes() {
  alertDuration = alertDuration - 1;
  if(alertDuration !== 0){
    if(OPTION === 2){
      displayTextOnScreen('Waiting time: ' + alertDuration + ' minutes');
      xapi.config.set('UserInterface CustomMessage', 'Waiting time: ' + alertDuration + ' minutes');
    }
    else{
      xapi.config.set("Standby Signage Url", "http://websrv2.ciscofrance.com:15198/airRenewal/?dc=" + alertDuration);
      xapi.command('Standby Halfwake'); 
    }
  }
  else{
    unlockDevice();
    if(OPTION === 2){
      xapi.config.set('UserInterface CustomMessage', '');
    }
    else{
      xapi.command('Standby Deactivate');
      xapi.config.set("Standby Signage Url", "");
      xapi.config.set("Standby Signage Mode", "Off");
    }
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
        if(OPTION === 1){
          displayLockScreen();
        }
        else {
          postStatusCall();
        }
        callEnded = false;
      }
    }
});