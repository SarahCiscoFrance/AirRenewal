# AirRenewal
![Image description](https://i.ibb.co/59pq88G/Capture-d-e-cran-2020-05-20-a-17-29-32.png)

### What is it ?
AirRenewal is a macro in JavaScript for Webex Endpoint, used to force a pause between 2 calls to let the room renew the air

### Why ?

This service was built in order to showcases the API integrated in the Cisco endpoints.
Also to Prevent exposure to a virus in the workplace

### How it works ?
When a call or a meeting ended the Endpoint push an Alert Message "Please Leave the Room. The Air is Renewing. 15min required before using the room again".

The endpoint also blocks its use during 15 minutes.
![Image description](https://i.ibb.co/42g1K0N/20200520-161628.jpg)

At the end of this period an alert sound is triggered and the Endpoint is usable again.


### Clone project

``` bash
# clone the project
git clone https://github.com/SarahCiscoFrance/AirRenewal.git
```
