(function() {

    "use strict";

    var baseUrl = "http://localhost:57911/";

    $(document).ready(function() {
        $("#btnSendLocationData").click(function() {
            $.post(
                baseUrl + "api/client/location",
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
            );
        });
    });
}());
