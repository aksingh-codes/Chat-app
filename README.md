# Chat app

## Backend

1. Change into backend directory 
    - `cd backend/`
2. Install dependencies
    - `npm install`
3. Create Environment variables
    - `touch .env`
    - add these variables in .env file
        - CLIENT_URL=**** CLIENT_URL_HERE ****
        - DB_URL=**** MONGO_DB_URL_HERE ****
4. Install nodemon if not already
    - `npm install nodemon --save-dev`
5. Start the server
    - `npm run dev`

## Frontend

1. Change into frontend directory
    - `cd frontend`
2. Install dependencies
    - `npm install`
3. Create Environment variables
    - `touch .env`
    - add these variables in .env file
        - REACT_APP_SERVER_URL=**** SERVER_URL_HERE ****
4. Start the client server
    - `npm start`