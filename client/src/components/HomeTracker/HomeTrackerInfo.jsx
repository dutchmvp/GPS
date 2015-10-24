import React from "react";
import CSSModule from "react-css-modules";
import styles from "./info-styles";
import "../../styles/global";
import HomeTrackerStore from "../../store/Store";
import { selectedFloor } from "../../actions/home-tracker-actions";

class HomeTrackerInfo extends React.Component {

    constructor(props){
        super(props);
        let location;
        if(Object.keys(this.props.houseConfig).length){
            let current = HomeTrackerStore.getState().currentLocation;
            location = this.props.houseConfig.floors[current.currentFloor].rooms[current.currentRoom].desc;
        }
        else {
            location = null;
        }

        this.state = {
            houseConfig : this.props.houseConfig,
            hasLoaded : false,
            occupantLocation : location,
            beatsPerMinute : null
        }
    }

    componentWillReceiveProps(nextProps){
        if(Object.keys(nextProps.houseConfig).length) {
            let current = HomeTrackerStore.getState().currentLocation;
            let location = nextProps.houseConfig.floors[current.currentFloor].rooms[current.currentRoom].desc;
            setTimeout(()=> {
                this.setState({
                    hasLoaded : true,
                    houseConfig :nextProps.houseConfig,
                    occupantLocation : location
                });
            }, 500);
        }
    }

    getInfoMarkup() {
        let floors = this.state.houseConfig.floors;
        let numOfRooms = floors.map(floor => {
            return floor.rooms;
        }).reduce((a,b) => {
            return a.length + b.length;
        });
        let housePlan = this.createHousePlan();
        return (
            <div>
                <h2>Occupant Info</h2>
                <p><strong>Name:</strong> { this.state.houseConfig.occupant }</p>
                <p><strong>Num of rooms:</strong> { numOfRooms }</p>
                <hr />
                { housePlan }
                <hr />
                <p><strong>Occupant location:</strong> { (this.state.occupantLocation || "awaiting positional data") }</p>
                <p><strong>Heartbeat</strong> { (this.state.beatsPerMinute || "awaiting data") }</p>
                <hr />
                <h2>Floor Select</h2>
                { this.createFloorSelectButtons() }
            </div>
        );
    }

    createHousePlan() {
        let floors = this.state.houseConfig.floors;
        return floors.map((floor, i) => {
            let rooms = floor.rooms.map((room, j) => {
                let key = ((j+(Math.random() * 100)) * 9).toFixed(2);
                return (<p key={key} styleName="roomName">{ room.desc }</p>)
            });
            let key = ((i+(Math.random() * 1000)) * 10).toFixed(2);
            return (
                <div>
                    <p key={key} styleName="floorName">{ floor.desc }</p>
                    { rooms }
                </div>
            );
        });
    }

    createFloorSelectButtons(){
        return this.state.houseConfig.floors.map((floor, i) => {
            let selected = i === 0 ? "floor-selected" : "";
            return (
                <div
                    data-floor={i}
                    styleName="floor-select-btn"
                    className={selected}
                    onClick={HomeTrackerInfo.onFloorSelectButtonClick}>
                        <p>{i+1}</p>
                </div>
            );
        }).reverse();
    }

    render() {
        let output;
        if(!this.state.hasLoaded) {
            return (HomeTrackerInfo.getAwaitingDataMsg());
        }
        else {
            return(this.getInfoMarkup());
        }
    }

}

HomeTrackerInfo.getAwaitingDataMsg = function(){
    return (<p>Awaiting data please wait...</p>);
};

HomeTrackerInfo.onFloorSelectButtonClick = function(evt) {
    let target = evt.target;
    if(target.tagName === "P") {
        target = target.parentNode;
    }
    if(!target.classList.contains("floor-selected")) {
        let current = document.querySelector(".floor-selected");
        if(current) {
            current.classList.remove("floor-selected");
        }
        target.classList.add("floor-selected");
    }
    HomeTrackerStore.dispatch(selectedFloor(target.getAttribute("data-floor")));
};

export default CSSModule(HomeTrackerInfo, styles);
