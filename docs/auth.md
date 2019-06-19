## Auth Management API

> API path: http://localhost:3000/api/

### Login

API for login of users.

#### Required Fields

- **email** - email address of the user to be authenticated
- **password** - password of the user to be authenticated

**POST /authenticate**

```json
{
  "email": "example@domain.com",
  "password": "password"
}
```

**Sample Response:**

```json
{
  "user": {
    "_id": "5d01e75d8c3cd75188ec7348",
    "email": "admin@admin.com",
    "role": "admin",
    "__v": 0,
    "createdAt": "2019-06-19T02:19:21.841Z",
    "updatedAt": "2019-06-19T02:19:21.841Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDAxZTc1ZDhjM2NkNzUxODhlYzczNDgiLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsInBlcm1pc3Npb25zIjpbImFkbWluIl0sImlhdCI6MTU2MDkxMjIyMH0.BKPTAqKj0AVAZFFjWSoZBzQNfYmi2g0XFkpdbbuoo6k"
}
```

> Set this in header **_header_** for every **_auth_** required requests. See below:

```json
{
  "Header": {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJ1c2VySWQiOiI1YjlmNzJlMWRlY2Y0OTIwM2NkNzA1NmEiLCJpYXQiOjE1MzcxNzY3MzYsImV4cCI6MTU2ODczNDMzNiwiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiYW5vbnltb3VzIiwianRpIjoiYzZiYmVlNWQtNGU4Mi00NTAyLWI4NzctYTFhY2M2NzkwZGUyIn0.7PJ1ykFkrR9XVB75tze3JCjxmsqqaW6R4Qw4ylto0mA"
  }
}
```

---

### Password Change

User requests for password change.

#### Required Fields

- **_email_** - email of the user for password change
- **_password_** - new password of the user

**POST /authmanagement**

```json
{
  "email": "example@domain.com",
  "password": "newPassword"
}
```

---
