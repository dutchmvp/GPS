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
        let current = HomeTrackerStore.getState().currentLocation;
        if(Object.keys(this.props.houseConfig).length && Object.keys(current).length) {
            location = this.props.houseConfig.floors[current.currentFloor].rooms[current.currentRoom].desc;
        }
        else {
            location = null;
        }

        this.state = {
            houseConfig : this.props.houseConfig,
            isPaniced : HomeTrackerStore.getState().panicStatus,
            hasLoaded : false,
            occupantLocation : location,
            beatsPerMinute : null,
            selectedFloor : HomeTrackerStore.getState().selectedFloor
        };
        HomeTrackerStore.subscribe(this.onStoreUpdate.bind(this));
    }

    onStoreUpdate(){
        if(Object.keys(this.state.houseConfig).length){
            let current = HomeTrackerStore.getState().currentLocation;
            let location;
            if(Object.keys(current).length){
                location = this.props.houseConfig.floors[current.currentFloor].rooms[current.currentRoom].desc;
            }
            else {
                location = null;
            }
            this.setState({
                occupantLocation : location,
                selectedFloor : HomeTrackerStore.getState().selectedFloor,
                isPaniced : HomeTrackerStore.getState().panicStatus
            });
        }
    }

    componentWillReceiveProps(nextProps){
        let current = HomeTrackerStore.getState().currentLocation;
        if(Object.keys(nextProps.houseConfig).length) {
            let location;
            if(Object.keys(current).length) {
                location = nextProps.houseConfig.floors[current.currentFloor].rooms[current.currentRoom].desc;
            }
            else {
                location = null;
            }
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
        let panicStatus = this.state.isPaniced ? <span styleName="panic-active"><br />WARNING: PANIC ACTIVATED</span> : "inactive";
        if(this.state.isPaniced){
            document.body.classList.add("danger");
        }
        else {
            document.body.classList.remove("danger");
        }
        return (
            <div styleName="info-holder">
                <h2>Occupant Info</h2>
                <p><strong>Name:</strong> { this.state.houseConfig.occupant }</p>
                <p><strong>Num of rooms:</strong> { numOfRooms }</p>
                <hr />
                { housePlan }
                <hr />
                <p><strong>Occupant location:</strong> { (this.state.occupantLocation || "awaiting positional data") }</p>
                <p><strong>Heartbeat</strong> { (this.state.beatsPerMinute || "awaiting data") }</p>
                <p><strong>Panic status:</strong> { panicStatus }</p>
                <hr />
                <h2>Floor Select</h2>
                { this.createFloorSelectButtons() }
            </div>
        );
    }

    createHousePlan() {
        let floors = this.state.houseConfig.floors;
        let current = HomeTrackerStore.getState().currentLocation;
        let location;
        if(Object.keys(current).length){
            location = floors[current.currentFloor].rooms[current.currentRoom].desc;
        }
        else {
            location = null;
        }
        return floors.map((floor, i) => {
            let rooms = floor.rooms.map((room, j) => {
                let key = ((j+(Math.random() * 100)) * 9).toFixed(2);
                let className = location === room.desc ? "highlight-floor" : "";
                return (<p key={key} className={className}  styleName="roomName">{ room.desc }</p>)
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
            let selected = i === Number(this.state.selectedFloor) ? "floor-selected" : "";
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
