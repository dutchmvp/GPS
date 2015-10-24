import { getVolunteerConfig } from "../utils/get-volunteer-config";

let instance = null;

class UserService {  
	constructor() {
		if (!instance) {
			instance = this;

			// initalise
			this.authenticated = this.isAuthenticated();

			getVolunteerConfig().then(config => {
				this.config = config;
			});
		}

		return instance;
	}

	register(data) {
		return new Promise((resolve, reject) => {
			try {
				let xhr = new XMLHttpRequest();

				xhr.open('POST', this.config.url + 'register');
				xhr.setRequestHeader('Content-Type', 'application/json');
				
				xhr.onload = function() {
					if (xhr.status === 200) {
						resolve(JSON.parse(xhr.responseText));
					}
				};

				xhr.send(JSON.stringify(data));
			}
			catch(err) {
				reject(err);
			}
		});
	}

	isAuthenticated() {
		return (localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Id > 0 : false;
	}
}

export default new UserService();
