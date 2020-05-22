# AirRenewal
![Image description](https://i.ibb.co/59pq88G/Capture-d-e-cran-2020-05-20-a-17-29-32.png)

### What is it ?
AirRenewal is a macro in JavaScript for Webex Endpoint, used to force a pause between 2 calls to let the room renew the air

### Why ?

This service was built in order to showcases the API integrated in the Cisco endpoints.
Also to Prevent exposure to a virus in the workplace

### How it works ?
When a call or a meeting ended and the user leaves the room, the endpoint automatically display an alert message "Please Leave the Room. The Air is Renewing. 15min required before using the room again".

The endpoint also blocks its use during 15 minutes.
![Image description](https://i.ibb.co/HYBPy9C/20200520-152047-007-01.jpg)

It's possible to display a web page instead of Alert in order to have the screen fully used.
A counter page is displayed explaining what is happening and when we can enter in the room again.

Test the web page here: https://websrv2.ciscofrance.com:15199/airRenewal/?dc=15 (where **dc** parameter is the alertDuration set in code).

So you could choose Alert or Page option:
- **1**: is for the Page option 
- **2**: is for the Alert option
```javascript
const xapi = require('xapi');
const OPTION = 2 // <== CHANGE OPTION NUMBER HERE
...
...
var alertDuration = 2; //in minutes  <== CHANGE THE DURATION OF THE ALERT HERE 
```
You can also set the duration of the alert.
At the end of this period an alert sound is triggered and the Endpoint is usable again.


### Clone project

``` bash
# clone the project
git clone https://github.com/SarahCiscoFrance/AirRenewal.git
```

### Installation
Open a web browser pointing to the IP address of your room device, and sign in to the web interface (you will need a user account with 'administrator' role), and navigate to **Integration > Macro Editor**
![Image description](https://i.ibb.co/FYZR4HR/Capture-d-e-cran-2020-05-20-a-17-56-17.png)

Then import AirRenewal.js activate it and save.
![Image description](https://i.ibb.co/jGTqxMz/Capture-d-e-cran-2020-05-20-a-18-15-18.png)
