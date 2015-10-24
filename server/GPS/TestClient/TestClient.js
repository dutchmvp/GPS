(function() {

    "use strict";

    var baseUrl = "http://localhost:81/";

    $(document).ready(function () {

        var id = "Granny Smith";

        var getTimestamp = function () {
            return Math.floor((new Date()).getTime() / 1000);
        };

        var postJson = function (path, data) {
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

        /* ********************************************************************** */
        /* Client REST API                                                        */
        /* ********************************************************************** */

        $("#btnClientLocation").click(function () {
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
            postJson("api/client/location", data);
        });

        $("#btnClientHeartRate").click(function () {
            var data = {
                heartRate: 81
            };
            postJson("api/client/heartrate", data);
        });

        $("#btnClientPanic").click(function () {
            postJson("api/client/panic");
        });

        $("#btnClientPanicOver").click(function () {
            postJson("api/client/panicover");
        });

        /* ********************************************************************** */
        /* Volunteer Portal REST API                                              */
        /* ********************************************************************** */

        $("#btnVolunteerGetAll").click(function () {
            postJson("api/volunteer");
        });

        $("#btnVolunteerGet").click(function () {
            postJson("api/volunteer");
        });

        $("#btnVolunteerRegister").click(function () {
            postJson("api/volunteer");
        });

        $("#btnVolunteerSetAvailabilityTrue").click(function () {
            postJson("api/volunteer");
        });

        $("#btnVolunteerSetAvailabilityFalse").click(function () {
            postJson("api/volunteer");
        });
    });
}());
