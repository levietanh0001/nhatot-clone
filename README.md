
# About Project

A clone of the existing https://www.nhatot.com/ website

## Applied Technologies

### Frontend

- HTML, CSS, SASS (SCSS), Javascript, 
- React, Redux (Toolkit), Typescript
- MUI, Tanstack Query (React Query), React Hook Form, Yup

### Backend

- Node.js (Express), MySQL, Sequelize
- JWT Authentication
- socket.io, MongoDB, Mongoose
- Docker, Compose

## Features

- Products CRUD
- Favorite List
- Fulltext Search
- Chat App
- Admin Dashboard

# Demo 

http://levietanh0001.site/


## How To Run This Project With Docker and Compose

### Step 1. Setup

Replace `NODEMAILER_PASS` in `backend/env/.env.dev` with your own Gmail app password at https://myaccount.google.com/u/1/apppasswords

### Step 2. Run build script

**Notes** 
- The frontend container might need some minutes to finish starting the development server.
- Please patiently wait for all containers to go up without any errors!

#### Linux

Open new terminal tab:
```
chmod +x ./bin/dev-up-build.sh
./bin/dev-up-build.sh
```

#### Windows

```
npm install -g dotenv
dotenv -p ./.env.dev && docker compose -f ./docker-compose.dev.yml up --build
```

### Step 3. Start Express Server

Open new terminal tab:

```
cd ./backend
npm start
```


### Step 4. Seeding

Open new terminal tab:
#### Linux

```
chmod +x ./bin/seed-dev.sh
./bin/seed-dev.sh
```

#### Windows

```
cd ./backend
dotenv -p ../.env.dev && npm run seed-dev
```

### Step 5. Start React App

Open new terminal tab:
```
cd ./frontend
npm start
```

### Step 6. Navigate to website in local environment

Go to http://localhost:3000

### Step 7. Login as admin with the following credentials
- email: admin@admin.com
- password: admin_password
