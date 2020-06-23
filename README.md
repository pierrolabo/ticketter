# Ticketter
A simple ticket management system 

##  stack
  - Redux
  - NodeJS
  - MongoDB
  - React
  - JWT
  - Bootstrap (react-strap)
# Try it
 See the demo =>  https://ticketter-demo.herokuapp.com/
 Go the the login section and log as a predefined user demo or register an account
# How it works
- The API built on express use JSON web token
- The front is built on react with redux to manage the state and make API call

##  User Roles
### ADMIN
  - Can CREATE a Project
  - Can EDIT a Project
  - Can CREATE and ATTRIBUTE Ticket
  - Can EDIT a User or a Ticket
  - Has access to all users, tickets and projects no matter what
  - The ADMIN role can attribute a project to a PROJECT MANAGER
### PROJECT MANAGER
  - Can CREATE a ticket or a project
  - Has access to only users that are part of he's attributed projects
  - Can Manage User Roles only to users that are parts of he's projects
### Developer 
  - Can CREATE a ticket
  - Has only access to projects he's part of
  - Can answer a ticket
  - Can set a ticket to complete
  - Can reassign a ticket
  - Can see a quick brief of a project he's part of with a user list  
##  ClIENT/USER
    - Has only access to projects he's part of
    - Can create a ticket
    - Can see a quick brief of a project he's part of with a user list
##  Projects
  - A project has a name and a description
  - A project contain a user list which says who can work on it
### The GENERAL project
  - Every registered USER is part of the GENERAL project
  - If you want to make a USER private, just remove him from the GENERAL project
##  Tickets
  - A ticket is part of a project
  - A ticket contains answers
  - USER is the only one role who can't delete an answer
  - A ticket can be assigned to someone
  - A ticket has a a status (NEW, IN PROGRESS, URGENT, UNRESOLVED)
  - When someone answer a ticket that is not URGENT, the ticket is set to IN PROGRESS
  - If a ticket is set as URGENT, the status wont change if someone answer it
##  Installation
  - You need a mongoDB instance to run this project
  - Update default.json in /config to set your Mongo Database address
  - Clone this repository then install the dependencies inside the "/" and "/client" with "npm install"
  - Start start with "npm run dev"
  - The first USER registered doesnt get the ADMIN role, so you need to connect to your mongoDB instance to reatribute the role to "ADMIN"
