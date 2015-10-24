(function() {

    "use strict";

    var baseUrl = "http://localhost:81/";

    $(document).ready(function () {

        var id = "Granny Smith";

        var getTimestamp = function () {
            return Math.floor((new Date()).getTime() / 1000);
        };

        var getJson = function (path) {
            return $.ajax({
                url: baseUrl + path,
                method: "GET"
            });
        };

        var postJson1 = function (path, data) {
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

        var postJson2 = function (path, data) {
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
            postJson1("api/client/location", data);
        });

        $("#btnClientHeartRate").click(function () {
            var data = {
                heartRate: 81
            };
            postJson1("api/client/heartrate", data);
        });

        $("#btnClientPanic").click(function () {
            postJson1("api/client/panic");
        });

        $("#btnClientPanicOver").click(function () {
            postJson1("api/client/panicover");
        });

        /* ********************************************************************** */
        /* Volunteer Portal REST API                                              */
        /* ********************************************************************** */

        $("#btnVolunteerGetAll").click(function () {
            getJson("api/volunteer");
        });

        $("#btnVolunteerGet").click(function () {
            getJson("api/volunteer/1");
        });

        $("#btnVolunteerRegister").click(function () {
            var data = {
                firstName: "Jon",
                lastName: "Taylor",
                mobile: "07546 372748",
                email: "jonathan.taylor@dsl.pipex.com",
                postcode: "M21 8TX"
            };
            postJson2("api/volunteer/register", data);
        });

        $("#btnVolunteerSetAvailabilityTrue").click(function () {
            var data = {
                id: 1,
                availability: true
            };
            postJson2("api/volunteer/availability", data);
        });

        $("#btnVolunteerSetAvailabilityFalse").click(function () {
            var data = {
                id: 1,
                availability: false
            };
            postJson2("api/volunteer/availability", data);
        });
    });
}());
