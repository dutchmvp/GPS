import React from "react";
import HomeTrackerInfo from "./HomeTracker/HomeTrackerInfo";
import HomeTracker from "./HomeTracker/HomeTracker";
import SocketClient from "../utils/socket-client";
import { getHouseConfig } from "../utils/get-home-config";

class HomeTrackerApp extends React.Component {

    constructor(){
        super();
        this.state = {
            houseConfig : {}
        };
        getHouseConfig().then(this.onConfigLoad.bind(this));
    }

    onConfigLoad(data) {
        console.log("LOADED", data);
        this.setState({
            houseConfig : data
        });
    }

    render() {
        return(
            <div className="row">
                <div className="col-sm-8">
                    <HomeTracker
                        houseConfig={ this.state.houseConfig }
                    />
                </div>
                <div className="col-sm-4">
                    <HomeTrackerInfo
                        houseConfig={ this.state.houseConfig }
                    />
                </div>
                <SocketClient
                    houseConfig={ this.state.houseConfig }
                />
            </div>
        );
    }

}

React.render(<HomeTrackerApp />, document.querySelector(".container"));