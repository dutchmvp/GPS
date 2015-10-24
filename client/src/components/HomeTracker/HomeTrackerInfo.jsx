import React from "react";

export default class HomeTrackerInfo extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            houseConfig : this.props.houseConfig,
            hasLoaded : false
        }
    }

    componentWillReceiveProps(nextProps){
        if(Object.keys(nextProps.houseConfig).length) {
            setTimeout(()=> {
                this.setState({
                    hasLoaded : true
                });
            }, 500);
        }
    }

    render() {
        let output;
        if(!this.state.hasLoaded) {
            output = HomeTrackerInfo.getAwaitingDataMsg();
        }
        else {
            output = HomeTrackerInfo.getInfoMarkup();
        }
        return(
          <div>{ output }</div>
        );
    }

}

HomeTrackerInfo.getAwaitingDataMsg = function(){
    return (<p>Awaiting data please wait...</p>);
}

HomeTrackerInfo.getInfoMarkup = function() {
    return (<p>Data hath arrived...</p>);
}