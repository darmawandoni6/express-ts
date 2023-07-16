# express-ts

You can use this template when you're starting a new project. It contains general concepts, you can customize it according to your needs.

A boilerplate/starter project for quickly building RESTful APIs using TypeScript, Express, Sequelize, and sqlite3.

## Manual Installation

- git clone https://github.com/darmawandoni6/express-ts
- cd express-ts
- yarn install or npm install
- yarn sync or npm run sync (for sync database)
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
- **ORM** : used [sequelize](https://sequelize.org/docs/v6/getting-started/)
- **Authentication and authorization**: using [JWT](https://jwt.io/)
- **Logging**: using [morgan](https://github.com/expressjs/morgan)
- **Error handling**: error handling mechanism with specific result messages and codes
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv)
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
<!-- FEATURES:END -->

## [Project Structure](#project-structure)

```js
src
 ┣ databases
 ┃ ┣ sqlite
 ┃ ┃ ┗ development.sqlite3
 ┃ ┣ sequelize.ts
 ┃ ┗ sync.ts
 ┣ middleware
 ┃ ┗ handlingError.ts
 ┣ modules
 ┃ ┣ role
 ┃ ┃ ┣ controller.ts
 ┃ ┃ ┣ interface.ts
 ┃ ┃ ┣ model.ts
 ┃ ┃ ┣ routes.ts
 ┃ ┃ ┣ services.ts
 ┃ ┃ ┗ validation.ts
 ┃ ┗ user
 ┃ ┃ ┣ controller.ts
 ┃ ┃ ┣ interface.ts
 ┃ ┃ ┣ model.ts
 ┃ ┃ ┣ routes.ts
 ┃ ┃ ┣ services.ts
 ┃ ┃ ┗ validation.ts
 ┣ utils
 ┃ ┣ bcrypt.ts
 ┃ ┗ jwt.ts
 ┗ main.ts
```

## [API Endpoints](#api-endpoint)

import collection API to like postman, thunder client, etc.

[Collection API](https://github.com/darmawandoni6/express-ts/blob/master/express-ts.json)

List of available routes:

**User**:

- Register - POST /api-v1/register
- Login - POST /api-v1/login
- Get By Token - GET /api-v1/user
- Update - PUT /api-v1/user
- Remove - DELETE /api-v1/user

**Role**:

- Create Role - POS /api-v1/role
- Edit Role - PUT /api-v1/role/:id
- Remove Role - PUT /api-v1/role/:id
