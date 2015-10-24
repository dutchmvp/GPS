## Granny Positioning System (GPS)

## System Diagram

![System Diagram](https://raw.githubusercontent.com/dutchmvp/GPS/master/images/System%20Diagram.png?token=AApRRefrFxmDYG9tFR_Hfvf4yJj5UKlrks5WNNKcwA%3D%3D)

## System Description

System components:

- Apple Watch Client
    - sends beacon location information
    - sends regular heart rate information
    - raises panic button alerts
    - clears panic button alerts
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

#### Location (POST)

```
api/client/location
```

```
{
    "id": "Granny Smith",
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
api/client/heartrate
```

```
{
    "id": "Granny Smith",
    "timestamp": 1234567890,
    "heartRate": 81
}
```

#### PanicButton (POST)

```
api/client/panicbutton
```

```
{
    "id": "Granny Smith",
    "timestamp": 1234567890
}
```

#### PanicOver (POST)

```
api/client/panicover
```

```
{
    "id": "Granny Smith",
    "timestamp": 1234567890
}
```

### Backend Server to Monitoring Client API over SignalR

```
function roomUpdate(room);
function heartRateUpdate(heartRate);
function panicButton();
function panicOver();
```

### Volunteer Registration

#### Get All (GET)

```
api/volunteers
```

```
[
    {

        "id": 123
        "firstName": "Ann",
        "lastName": "Summers1",
        "mobile": "07546 123456",
        "email": "ann.summers1@gmail.com",
        "postcode": "CR3 0GG",
        "passwordHash": "password"
    },
    {

        "id": 1234
        "firstName": "Ann",
        "lastName": "Summers2",
        "mobile": "07546 123456",
        "email": "ann.summers2@gmail.com",
        "postcode": "CR3 0GG",
        "passwordHash": "password"
    }
]
```

#### Get (GET)

```
api/volunteers/id
```

```
{
    "id": 123
    "firstName": "Ann",
    "lastName": "Summers",
    "mobile": "07546 123456",
    "email": "ann.summers@gmail.com",
    "postcode": "CR3 0GG",
    "passwordHash": "password"
}
```

#### Register (POST)

```
api/volunteers
```

```
{
    "firstName": "Ann",
    "lastName": "Summers",
    "mobile": "07546 123456",
    "email": "ann.summers@gmail.com",
    "postcode": "CR3 0GG",
    "passwordHash": "password"
}
```

#### SetAvailability (POST)

```
api/volunteers/availability
```

```
{
    "id": 123,
    "available": true
}
```
