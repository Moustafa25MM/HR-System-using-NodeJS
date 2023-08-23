# IVoiceUp application Server

## Installation

```bash
npm i
```

## Usage

```python
1. create a .env file in the root directory and add the following as an example:
MONGO_URL='mongodb://localhost:27017/IVoiceUp'
PORT=4000
JWT_SECRET=IVoiceUp

2. npm run dev -> to run the server
3. npm test -> to run tests

```

## How to use

### Login

```python
1. endpoint = http://localhost:4000/login   "Or any port of your choice"
2. Provide the following example json in the body :
{
  "email":"hrEmployee1@example.com",
    "password":"password"
}

```

### Create User

```python
1. endpoint =   http://localhost:4000/employees/create   "Or any port of your choice"
2. you provide an Authorization token in the headres

2. Provide the following example json in the body :
{     "name": "user1",
      "email": "user1@gmail.com",
      "password": "password",
      "group": "Normal Employee"
}

It will return an object like this:
{
    "name": "user1",
    "email": "user1@gmail.com",
    "group": "Normal Employee",
    "_id": "64e5adf8b55852b1faf42f56",
    "createdAt": "2023-08-23T06:58:00.289Z",
    "updatedAt": "2023-08-23T06:58:00.289Z",
    "__v": 0
}
```

### get Employee By Id

```python
1. endpoint =  http://localhost:4000/employees/emp/64e5adf8b55852b1faf42f56/   "Or any port of your choice"
2. you provide an Authorization token in the headres

It will return an object like this:

{
    "_id": "64e55339dbdd0b01ad8db0fd",
    "name": "user1",
    "email": "user1@gmail.com",
    "group": "Normal Employee",
    "createdAt": "2023-08-23T00:30:49.853Z",
    "updatedAt": "2023-08-23T08:07:06.987Z",
    "__v": 0
}
```

### get All Employees of Group HR or Group Normal Employee

```python
1. endpoint =   http://localhost:4000/employees/all?group=hr   "Or any port of your choice"
1. endpoint =   http://localhost:4000/employees/all?group=normal   "Or any port of your choice"
2. you provide an Authorization token in the headres

It will return an object like this:

{
    "pagination": {
        "totalDocs": 3,
        "limit": 1,
        "totalPages": 3,
        "page": 2,
        "pagingCounter": 2,
        "hasPrevPage": true,
        "hasNextPage": true,
        "prevPage": 1,
        "nextPage": 3
    },
    "employees": [
        {
            "_id": "64e5533adbdd0b01ad8db107",
            "name": "HR User",
            "email": "hrEmployee2@example.com",
            "group": "HR",
            "createdAt": "2023-08-23T00:30:50.061Z",
            "updatedAt": "2023-08-23T00:30:50.061Z",
            "__v": 0
        }
    ]
}
```

### update Jogging

```python
1. endpoint =   http://localhost:4000/employees/profile/64e5a33bb55852b1faf42f1b   "Or any port of your choice"
2. you provide an Authorization token in the headres

3. Provide the following example json in the body :
{
    "email":"user2@gmail.com"
}

It will return an object like this:

{
    "id": "64e5a33bb55852b1faf42f1b",
    "name": "user1",
    "email": "user2@gmail.com",
    "group": "Normal Employee"
}
```

### Create Attendance

```python
1. endpoint =   http://localhost:4000/attendance/create   "Or any port of your choice"
2. you provide an Authorization token in the headres

3. Provide the following example json in the body :
{
    "employeeId":"64e5536f669664747e3d2dac",
    "date":"12/12/2012",
    "status":"present"
}

It will return an object like this:

{
    "employee": "64e5536f669664747e3d2dac",
    "date": "2012-12-11T22:00:00.000Z",
    "status": "present",
    "_id": "64e55394669664747e3d2db1",
    "createdAt": "2023-08-23T00:32:20.934Z",
    "updatedAt": "2023-08-23T00:32:20.934Z",
    "__v": 0
}
```

### Update Attendance

```python
1. endpoint =    http://localhost:4000/attendance/update/64e55394669664747e3d2db1   "Or any port of your choice"
2. you provide an Authorization token in the headres

3. Provide the following example json in the body :
{
    "status":"late"
}
It will return an object like this:
{
    "_id": "64e55394669664747e3d2db1",
    "employee": "64e5536f669664747e3d2dac",
    "date": "2012-12-11T22:00:00.000Z",
    "status": "late",
    "createdAt": "2023-08-23T00:32:20.934Z",
    "updatedAt": "2023-08-23T00:32:53.750Z",
    "__v": 0
}
```

### get Attendance By Id

```python
1. endpoint =     http://localhost:4000/attendance/find/64e55394669664747e3d2db1   "Or any port of your choice"
2. you provide an Authorization token in the headres

It will return an Array of objects like this:

{
    "_id": "64e55394669664747e3d2db1",
    "employee": "64e5536f669664747e3d2dac",
    "date": "2012-12-11T22:00:00.000Z",
    "status": "late",
    "createdAt": "2023-08-23T00:32:20.934Z",
    "updatedAt": "2023-08-23T00:32:53.750Z",
    "__v": 0
}
```

### get Attendance By Employee Id

```python

1. endpoint = http://localhost:4000/attendance/employee/64e55339dbdd0b01ad8db0fd  "Or any port of your choice"
2. you provide an Authorization token in the headres

3. it will return an object like this :
{
    "pagination": {
        "totalDocs": 4,
        "limit": 2,
        "totalPages": 2,
        "page": 2,
        "pagingCounter": 3,
        "hasPrevPage": true,
        "hasNextPage": false,
        "prevPage": 1,
        "nextPage": null
    },
    "attendance": [
        {
            "_id": "64e603f555aa1edd027a8261",
            "employee": "64e55339dbdd0b01ad8db0fd",
            "date": "2023-08-19T22:00:00.000Z",
            "status": "late",
            "createdAt": "2023-08-23T13:04:53.455Z",
            "updatedAt": "2023-08-23T13:04:53.455Z",
            "__v": 0
        },
        {
            "_id": "64e60cab55aa1edd027a8277",
            "employee": "64e55339dbdd0b01ad8db0fd",
            "date": "2023-08-22T22:00:00.000Z",
            "status": "late",
            "createdAt": "2023-08-23T13:42:03.402Z",
            "updatedAt": "2023-08-23T13:42:03.402Z",
            "__v": 0
        }
    ]
}
```

### delete Attendance

```python
1. endpoint =    http://localhost:4000/attendance/delete/64e5533adbdd0b01ad8db10c   "Or any port of your choice"
2. you provide an Authorization token in the headres

3. it will return an object like this :
{
    "message": "Attendance deleted successfully"
}
```

### Logout.

```python
1. endpoint =     http://localhost:4000/logout   "Or any port of your choice"
2. you provide an Authorization token in the headres

3. it will return an array of objects like this :
{
    "message":"Logout Successfully"
}
```
