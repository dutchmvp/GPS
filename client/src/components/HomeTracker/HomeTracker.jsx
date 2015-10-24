import React from "react";
import CSSModule from "react-css-modules";
import styles from "./hometracker-styles";

class HomeTracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            houseConfig : this.props.houseConfig,
            hasLoaded : false,
            selectedFloor : 0
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

    createRooms() {
        let index = this.state.selectedFloor;
        let style = { marginLeft : -(this.state.houseConfig.floors[index].rooms.length * 50) + "px" };
        return this.state.houseConfig.floors[index].rooms.map((room, i) => {
            return (
                <div key={i} styleName="cube" style={style}>
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
                    { this.createRooms() }
                </div>

            );
        }

    }
}

export default CSSModule(HomeTracker, styles, { allowMultiple : true });