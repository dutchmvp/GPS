## Granny Positioning System (GPS)



## System Diagram

![System Diagram](https://raw.githubusercontent.com/dutchmvp/GPS/master/images/System%20Diagram.png?token=AApRRefrFxmDYG9tFR_Hfvf4yJj5UKlrks5WNNKcwA%3D%3D)

## System Description

System components:

- Apple Watch Client
    - sends beacon location information
    - sends regular heart rate information
    - raises panic button alerts
- Backend Server
    - maintains a repository of registered volunteers
    - receives information from the Apple Watch Client
    - interprets the information and keeps the Monitoring Client up-to-date via SignalR
    - sends alerts to registered volunteers when panic buttons go off
- Monitoring Client
    - receives information from the Backend Server and visualises it
- Volunteer Registration Website
    - allows volunteers to register their details and indicate their availability
- Volunteer Notifications
    - SMS message is sent to the nearest available registered volunteer when a panic button goes off

## APIs

### Apple Watch Client to Backend Server REST API

Base URL ?

#### Location (POST)

```
{
    "id": "Granny1",
    "timestamp": 1234567890,
    "locations": [
        {
            "uuid": "D9B9EC1F-3925-43D0-80A9-1E39D4CEA95C",
            "majorNumber": 1,
            "minorNumber": 3,
            "strength": 67
        },
        {
            "uuid": "mac address",
            "majorNumber": 1,
            "minorNumber": 2,
            "strength": 67
        }
    ]
}
```

#### HeartRate (POST)

```
{
    "id": "Granny1",
    "timestamp": 1234567890,
    "heartRate": 81
}
```

#### Panic (POST)

```
{
    "id": "Granny1",
    "timestamp": 1234567890
}
```

### Backend Server to Monitoring Client API over SignalR

```
function regionEntered(region);
function regionExited(region);
function heartRateUpdate(heartRate);
function panicButton();
function panicOver();
```

### Volunteer Registration
