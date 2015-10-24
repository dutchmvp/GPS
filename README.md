## Hack Manchester 2015 Entry - Granny Positioning System (GPS)



## System Diagram

TBD (Balsamic?)

## System Description

System components:

- Apple Watch Client
    - sends beacon location information
    - sends regular heart rate information
    - raises emergency alerts
- Backend Server
    - maintains a repository of registered volunteers
    - receives information from the Apple Watch Client
    - interprets the information and keeps the Monitoring Client up-to-date via SignalR
    - sends alerts to registered volunteers when emergencies occur
- Monitoring Client
    - receives information from the Backend Server and visualises it
- Volunteer Registration Website
    - allows volunteers to register their details and indicate their availability
- Volunteer Notifications
    - SMS message is sent to the nearest registered volunteer when an emergency alert goes off

## APIs

### Watch to Backend Server API

```

```

### Backend Server to Monitoring Client API

```
```

### Volunteer Registration
