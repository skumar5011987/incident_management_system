# Incident Management System (IMS)
 This is a Django-DRF + ReactJS based Incident Management System that allows users to create/view/edit the incidents.


# Features
 1. User Login.
 2. User Registration.
 3. Forget password.
 4. Create Incident.
 5. View Incident.
 6. Edit Incident.
 7. Logout.


## Table of Contents
 1. Technologies Used
 2. Installation and Setup
 3. API Endpoints


## Technologies Used

 1. Python: 3.12
 2. Django==5.1.7
 3. djangorestframework==3.16.0
 4. djangorestframework_simplejwt==5.5.0
 5. PyMySQL==1.1.1
 

## Installation and Setup
 
 > Unzip the project folder

 > cd IMS && cd backend

 > Create virtual environment
  - First Install Virtual Environment (if not installed)
   - sudo apt update  # For Debian-based systems (Ubuntu, etc.)
   - sudo apt install python3-venv -y
   - python3 -m venv venv

 > Activate the environment
  - source venv/bin/activate
  - Once activated, you will see (venv) at the beginning of your terminal prompt.

 > Install Dependencies
  - pip install -r requirements.txt

 > Install MySQL in your device(inf not installed)
  - create a database
  - update the database, user, password, host, and post value according to you in your projects settings.py file.

 > Run migrations
  - python manage.py makemigrations
  - python manage.py migrate

 > Start the development server
  - python manage.py runserver


## API Endpoints

1.  User Registration

- URL: http://localhost:8000/api/auth/sign-up/
- Method: POST

### Request Body:
```json
{
  "address": "om apartment, chakkarpur",
  "city": "Gurgaon",
  "confirmPassword": "123456",
  "country": "India",
  "email": "mohan@test.com",
  "fax": "",
  "first_name": "Mohan",
  "last_name": "yadav",
  "mobile": "916688223311",
  "password": "123456",
  "phone": "",
  "pincode": "122002",
  "state": "Haryana",
  "type": "individual",
}
```

### Rsponse:

```json
{
  "address": "om apartment, chakkarpur",
  "city": "Gurgaon",
  "confirmPassword": "123456",
  "country": "India",
  "email": "mohan@test.com",
  "fax": "",
  "first_name": "Mohan",
  "last_name": "yadav",
  "mobile": "916688223311",
  "password": "123456",
  "phone": "",
  "pincode": "122002",
  "state": "Haryana",
  "type": "individual",
}
```

2. Login

 - URL: http://localhost:8000/api/auth/login/
 - Method: POST
### Request Body:
```json
{ 
  "emai":"mark@test.com",
  "password":"123456"
}
```
### Rseponse:
```json
{
    "user": {
        "id": 4,
        "type": "government",
        "first_name": "yogesh",
        "last_name": "kumar",
        "email": "yogi@test.com",
        "address": "kanpur city",
        "country": "India",
        "state": "UP",
        "city": "kanpur",
        "pincode": "224521",
        "mobile": "916699885544",
        "fax": null,
        "phone": null
    },
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0MzUwNTI4OSwiaWF0IjoxNzQzNDE4ODg5LCJqdGkiOiI1MTM1YmUyNDRkMGE0NTdjYjQ2NGFjZjFkZWFjOTFkNSIsInVzZXJfaWQiOjR9.zkB6YiGK5N4HzPttqpUQrMWmylsGeuwVVtt2L17LrJY",
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQzNDE5MTg5LCJpYXQiOjE3NDM0MTg4ODksImp0aSI6IjJhOTU1Y2E3N2QxYTQ0NjhhOTQ5NzFiZmQzMGQzMDM1IiwidXNlcl9pZCI6NH0._b8UNiYEFIhiIOHPmdNs5UcWBzYvZveVqa3fQhrhoQQ"
}
```

3. Create Incidents

 - URL : http://localhost:8000/api/incidents/
 - Method : POST
 - Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQzNDE5MTg5LCJpYXQiOjE3NDM0MTg4ODksImp0aSI6IjJhOTU1Y2E3N2QxYTQ0NjhhOTQ5NzFiZmQzMGQzMDM1IiwidXNlcl9pZCI6NH0._b8UNiYEFIhiIOHPmdNs5UcWBzYvZveVqa3fQhrhoQQ'

### request body
```json
{
"details": "test details create flow",
"priority": "low",
"status": "open",
"title": "Test incident",
"type": "enterprise",
}
```
### response
```json
{
  "details": "test details create flow",
"incident_id": "RMG941672025",
"priority": "low",
"reported_at": "2025-03-31T11:05:06.682377Z",
"reporter": 4,
"reporter_email": "yogi@test.com",
"reporter_name": "yogesh kumar",
"reporter_phone": "null",
"status": "open",
"title": "Test incident",
"type": "enterprise"
}

```

