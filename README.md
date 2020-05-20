# AirRenewal


### What is it ?
AirRenewal is a macro in JavaScript for Webex Endpoint, used to force a pause between 2 calls to let the room renew the air

### Why ?

This service was built in order to showcases the API integrated in the Cisco endpoints.
Also to Prevent exposure to a virus in the workplace

### How it works ?
When a call or a meeting ended the Endpoint push an Alert Message "Please Leave the Room. The Air is Renewing. 15min required before using the room again".

The endpoint also blocks its use during 15 minutes.

At the end of this period an alert sound is triggered and the Endpoint is usable again.


### Clone project and install dependencies

``` bash
# clone the project
git clone https://github.com/SarahCiscoFrance/AirRenewal.git
```
