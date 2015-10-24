export function getVolunteerConfig() {
	return new Promise(function(resolve, reject) {
		fetch('/data/volunteer-config.json')
			.then(response => {
				resolve(response.json());
			});
	});
}
