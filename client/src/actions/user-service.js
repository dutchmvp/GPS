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

	save(user) {
		localStorage.setItem('user', JSON.stringify(user));
	}

	getUser() {
		return JSON.parse(localStorage.getItem('user'));
	}

	register(data) {
		return new Promise((resolve, reject) => {
			try {
				let xhr = new XMLHttpRequest();

				xhr.open('POST', this.config.url + 'register');
				xhr.setRequestHeader('Content-Type', 'application/json');
				
				xhr.onload = () => {
					if (xhr.status === 200) {
						resolve(JSON.parse(xhr.responseText));
						this.save(JSON.parse(xhr.responseText));
					}
				};

				xhr.send(JSON.stringify(data));
			}
			catch(err) {
				reject(err);
			}
		});
	}

	login(data) {
		return new Promise((resolve, reject) => {
			try {
				let xhr = new XMLHttpRequest();

				xhr.open('POST', this.config.url + 'login');
				xhr.setRequestHeader('Content-Type', 'application/json');
				
				xhr.onload = () => {
					if (xhr.status === 200) {
						resolve(JSON.parse(xhr.responseText));
						this.save(JSON.parse(xhr.responseText));
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
		return (this.getUser()) ? this.getUser().Id > 0 : false;
	}

	switchAvailability() {
		return new Promise((resolve, reject) => {
			try {
				let xhr = new XMLHttpRequest(),
					user = this.getUser(),
					availability = !user.Availability

				xhr.open('POST', this.config.url + 'availability');
				xhr.setRequestHeader('Content-Type', 'application/json');
				
				xhr.onload = () => {
					if (xhr.status === 200) {
						resolve(xhr.responseText);

						let user = this.getUser();
						user.Availability = availability; // invert availability

						this.save(user);
					}
				};

				if (user) {
					xhr.send(JSON.stringify({
						'id': user.Id,
						'availability': availability
					}));
				}
			}
			catch(err) {
				reject(err);
			}
		});
	}
}

export default new UserService();
