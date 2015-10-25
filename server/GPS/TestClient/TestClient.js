(function() {

    "use strict";

    var baseUrl = "http://localhost:81/";

    $(document).ready(function() {

        var id = "Granny Smith";

        var getTimestamp = function() {
            return Math.floor((new Date()).getTime() / 1000);
        };

        var getJson = function(path) {
            return $.ajax({
                url: baseUrl + path,
                method: "GET"
            });
        };

        var postJson1 = function(path, data) {
            data = data || {};
            data.id = id;
            data.timestamp = getTimestamp();
            return $.ajax({
                url: baseUrl + path,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(data)
            });
        };

        var postJson2 = function(path, data) {
            data = data || {};
            return $.ajax({
                url: baseUrl + path,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(data)
            });
        };

        /* ********************************************************************** */
        /* Client REST API                                                        */
        /* ********************************************************************** */

        $("#btnClientLocation").click(function() {
            var data = {
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
            };
            postJson1("api/client/location", data);
        });

        $("#btnClientHeartRate").click(function() {
            var data = {
                heartRate: 81
            };
            postJson1("api/client/heartrate", data);
        });

        $("#btnClientPanic").click(function() {
            postJson1("api/client/panic");
        });

        $("#btnClientPanicOver").click(function() {
            postJson1("api/client/panicover");
        });

        /* ********************************************************************** */
        /* Volunteer Portal REST API                                              */
        /* ********************************************************************** */

        $("#btnVolunteerGetAll").click(function() {
            getJson("api/volunteer");
        });

        $("#btnVolunteerGet").click(function() {
            getJson("api/volunteer/1");
        });

        $("#btnVolunteerRegister").click(function() {
            var data = {
                firstName: "Jon",
                lastName: "Taylor",
                mobile: "07546 372748",
                email: "jonathan.taylor@dsl.pipex.com",
                postcode: "M21 8TX",
                passwordHash: "password"
            };
            postJson2("api/volunteer/register", data);
        });

        $("#btnVolunteerLogin").click(function () {
            var data = {
                email: "jonathan.taylor@dsl.pipex.com",
                passwordHash: "password"
            };
            postJson2("api/volunteer/login", data);
        });

        $("#btnVolunteerSetAvailabilityTrue").click(function() {
            var data = {
                id: 1,
                availability: true
            };
            postJson2("api/volunteer/availability", data);
        });

        $("#btnVolunteerSetAvailabilityFalse").click(function() {
            var data = {
                id: 1,
                availability: false
            };
            postJson2("api/volunteer/availability", data);
        });

        /* ********************************************************************** */
        /* SignalR stuff                                                          */
        /* ********************************************************************** */

        var connectHub = function () {

            console.log("calling $.hubConnection()");
            var hubConnection = $.hubConnection();

            console.log("hubConnection.url: ", hubConnection.url);
            hubConnection.url = baseUrl + "/signalr";
            console.log("hubConnection.url: ", hubConnection.url);
            hubConnection.logging = true;

            console.log("calling hubConnection.createHubProxy('notifier')");
            var hubProxy = hubConnection.createHubProxy("notifier");

            hubProxy.on("message", function (message) {
                console.log("hubProxy.on('message')");
                console.log(arguments);
            });

            hubProxy.on("roomUpdate", function (roomId) {
                console.log("hubProxy.on('roomUpdate')");
                console.log(arguments);
            });

            hubProxy.on("heartRateUpdate", function (heartRate) {
                console.log("hubProxy.on('heartRateUpdate')");
                console.log(arguments);
            });

            hubProxy.on("panic", function () {
                console.log("hubProxy.on('panic')");
                console.log(arguments);
            });

            hubProxy.on("panicover", function () {
                console.log("hubProxy.on('panicover')");
                console.log(arguments);
            });

            hubConnection
                .start()
                .done(function (connection) {
                    console.log("hubConnection done");
                    console.log(arguments);
                })
                .fail(function (reason) {
                    console.log("hubConnection fail");
                    console.log(arguments);
                });
        };

        connectHub();

        $("#btnSignalRRoomUpdate").click(function () {
            var roomId = $("#roomNumber").val();
            getJson("api/testnotifier/roomupdate/" + roomId);
        });

        $("#btnSignalRHeartRateUpdate").click(function () {
            var heartRate = $("#heartRate").val();
            getJson("api/testnotifier/heartrateupdate/" + heartRate + "/" + getTimestamp());
        });

        $("#btnSignalRPanic").click(function () {
            getJson("api/testnotifier/panic");
        });

        $("#btnSignalRPanicOver").click(function () {
            getJson("api/testnotifier/panicover");
        });

        $("#btnSignalRSms").click(function () {
            var volunteerId = $("#volunteerId").val();
            getJson("api/testnotifier/sms/" + volunteerId);
        });
    });
}());
