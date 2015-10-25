const SELECTEDFLOORUPDATED = "SELECTEDFLOORUPDATED";
const LOCATIONUPDATED = "LOCATIONUPDATED";
const PANICSTATUSUPDATED = "PANICSTATUSUPDATED";

export function selectedFloor(data) {
    return { state : data, type: SELECTEDFLOORUPDATED };
}

export function currentLocation(data) {
    return { state : data, type: LOCATIONUPDATED };
}

export function panicStatus(data) {
    return { state : data, type: PANICSTATUSUPDATED };
}