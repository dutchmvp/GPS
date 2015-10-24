import React from "react";
import CSSModule from "react-css-modules";
import styles from "./info-styles";

class HomeTrackerInfo extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            houseConfig : this.props.houseConfig,
            hasLoaded : false,
            occupantLocation : null,
            beatsPerMinute : null
        }
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

    getInfoMarkup() {
        let floors = this.state.houseConfig.floors;
        let numOfRooms = floors.map(floor => {
            return floor.rooms;
        }).reduce((a,b) => {
            return a.length + b.length;
        });
        let housePlan = this.makeHousePlan();
        return (
            <div>
                <h2>House Stats</h2>
                <p><strong>Name:</strong> { this.state.houseConfig.occupant }</p>
                <p><strong>Num of rooms:</strong> { numOfRooms }</p>
                <hr />
                { housePlan }
                <hr />
                <p><strong>Occupant location:</strong> { (this.state.occupantLocation || "awaiting positional data") }</p>
                <p><strong>Heartbeat</strong> { (this.state.beatsPerMinute || "awaiting data") }</p>
            </div>
        );
    }

    makeHousePlan() {
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

export default CSSModule(HomeTrackerInfo, styles);
