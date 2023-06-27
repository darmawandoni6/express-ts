# express-ts

You can use this template when you're starting a new project. It contains general concepts, you can customize it according to your needs.

A boilerplate/starter project for quickly building RESTful APIs using TypeScript, Express, Sequelize, and sqlite3.

## Manual Installation

- git clone https://github.com/darmawandoni6/express-ts
- cd express-ts
- yarn install or npm install
- yarn dev or npm run dev

## tree

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
