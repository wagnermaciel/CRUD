# CRUD
An express-graphql crud app.


## Server-Side (server.js)


### Types


**`userType`** - The type definition for a standard user.

* **`id`** - The UID.
* **`firstName`** - The users first name.
* **`lastName`** - The users last name.
* **`fullName`** - The users first and last name.


### Queries


**`user`** - Retrieves the user with the given id.

* **args**
  * **`id`** - The id of the user to be retrieved.
* **returns**
  * **`userType`** - The user with the given id.

**`users`** - Retrieves all of the users in the database.

* **args**

* **returns**
  * **`[userType]`** - An array of all of the users

### Mutations


**`createUser`** - Creates a user with the given first and last name.

* **args**
  * **`firstName`** - The new users first name.
  * **`lastName`** - The new users first name.
* **returns**
  * **`userType`** - The newly created user.


**`updateUser`** - Updates a users first and last name.

* **args**
  * **`id`** - The id of the user to be updated.
  * **`firstName`** - The new first name.
  * **`lastName`** - The new users first name.
* **returns**
  * **`userType`** - The newly created user.


**`deleteUser`** - Deletes a user from the database.

* **args**
  * **`id`** - The id of the user to be deleted.
* **returns**
  * **`boolean`** true if the deletion was successful and false otherwise.
  
 ## Client-Side (index.html)

 
 ### Left Column
 
 
The left column supports four actions that a user can take:

* **Create** - Create a new user.
* **Read** - Read the data of a user.
* **Update** - Update an existing user.
* **Delete** - Delete a user from the database.

Each of these operations are done by sending requests to the graphql server.

### Middle Column

The middle column displays the response from the server.

### Right Column

The right column displays the state of the database after each operation.

**Note** - The database is **NOT** reactive and will not update for all users when changed.
