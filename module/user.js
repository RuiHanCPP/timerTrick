var User = module.exports = {
	
	userList: {},
	admin: 'EMC176',

	addUser: function(key) {
		this.userList[key] = 3;
	},

	makeBid: function(key) {
		if (this.userList[key] > 0) {
			this.userList[key] -= 1;
			return true;
		} else {
			return false;
		}
	},

	resetBid: function() {
		userList = {};
	}
}