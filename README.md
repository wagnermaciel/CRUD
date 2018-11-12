# CRUD
An express-graphql crud app.


## Server-Side


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
