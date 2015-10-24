const SELECTEDFLOORUPDATED = "SELECTEDFLOORUPDATED";
const LOCATIONUPDATED = "LOCATIONUPDATED";

export function selectedFloor(data) {
    return { state : data, type: SELECTEDFLOORUPDATED };
}

export function currentLocation(data) {
    return { state : data, type: SELECTEDFLOORUPDATED };
}