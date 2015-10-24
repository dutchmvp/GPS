export function getHouseConfig() {
    return fetch('/data/house-config.json')
        .then(response => {
            return response.json();
        });
}