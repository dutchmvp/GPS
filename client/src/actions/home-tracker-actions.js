const SELECTEDFLOORUPDATED = "SELECTEDFLOORUPDATED";
const LOCATIONUPDATED = "LOCATIONUPDATED";
const PANICSTATUSUPDATED = "PANICSTATUSUPDATED";
const HEARTBEATUPDATED = "HEARTBEATUPDATED";

export function selectedFloor(data) {
    return { state : data, type: SELECTEDFLOORUPDATED };
}

export function currentLocation(data) {
    return { state : data, type: LOCATIONUPDATED };
}

export function panicStatus(data) {
    return { state : data, type: PANICSTATUSUPDATED };
}

export function heartBeat(data) {
    return { state : data, type: HEARTBEATUPDATED };
}