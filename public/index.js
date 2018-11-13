function init() {

	// ****** //
	// Create //
	// ****** //

	document.querySelector('.create-user button').addEventListener('click', () => {
		const firstName = document.querySelector('.create-user .first-name').value;
		const lastName = document.querySelector('.create-user .last-name').value;
		const variables = { firstName, lastName };
		const query = `
			mutation createUser($firstName: String!, $lastName: String!) {
				createUser(firstName: $firstName, lastName: $lastName) {
					id
					fullName
					firstName
					lastName
				}
			}`;
		sendQuery(query, variables, (data) => {
			showResponse(data)
			refreshDB();
		});
	});

	// **** //
	// Read //
	// **** //

	document.querySelector('.read-user button').addEventListener('click', () => {
		const id = parseInt(document.querySelector('.read-user .id').value);
		const variables = { id };
		const query = `
			query user($id: Int!) {
				user(id: $id) {
					id,
					fullName,
					firstName,
					lastName,
				}
			}`;
		sendQuery(query, variables, (data) => {
			showResponse(data)
			refreshDB();
		});
	});

	// ****** //
	// Update //
	// ****** //

	document.querySelector('.update-user button').addEventListener('click', () => {
		const id = parseInt(document.querySelector('.update-user .id').value);
		const firstName = document.querySelector('.update-user .first-name').value;
		const lastName = document.querySelector('.update-user .last-name').value;
		const variables = { id, firstName, lastName };
		const query = `
			mutation updateUser($id: Int!, $firstName: String!, $lastName: String!) {
				updateUser(id: $id, firstName: $firstName, lastName: $lastName) {
					id,
					fullName,
					firstName,
					lastName,
				}
			}`;
		sendQuery(query, variables, (data) => {
			showResponse(data)
			refreshDB();
		});
	});

	// ****** //
	// Delete //
	// ****** //

	document.querySelector('.delete-user button').addEventListener('click', () => {
		const id = parseInt(document.querySelector('.delete-user .id').value);
		const variables = { id };
		const query = `
			mutation deleteUser($id: Int!) {
				deleteUser(id: $id)
			}`;
		sendQuery(query, variables, (data) => {
			showResponse(data)
			refreshDB();
		});
	});

	// **************** //
	// Helper Functions //
	// **************** //

	function sendQuery(query, variables, callback) {
		fetch('/graphql', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
			body: JSON.stringify({
				query,
				variables,
			}),
		})
			.then(r => r.json())
			.then(data => callback(data));
	}

	function showResponse(data) {				
		document.querySelector('.response p').innerText = JSON.stringify(data, null, 2);
	}

	function refreshDB() {
		const query = `
			query users {
				users {
					id,
					fullName,
					firstName,
					lastName,
				}
			}`;
		sendQuery(query, null, (data) => {
			document.querySelector('.database p').innerText = JSON.stringify(data, null, 2);
		});
	}

	refreshDB();
}

document.addEventListener('DOMContentLoaded', init);