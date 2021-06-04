# LangChat

[![Netlify Status](https://api.netlify.com/api/v1/badges/a979763d-c45d-4ded-95b2-951f95e5dfb6/deploy-status)](https://app.netlify.com/sites/langchat/deploys)
[![langchat](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/9j4rei/main&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/9j4rei/runs)
[![blakes24](https://circleci.com/gh/blakes24/Language-Chat-backend.svg?style=shield)](https://app.circleci.com/pipelines/github/blakes24/Language-Chat-backend)

Live Site: [https://langchat.netlify.app/](https://langchat.netlify.app/)

Frontend Repo: [https://github.com/blakes24/language-chat-fe](https://github.com/blakes24/language-chat-fe)

Backend Repo: [https://github.com/blakes24/Language-Chat-backend](https://github.com/blakes24/Language-Chat-backend)

## Description
LangChat helps users improve their language skills by connecting them with other users that they can practice with. Users will list the languages they speak fluently and the languages they want to practice and they can filter other users by language to find practice partners.

## Features
* Join realtime one on one chats with other users to practice language skills
* View all other users including a bio, profile picture, the languages they speak or are learning and their approximate skill level 
* Filter other users by language to find partners that match the user's learning preferences
* Add another user as a partner to easily connect to the people they chat with the most
* Set status as active or away to let users know if you're available to chat
* Option to sign up and login using Google account, Facebook Account, or email/password

## Tests
* End to end tests with Cypress
	* `npm run dev` to start the backend server
	* `npm start` to start the frontend
	* `npx cypress open` to open Cypress, then click run
* `npm test` to run frontend unit tests with React Testing Library
* `npm test` to run backend tests with Jest

## Basic User Flow
* When user registers they will indicate their native language, and what language they want to practice
* When logged in a user can view the list of other users with short bio and the languages they speak and are learning
* A user can send a message to any user
* A user can add other users as a partner
* A user can edit or delete their profile

## API Documentation
SwaggerHub:
[https://app.swaggerhub.com/apis-docs/blakely/lang-chat-current/1.0](https://app.swaggerhub.com/apis-docs/blakely/lang-chat-current/1.0)
## Tech Stack
### Frontend
* React
* Redux
* Socket.io
* Material-UI

### Backend
* Node.js
* Express
* PostgreSQL
* Socket.io

