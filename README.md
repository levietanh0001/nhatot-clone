
# About Project

A clone of the existing nhatot.com website

# Demo 

http://levietanh0001.site/


## How To Run This Project With Docker and Compose

### Step 1. Run build script:

**Notes** 
- The frontend container might need some minutes to finish starting the development server.
- Please patiently wait for all containers to go up without any errors!

#### Linux

```
chmod +x ./dev-up-build.sh
./dev-up-build.sh
```

#### Windows

```
npm install -g dotenv
dotenv -p ./.env.dev && docker compose -f ./docker-compose.dev.yml up --build
```

### Step 2. Seeding:

#### Linux

```
chmod +x ./seed.sh
./seed.sh
```

#### Windows

```
cd ./backend
dotenv -p ../.env.dev && npm run seed
```

### Step 3. Go to localhost:3000

### Step 4. Login as admin with the following credentials
- email: admin@admin.com
- password: admin_password