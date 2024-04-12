# Project Overview
This project employs the [Spotify Web API](https://developer.spotify.com/documentation/web-api) for conducting comprehensive global searches across Artists, Albums, and Tracks, play said tracks and display its lyrics on screen. It features both a frontend and backend components organized in a microservice structure, managing OAuth and JSON web tokens.
# Prerequisites 
- NodeJS >= v21.6.2
- NPM >= 10.2.4
- Chrome/Firefox/Safari/Edge >= Latest 2 major versions

# Other Considerations
Ports 3000 and 3001 must be open on host OS. To make sure no other applications are running on the same host, run the following command:
```
sudo lsof -i -P -n | grep LISTEN
```
If any applications are running on the same host, kill them with the following command:
```
sudo kill -9 <PID>
```

# Getting Started
 We will need to create a .env file in the root directory of the project. The .env file should contain the following: 
```
PORT=3000
CLIENT_ID="c2acd47d9c3f4a0f94ffc52f96c28e12"
CLIENT_SECRET=
REDIRECT_URI="http://localhost:3000"
```

After that step, we will install the node_modules with the following command:
```
npm install
```

# To run ReactJs
To run the frontend, we will need to run the following command:
```
cd client && npm start
```

# To Run ExpressJS
To run the backend, we will need to run the following command:
```
cd server && npm run dev
```

# Links
- [http://localhost:3000](http://localhost:3000) Link to the frontend of the application (ReactJS).

- [http://localhost:3001](http://localhost:3001) Link to the backend of the application (ExpressJS).

- [http://localhost:3001/login](http://localhost:3000/login) Endpoint to allow the user to login to the application.

- [http://localhost:3001/refresh](http://localhost:3001/refresh) Endpoint to refresh the access token that allows the user to make requests to the Spotify API.