4. Get single incident (search instance by ID)

 - URL: http://localhost:8000/api/incident/${incident_id}/
 - Method: GET
 - Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQzNDE5MTg5LCJpYXQiOjE3NDM0MTg4ODksImp0aSI6IjJhOTU1Y2E3N2QxYTQ0NjhhOTQ5NzFiZmQzMGQzMDM1IiwidXNlcl9pZCI6NH0._b8UNiYEFIhiIOHPmdNs5UcWBzYvZveVqa3fQhrhoQQ'

 ### Rsponse:
 ```json
 {
  {
    "incident_id":"RMG941672025",
    "reporter_name":"yogesh kumar",
    "reporter_email":"yogi@test.com",
    "reporter_phone":null,
    "title":"Test incident",
    "details":"test details create flow",
    "type":"enterprise",
    "status":"open",
    "priority":"low",
    "reported_at":"2025-03-31T11:05:06.682377Z",
    "reporter":4}
 }
 ```

5. Get all incidents

 - URL: http://localhost:8000/api/incidents/
 - Method: GET
 - Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQzNDE5MTg5LCJpYXQiOjE3NDM0MTg4ODksImp0aSI6IjJhOTU1Y2E3N2QxYTQ0NjhhOTQ5NzFiZmQzMGQzMDM1IiwidXNlcl9pZCI6NH0._b8UNiYEFIhiIOHPmdNs5UcWBzYvZveVqa3fQhrhoQQ'

### Rsponse
```json
[
  {

    "incident_id":"RMG573502025",
    "reporter_name":"sailesh kumar",
    "reporter_email":"sailesh.18738@knit.ac.in",
    "reporter_phone":null,
    "title":"Toxic Waste Spill Near Water Reservoir",
    "details":"A chemical spill near the city's primary water reservoir has raised health and safety concerns. Authorities have started an environmental impact assessment.",
    "type":"government",
    "status":"in_progress",
    "priority":"high",
    "reported_at":"2025-03-30T13:38:51.901143Z",
    "reporter":2
  },
  {
    "incident_id":"RMG799282025",
    "reporter_name":"sailesh kumar",
    "reporter_email":"sailesh.18738@knit.ac.in",
    "reporter_phone":null,
    "title":"Public Demonstration at City Hall",
    "details":"Citizens gathered at City Hall to protest against the new taxation policy. Police have been",
    "type":"government",
    "status":"open",
    "priority":"medium",
    "reported_at":"2025-03-30T13:40:17.563821Z",
    "reporter":2
    }
  ]
```

6. Update Incident

 - URL: http://localhost:8000/api/incident/${incident_id}/
 - Method: POST
 - Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQzNDE5MTg5LCJpYXQiOjE3NDM0MTg4ODksImp0aSI6IjJhOTU1Y2E3N2QxYTQ0NjhhOTQ5NzFiZmQzMGQzMDM1IiwidXNlcl9pZCI6NH0._b8UNiYEFIhiIOHPmdNs5UcWBzYvZveVqa3fQhrhoQQ'

 ### request Body
 ```json
{
  "details":"A chemical spill near the city's primary water reservoir has raised health and safety concerns. Authorities have ,started an environmental impact assessment.",
  "incident_id":"RMG573502025",
  "priority":"high",
  "reported_at":"2025-03-30T13:38:51.901143Z",
  "reporter":2,
  "reporter_email":"sailesh.18738@knit.ac.in",
  "reporter_name":"sailesh kumar",
  "reporter_phone":null,
  "status":"closed",
  "title":"Toxic Waste Spill Near Water Reservoir",
  "type":"government",
}
 ```

7. Forget Password
- URL: http://localhost:8000/api/auth/forget-password/
- Method: POST
- Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQzNDE5MTg5LCJpYXQiOjE3NDM0MTg4ODksImp0aSI6IjJhOTU1Y2E3N2QxYTQ0NjhhOTQ5NzFiZmQzMGQzMDM1IiwidXNlcl9pZCI6NH0._b8UNiYEFIhiIOHPmdNs5UcWBzYvZveVqa3fQhrhoQQ'

### Request body
```json
{
  "email": "sailesh.18738@knit.ac.in"
}
```
### Response:
```json
{
"message":"Password reset email sent.",
}
```
#### None:
 > An Email is sent to youe email id, check the inbox or in spam and click the forget password confirme link present in the email.

8. Forget Password Confirm

- URL: http://localhost:8000/api/auth/forget-password-confirm/
- Method: POST
- Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQzNDE5MTg5LCJpYXQiOjE3NDM0MTg4ODksImp0aSI6IjJhOTU1Y2E3N2QxYTQ0NjhhOTQ5NzFiZmQzMGQzMDM1IiwidXNlcl9pZCI6NH0._b8UNiYEFIhiIOHPmdNs5UcWBzYvZveVqa3fQhrhoQQ'

### Request body
```json
{
  "confirm_password":"654321",
  "new_password":"654321",
  "token":"cnjgld-d18076d77368f83803f65df93e9bb9ea",
  "uid":"Mg",
}
```
### Response:
```json
{
"message": "Password successfully reset."
}
```
