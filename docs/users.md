## User Management API

> API path: http://localhost:3000/api/

> **_Note:_**
> You should have **_authentication token_** beyond this point!

---

#### Create New User

**POST /users**
Creates new entry

> **_Note:_**
> Only admin role user can access this api.

##### _Required Fields_

- **email** - email of the user
- **role** - role of the user
- **password** - password of the user

```json
{
  "email": "example@domain.com",
  "role": "dev",
  "password": "password"
}
```

##### _Expected Response_

- Returns

```json
{
  "_id": "5d099c7cc1832a1550f77b81",
  "createdAt": "2019-06-19T02:22:52.605Z",
  "updatedAt": "2019-06-19T02:22:52.605Z",
  "email": "example@domain.com",
  "role": "dev",
  "__v": 0
}
```

---

#### Gets all user

**GET /users**

##### Sample Response

- Return list of users.

```json
{
  "users": [
    {
      "_id": "5d0740de75094a3084843258",
      "email": "test@test.com",
      "role": "dev",
      "firstName": "Sample",
      "lastName": "Sample"
    },
    {
      "_id": "5d0740de75094a3084843258",
      "email": "test@one.com",
      "role": "dev",
      "firstName": "Other",
      "lastName": "Other"
    }
  ]
}
```

---

#### Get individual user

**GET /users/:id**

##### Sample Response

- Returns data of specific user.

```json
{
  "_id": "5d01e75d8c3cd75188ec7348",
  "email": "admin@admin.com",
  "role": "admin"
}
```

---

#### Updating a user

**PATCH /users/:id**

##### Fields (optional)

- **firstName** - first name of the user
- **lastName** - last name of the user
- **position** - position of the user
- **image** - base 64 image of the user

```json
{
  "firstName": "Sample",
  "lastName": "Sample",
  "position": "Tester",
  "image": "base 64 image"
}
```

##### Sample Response

- Patches a specific user.

```json
{
  "_id": "5d0740de75094a3084843258",
  "email": "test@test.com",
  "role": "dev",
  "firstName": "Sample",
  "lastName": "Sample",
  "position": "Tester",
  "image": "base64 image string"
}
```

---

#### Deleting a user

**DELETE /users/:id**

> **_Note:_**
> Only admin role user can access this api.

##### Sample Response

- Removes a specficic user.

```json
{
  "message": "Successfully deleted user."
}
```

---
