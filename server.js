const express = require('express');
const graphqlHTTP = require('express-graphql');
const {
	GraphQLNonNull,
	GraphQLString,
	GraphQLObjectType,
	GraphQLInt,
	GraphQLSchema,
	GraphQLList,
	GraphQLBoolean,
} = require('graphql');
const database = require('./database');

// ********************** //
// Define The User Fields //
// ********************** //

const userFields = {
	id: {
		type: GraphQLNonNull(GraphQLInt),
		description: "The id of the user.",
	},
	firstName: {
		type: GraphQLNonNull(GraphQLString),
		description: "The first name of the user.",
	},
	lastName: {
		type: GraphQLNonNull(GraphQLString),
		description: "The last name of the user.",
	},
	fullName: {
		type: GraphQLNonNull(GraphQLString),
		description: "The full name of the user.",
		resolve: ({ firstName, lastName }) => `${firstName} ${lastName}`,
	},
};

// ******************** //
// Define The User Type //
// ******************** //

const userType = new GraphQLObjectType({
	name: "User",
	description: "A user object",
	fields: () => userFields,
});

// **************** //
// Define The Query //
// **************** //

const userQuery = new GraphQLObjectType({
	name: "Query",
	fields: () => ({

		// Retrieve all of the users.

		users: {
			type: GraphQLList(userType),
			description: "Retrieve all of the users.",
			resolve: () => database.getUsers(),
		},

		// Retrieve a single user.

		user: {
			type: userType,
			description: "Retrieve a single user.",
			args: {
				id: userFields.id,
			},
			resolve: (root, { id }) => database.getUser(id),
		},

	}),
});

// ******************* //
// Define The Mutation //
// ******************* //

const userMutation = new GraphQLObjectType({
	name: "Mutation",
	fields: () => ({

		// Create a new user.

		createUser: {
			type: userType,
			description: "Create a new user.",
			args: {
				firstName: userFields.firstName,
				lastName: userFields.lastName,
			},
			resolve: (root, { firstName, lastName }) => database.createUser(firstName, lastName),
		},

		// Update an existing user.

		updateUser: {
			type: userType,
			description: "Update an existing user.",
			args: {
				id: userFields.id,
				firstName: userFields.firstName,
				lastName: userFields.lastName,
			},
			resolve: (root, { id, firstName, lastName }) => database.updateUser(id, firstName, lastName),
		},

		// Delete an existing user.

		deleteUser: {
			type: GraphQLNonNull(GraphQLBoolean),
			description: "Delete an existing user.",
			args: {
				id: userFields.id,
			},
			resolve: (root, { id, firstName, lastName }) => database.deleteUser(id),
		},
	
	}),
});

// ***************** //
// Define The Schema //
// ***************** //

const userSchema = new GraphQLSchema({
	query: userQuery,
	mutation: userMutation,
	types: [userType],
});

// ******************************** //
// Start The Express-GraphQL Server //
// ******************************** //

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: userSchema,
  graphiql: true,
}));
app.get('', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});
app.listen(4000, () => console.log('Now browse to http://localhost:4000'));
