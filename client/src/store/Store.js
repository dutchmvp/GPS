import { createStore } from "redux";

function HomeTracker(state = {}, action = {}) {
    return {
        selectedFloor : selectedFloor(state.selectedFloor, action),
        currentLocation : currentLocation(state.currentLocation, action)
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

function currentLocation(state = { currentRoom : 0, currentFloor : 0 }, action = {}) {
    switch(action.type) {
        case "LOCATIONUPDATED" :
            return action.state;
        default :
            return state;
    }
}

let HomeTrackerStore = createStore(HomeTracker);
export default HomeTrackerStore;