import React from "react";
import CSSModule from "react-css-modules";
import styles from "./hometracker-styles";
import HomeTrackerStore from "../../store/Store";
import { currentLocation, selectedFloor, panicStatus } from "../../actions/home-tracker-actions";

export default class FakeData extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            houseConfig : this.props.houseConfig,
            selectedFloor : HomeTrackerStore.getState().selectedFloor,
            currentLocation : HomeTrackerStore.getState().currentLocation,
            panicStatus : HomeTrackerStore.getState().panicStatus
        };
        HomeTrackerStore.subscribe(this.onStoreUpdate.bind(this));
        this.startFakingData();
    }

    onStoreUpdate() {
        this.setState({
            selectedFloor : HomeTrackerStore.getState().selectedFloor,
            currentLocation : HomeTrackerStore.getState().currentLocation,
            panicStatus : HomeTrackerStore.getState().panicStatus
        });
    }

    startFakingData() {

        let timer = setInterval(()=> {

            var random = Math.floor(Math.random() * 100);
            if(random > 75) {
                console.log("PANIC!!", random);
                clearInterval(timer);
                HomeTrackerStore.dispatch(panicStatus(true));
                setTimeout(()=> {
                    HomeTrackerStore.dispatch(panicStatus(false));
                    this.startFakingData();
                }, 6000);
            }
            else {

                let currentFloor = Number(this.state.currentLocation.currentFloor);
                let currentRoom = Number(this.state.currentLocation.currentRoom);
                let maxRoomOnThisFloor = this.state.houseConfig.floors[currentFloor].rooms.length - 1;
                let maxFloor = this.state.houseConfig.floors.length - 1;
                let nextFloor, nextRoom;

                if(currentRoom + 1 > maxRoomOnThisFloor) {
                    nextRoom = 0;
                    if(currentFloor === maxFloor){
                        nextFloor = 0;
                    }
                    else {
                        nextFloor = currentFloor + 1;
                    }
                }
                else {
                    nextRoom = currentRoom + 1;
                    nextFloor = currentFloor;
                }

                HomeTrackerStore.dispatch(selectedFloor(nextFloor));
                HomeTrackerStore.dispatch(currentLocation({
                    currentRoom : nextRoom,
                    currentFloor : nextFloor
                }));

            }

        }, 2500);
    }

    render(){
        return false;
    }
}