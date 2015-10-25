import { getVolunteerConfig } from "../utils/get-volunteer-config";
import UserService from './user-service';

class VolunteerService {  
	constructor() {

	}

	getAll() {
		return new Promise((resolve, reject) => {
			getVolunteerConfig().then(config => {
				let user = UserService.getUser();

				if (user.Id > 0) {
					let xhr = new XMLHttpRequest();

					xhr.open('GET', config.url + '');
					xhr.setRequestHeader('Content-Type', 'application/json');
					
					xhr.onload = () => {
						if (xhr.status === 200) {
							resolve(JSON.parse(xhr.responseText));
						}
					};

					xhr.send(JSON.stringify({
						'id': user.Id
					}));
				}
				else {
					reject('No user account');
				}
			});
		});
	}
}

export default VolunteerService;
