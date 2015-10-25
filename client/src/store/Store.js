import { createStore } from "redux";

function HomeTracker(state = {}, action = {}) {
    return {
        selectedFloor : selectedFloor(state.selectedFloor, action),
        currentLocation : currentLocation(state.currentLocation, action),
        panicStatus : panicStatus(state.panicStatus, action)
    }
}

function selectedFloor(state = 0, action = {}) {
    switch(action.type) {
        case "SELECTEDFLOORUPDATED" :
            return action.state;
        default :
            return state;
    }
}

function currentLocation(state = {}, action = {}) {
    switch(action.type) {
        case "LOCATIONUPDATED" :
            return action.state;
        default :
            return state;
    }
}

function panicStatus(state = false, action = {}) {
    switch(action.type) {
        case "PANICSTATUSUPDATED" :
            return action.state;
        default :
            return state;
    }
}

let HomeTrackerStore = createStore(HomeTracker);
export default HomeTrackerStore;