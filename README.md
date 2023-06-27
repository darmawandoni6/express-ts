# express-ts

You can use this template when you're starting a new project. It contains general concepts, you can customize it according to your needs.

A boilerplate/starter project for quickly building RESTful APIs using TypeScript, Express, Sequelize, and sqlite3.

## Manual Installation

- git clone https://github.com/darmawandoni6/express-ts
- cd express-ts
- yarn install or npm install
- yarn dev or npm run dev

## Table of Contents

<!-- TABLE-OF-CONTENTS:START -->
- [Features](https://github.com/darmawandoni6/express-ts#features)
- [Project Structure](https://github.com/darmawandoni6/express-ts#project-structure)
- [API Endpoints](https://github.com/darmawandoni6/express-ts#api-endpoint)
<!-- TABLE-OF-CONTENTS:END -->



## [Features](#features)

<!-- FEATURES:START -->
- **SQL database**: used sqlite3
- **Authentication and authorization**: using [JWT](https://jwt.io/)
- **Logging**: using [morgan](https://github.com/expressjs/morgan)
- **Error handling**: error handling mechanism with specific result messages and codes
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv)
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
<!-- FEATURES:END -->

## [Project Structure](#project-structure)

```js
src
 ┣ controllers
 ┃ ┣ auth.controller.ts
 ┃ ┗ role.controller.ts
 ┣ database
 ┃ ┣ storage
 ┃ ┃ ┗ development.sqlite3
 ┃ ┗ sequelize.ts
 ┣ models
 ┃ ┣ role.ts
 ┃ ┗ user.ts
 ┣ routes
 ┃ ┣ auth.ts
 ┃ ┗ role.ts
 ┣ utils
 ┃ ┣ bcrypt.ts
 ┃ ┣ env.t.ts
 ┃ ┣ handleError.ts
 ┃ ┣ jwt.ts
 ┃ ┗ server.ts
 ┗ main.ts
```

## [API Endpoints](#api-endpoint)

import collection API to like postman, thunder client, etc.

[Collection API](https://github.com/darmawandoni6/express-ts/blob/master/express-ts.json)

List of available routes:  
  
**Auth Routes**:
- Register - POST /api-v1/register
- Login - POST /api-v1/login

**Role Routes**:
- Edit User - PUT /api-v1/role
