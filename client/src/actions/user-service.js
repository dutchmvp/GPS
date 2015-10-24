import { getVolunteerConfig } from "../utils/get-volunteer-config";

let instance = null;

class userService {  
	constructor() {
		if (!instance) {
			instance = this;

			// initalise
			this.authenticated = false;
			getVolunteerConfig().then(config => {
				this.config = config;
			});
		}

		return instance;
	}

	register(form) {
		return new Promise((resolve, reject) => {
			try {
				fetch(this.config.url + 'register', {
					method: 'post',
					body: new FormData(form)
				}).then((response) => {
					resolve(response);
				});
			}
			catch(err) {
				reject(err);
			}
		});
	}
}

export default new userService();
