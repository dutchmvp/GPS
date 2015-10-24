let instance = null;

class userService {  
	constructor() {
		if (!instance) {
			instance = this;

			// initalise
			this.authenticated = true;
		}

        return instance;
    }
}

export default new userService();
