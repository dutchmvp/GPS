import React from "react";
import CSSModule from "react-css-modules";
import styles from "./hometracker-styles";
import HomeTrackerStore from "../../store/Store";
import FakeData from "./HomeTrackerFakeData";

class HomeTracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            houseConfig : this.props.houseConfig,
            hasLoaded : false,
            selectedFloor : HomeTrackerStore.getState().selectedFloor,
            currentLocation : HomeTrackerStore.getState().currentLocation
        };
        HomeTrackerStore.subscribe(this.onStoreUpdate.bind(this));
    }

    componentWillReceiveProps(nextProps){
        if(Object.keys(nextProps.houseConfig).length) {
            setTimeout(()=> {
                this.setState({
                    hasLoaded : true,
                    houseConfig :nextProps.houseConfig
                });
            }, 500);
        }
    }

    onStoreUpdate() {
        this.setState({
            selectedFloor : HomeTrackerStore.getState().selectedFloor,
            currentLocation : HomeTrackerStore.getState().currentLocation
        })
    }


    createRooms() {
        let index = this.state.selectedFloor;
        let style = { marginLeft : -(this.state.houseConfig.floors[index].rooms.length * 50) + "px" };
        return this.state.houseConfig.floors[index].rooms.map((room, i) => {
            let className = this.state.currentLocation.currentRoom == i && this.state.selectedFloor == this.state.currentLocation.currentFloor ? "room current-room" : "room";
            return (
                <div key={i} styleName="cube" style={style} className={className}>
                    <div styleName="side front"/>
                    <div styleName="side back"/>
                    <div styleName="side right"/>
                    <div styleName="side left"/>
                    <div styleName="side top"/>
                    <div styleName="side bottom"/>
                </div>
            );
        })
    }

    render() {
        if(!this.state.hasLoaded) {
            return(<p>Awaiting occupant data</p>)
        }
        else {

            return(
                <div>
                    <h2>Occupant's Residence</h2>
                    <div styleName="home-map-holder">
                        { this.createRooms() }
                    </div>
                    <FakeData houseConfig={ this.state.houseConfig }/>
                </div>
            );
        }

    }
}

export default CSSModule(HomeTracker, styles, { allowMultiple : true });