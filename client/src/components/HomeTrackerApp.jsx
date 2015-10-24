import React from "react";
import HomeTrackerInfo from "./HomeTracker/HomeTrackerInfo";
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
        console.log(data);
        this.setState({
            houseConfig : data
        });
    }

    render() {
        return(
            <div className="row">
                <div className="col-sm-8">
                    <p>Stuff coming soon...</p>
                </div>
                <div className="col-sm-4">
                    <HomeTrackerInfo
                        houseConfig={ this.state.houseConfig }
                    />
                </div>
            </div>
        );
    }

}

React.render(<HomeTrackerApp />, document.querySelector(".container"));