# Catoura
Welcome to the Catoura wiki!

This project is based off of [Quora](https://www.quora.com/) but for cats!

Catoura, a [Quora](https://www.quora.com/) clone, is a forum application that allow users to post questions and answers that can be viewed by other cats.

## Live Site

A Live deployment of [Catoura](https://catoura.herokuapp.com/) is hosted on [heroku](https://heroku.com)

## [Feature List](https://github.com/vernfongchao/Catoura/wiki/MVP-Feature-List)

List of features needed for the Minimum Viable Product (MVP)

## [User Stories](https://github.com/vernfongchao/Catoura/wiki/User-Stories)

List of user stories for each feature

## [API Documentation](https://github.com/vernfongchao/Catoura/wiki/API-Documentation)

API routes that return JSON and that will be used by the frontend routes


## [Database Schema](https://github.com/vernfongchao/Catoura/wiki/Database-Schema)

Schema of the PostgresQL database

## [Frontend Routes](https://github.com/vernfongchao/Catoura/wiki/Frontend-Routes)

Routes that return an HTML page that the user can interact with

## Screenshots

### Landing/Home Page:
![image](https://user-images.githubusercontent.com/91238232/163909142-3a5cada8-8377-4537-bd23-80516ea01314.png)

### My Questions:
![image](https://user-images.githubusercontent.com/91238232/163909200-064a1b10-2321-4682-9c09-043803cec9a8.png)

### My Answers:
![image](https://user-images.githubusercontent.com/91238232/163909296-1ce48465-6de0-4e57-a2c0-f75a038b6317.png)

### My Topics:
![image](https://user-images.githubusercontent.com/91238232/163909319-bda2905d-556d-4e86-9049-e88c3c44f442.png)

## Features

- Full CRUD Features for Questions
- Full CRUD Features for Answers to a Question
- Full CRUD features for Comments to an Answer
- CRUD features for Topics and allowing questions to add Topics

### Future Features

- CRUD features for upvote and downvotes on question,answers, and comments
- Setup AWS for Images for Answer and Questions
- Rich Text Libraries for fancy text fields

## Technologies Used

- React.js
- Node.js
- Express
- PostgreSQL
- PUG

## Local Installation

1. Clone this repo

   - `git clone https://github.com/vernfongchao/Catoura.git`

2. Install dependencies from the root directoy

   - `npm install`

3. Create a `PostgreSQL` user with `CREATEDB` and `Password` 

   - `CREATE USER <name> with CREATEDB PASSWORD <'password'>`

4. Create a `.env` in the backend directory based on the `.env.example` found within the backend directory

5. Enter your username and password information into your `.env` file along with your desired database name, a secured combination of characters for your `SESSION_SECRET`

6. CREATE Database,Migrate, and Seed models in your backend terminal 

   Method 1
   
   - `npx dotenv sequelize db:create`
   - `npx dotenv sequelize db:migrate`
   - `npx dotenv sequelize db:seed:all`

   Method 2
   
   - `npm run db:setup`

7. Start the server in the terminal

   - `npm start`

8. There is a Demo user or create an account to begin using MvDc


