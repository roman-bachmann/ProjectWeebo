# ProjectWeebo
TDT4140 - Software Engineering Project, Group 32

Authors: Emil Eyser Grip, Roman Christian Bachmann, Sølve Robert Bø Hunvik, Thayanan Tharmapalan

### About

This is the semester project from the NTNU course TDT4140 Software Engineering, spring 2017. The goal of the project is to build a software bot that revolutionizes the learning experience.

The webpage is built on React, using node.js as the API backend and a mysql server hosted by NTNU. For authentication, auth0 is used.

### How to install

- Make sure you have node.js installed
- Clone this repository
- Navigate to the project root folder: "cd ProjectWeebo"
- Run "npm i"
- Navigate to the client folder: "cd client"
- Run "npm i"

### How to run

- Navigate to the project root folder again: "cd .."
- Make sure you are in the NTNU network, either physically or via VPN
- To start a developer server:
  - Run "npm start"
  - Navigate to localhost:3000 in your browser
- To build for production:
  - Navigate to the client folder: "cd client"
  - Run "npm run build"

### Running tests
- Navigate to the client folder: "cd client"
- Run "npm test -- --coverage"
- The coverage can be found in the command line output and in the client/coverage/ folder
