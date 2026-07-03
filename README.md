# Mean-To-The-Bone CMS

A minimal **MEAN stack CMS** (MongoDB, Express, Angular, Node) for managing users, pages, headers, and footers.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.5.

## Stack
* Angular 5
* ExpressJS
* Node 8+
* MongoDB

## Features
* REST API for users, pages, headers, and footers
* Angular admin UI with create, edit, and delete for all content types
* MongoDB models with created/updated timestamps

## Run locally

1. Start MongoDB
2. Install dependencies: `npm install` or `yarn`
3. Start the API: `node server.js`
4. In another terminal, start the frontend with API proxy: `npm run proxy`
5. Open `http://localhost:4200`

## API

| Resource | Endpoints |
|----------|-----------|
| Users | `GET/POST /api/users`, `PUT /api/users`, `DELETE /api/users/:id` |
| Pages | `GET/POST /api/pages`, `PUT /api/pages`, `DELETE /api/pages/:id` |
| Headers | `GET/POST /api/headers`, `PUT /api/headers`, `DELETE /api/headers/:id` |
| Footers | `GET/POST /api/footers`, `PUT /api/footers`, `DELETE /api/footers/:id` |

## TODOS
1. Add User Authentication
2. Replace Callbacks/Promises with Async/Await functions
3. APIs/Models to revisit
