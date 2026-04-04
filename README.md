# express-ts

You can use this template when you're starting a new project. It contains general concepts, you can customize it according to your needs.

A boilerplate/starter project for quickly building RESTful APIs using TypeScript, Express, Prisma, and Postgres.

## Manual Installation

- git clone https://github.com/darmawandoni6/express-ts
- cd express-ts
- [please use node v24](#nvm-vesion)
- `yarn install` or `npm install` for install all d
- rename .env.example to .env
- `yarn migrate` or `npm run migrate` for sync
- `yarn generate` or `npm run generate` for generate type from prisma
- `yarn dev` or `npm run dev` for running this project

## Table of Contents

<!-- TABLE-OF-CONTENTS:START -->

- [Features](#features)
- [Project Structure](#project-structure)
- [NVM Setting for zsh](#nvm-setting-for-zsh)
- [API Endpoints](#api-endpoints)
<!-- TABLE-OF-CONTENTS:END -->

## [Features](#features)

<!-- FEATURES:START -->

- **SQL database**: using Postgres
- **ORM** : using [prisma](https://www.prisma.io/)
- **Authentication and authorization**: using [JWT](https://jwt.io/)
- **Logging**: using [morgan](https://github.com/expressjs/morgan)
- **Error handling**: error handling mechanism with specific result messages and codes
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv)
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
<!-- FEATURES:END -->

## [Project Structure](#project-structure)

```js
├── src
│  ├── common
│  │  ├── middlewares
│  │  ├── shared
│  │  └── utils
│  ├── config
│  ├── docs
│  ├── modules
│  ├── main.ts
│  └── app.ts
```

## [NVM Setting for zsh](#nvm-setting-for-zsh)

### Option 1: Use .nvmrc

Inside your project folder:

```bash
echo "24" > .nvmrc
```

Then manually run once:

```bash
source ~/.nvm/nvm.sh
nvm use
```

### Option 2: Auto-switch Node version when entering directory

Add this to your shell config:

#### ~/.zshrc

```bash
autoload -U add-zsh-hook

load-nvmrc() {
  if [ -f .nvmrc ]; then
    source ~/.nvm/nvm.sh
    nvm use
  fi
}

add-zsh-hook chpwd load-nvmrc
load-nvmrc
```

after that we need to run `source ~/.zshrc` to apply config

## [API Endpoints](#api-endpoints)

running the project and open swagger documentation

[Collection API by swagger - http://localhost:4000/docs](http://localhost:4000/docs)

List of available routes:

**Auth**:

- Register - POST /api/register
- Login - POST /api/login
