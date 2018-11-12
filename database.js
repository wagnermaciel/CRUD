// ************************* //
// Initialize Some User Data //
// ************************* //

users = {
	0: {
		id: 0,
		firstName: "Junior",
		lastName: "Maciel",
	},
	1: {
		id: 1,
		firstName: "Eric",
		lastName: "Maciel",
	},
	2: {
		id: 2,
		firstName: "Jessica",
		lastName: "Amaral",
	}
};
let index = 3;

// ************************** //
// Define Some Helper Methods //
// ************************** //

module.exports.createUser = (firstName, lastName) => users[index] = {id: index++, firstName, lastName};
module.exports.getUsers = () => Object.values(users);
module.exports.getUser = (id) => users[id];
module.exports.updateUser = (id, firstName, lastName) => users[id] = {id, firstName, lastName};
module.exports.deleteUser = (id) => users[id] ? delete users[id] : false;
