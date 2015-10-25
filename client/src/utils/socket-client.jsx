import React from "react";
import HomeTrackerStore from "../store/Store";
import { panicStatus, currentLocation, selectedFloor } from "../actions/home-tracker-actions";

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
        console.log("room id!", roomId);
        let floor;
        let floors = this.state.houseConfig.floors;
        let rooms = floors.map(floor => {
            return floor.rooms;
        });
        let ids = [];
        rooms.forEach((room, i) => {
            if(!ids.length) {
                ids = room.filter(r => Number(r.id) === roomId);
                if(ids.length){
                    floor = i;
                }
            }
        });
        HomeTrackerStore.dispatch(currentLocation({ currentRoom : Number(ids[0].id) - 1, currentFloor : floor }));
        HomeTrackerStore.dispatch(selectedFloor(floor));
        console.log("rooms", ids, floor);

    }

    render(){
        return false;
    }
}