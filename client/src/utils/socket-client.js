var connectHub = function () {
    
    var baseUrl = "http://bc3b255d.ngrok.io/";
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