import React from "react";
import HomeTrackerStore from "../store/Store";
import { panicStatus, currentLocation, selectedFloor, heartBeat, lastHeartBeat } from "../actions/home-tracker-actions";

export default class SocketClient extends React.Component {

    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            houseConfig : this.props.houseConfig
        };

        var baseUrl = "http://bc3b255d.ngrok.io/";
        console.log("calling $.hubConnection()");
        var hubConnection = $.hubConnection();

        console.log("hubConnection.url: ", hubConnection.url);
        hubConnection.url = baseUrl + "/signalr";
        console.log("hubConnection.url: ", hubConnection.url);
        hubConnection.logging = true;

        console.log("calling hubConnection.createHubProxy('notifier')");
        var hubProxy = hubConnection.createHubProxy("notifier");

        hubProxy.on("message", message => {
            console.log("hubProxy.on('message')");
            console.log(arguments);
        });

        hubProxy.on("roomUpdate", roomId => {
            console.log("hubProxy.on('message')");
            console.log(arguments);
            this.onRoomUpdate(roomId);
        });

        hubProxy.on("heartRateUpdate", (beats, time) => {
            console.log("hubProxy.on('message')");
            console.log(arguments);
            var date = new Date(time*1000);
            var hours = date.getHours();
            var minutes = "0" + date.getMinutes();
            var seconds = "0" + date.getSeconds();
            var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            HomeTrackerStore.dispatch(lastHeartBeat(formattedTime));
            HomeTrackerStore.dispatch(heartBeat(beats));
        });

        hubProxy.on("panic", message => {
            console.log("hubProxy.on('message')");
            console.log(arguments);
            HomeTrackerStore.dispatch(panicStatus(true));
        });

        hubProxy.on("panicOver", message => {
            console.log("hubProxy.on('message')");
            console.log(arguments);
            HomeTrackerStore.dispatch(panicStatus(false));
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
    }

    componentWillReceiveProps(nextProps){
        if(Object.keys(nextProps.houseConfig).length) {
            this.setState({
                houseConfig :nextProps.houseConfig
            });
        }
    }

    onRoomUpdate(roomId){
        let roomIndex;
        let floor;
        let floors = this.state.houseConfig.floors;
        let rooms = floors.map(floor => {
            return floor.rooms;
        });
        let ids = [];
        rooms.forEach((room, i) => {
            if(!ids.length) {
                ids = room.filter((r, j) => {
                    if(Number(r.id) === roomId) {
                        roomIndex = j;
                        return r;
                    }
                });
                if(ids.length){
                    floor = i;
                }
            }
        });
        HomeTrackerStore.dispatch(currentLocation({ currentRoom : roomIndex, currentFloor : floor }));
        HomeTrackerStore.dispatch(selectedFloor(floor));
    }

    render(){
        return false;
    }
}