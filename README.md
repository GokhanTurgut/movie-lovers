# Movie Lovers

![Project Picture](https://i.ibb.co/2n9Q59k/movie-lovers.png)

Final project for Gusto &amp; RemoteTeam Node.js Bootcamp

Made by Gökhan Turgut

### [LIVE DEMO](https://hopeful-poitras-d26fa4.netlify.app/)

# Table Of Contents


- [Client](#client)
  - [Technologies](#technologies)
  - [Information](#information)
  - [Installation](#installation)
- [Server](#server)
  - [Technologies](#technologies-1)
  - [Information](#information-1)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation-1)
- [License](#license)

# Client

## Technologies

- React
- TypeScript
- React Router
- Redux
- Material UI
- Axios

## Information

Our client side is created with mobile first design and fully responsive layout.
In homepage we show the shared movies and actors of other users which can be viewed by anyone. In sign up page we have normal sign up method and additionally we have Google and Facebook sign in method both in sign up and sign in pages. After signing in users can add their favorite movies or actors which can be private or public. Users can also like or comment to movies or actors and in profile page they can view their liked movies or actors. Additional CRUD operations also can be made in profile page. For storing our user data in app wide state we use Redux as our state management tool. For deployment Netlify has been used and the link to the live project can be found at top.

## Installation

```
git clone git@github.com:GokhanTurgut/final-project.git
cd final-project/client
npm install
npm start
```

# Server

## Technologies

- NodeJS
- Express
- TypeScript
- MySQL
- TypeORM
- Passport
- Joi
- Jsonwebtoken

## Information

For backend we have used Express to create a REST API that our frontend can speak to through our endpoints. Main routes are authentication routes, public routes for shared movie and actor data, user route, movie route and actor route. Passport.js library has been used to configure Google and Facebook authentication and only JWT has been used to authenticate users without sessions to have stateless server which can easily be scaled.
Database tables and relations can be seen below in ER diagram:

![ER Diagram](https://i.ibb.co/XSbYCQ4/database-er-diagram.png)

TypeORM has been used as our ORM choice to create an abstraction layer to raw SQL queries. Joi library has been used to validate incoming client side data and respond with appropriate validation error messages.For deployment we have used Heroku and ClearDB as our MySQL cloud database.Below is the deployed REST API link for API testing.

### [Deployed API](https://gusto-movie.herokuapp.com/)

## Prerequisites

Required environment variables are:

```
PORT=< Port of your choice, when empty defaults to 5000 >
DATABASE_URL=< Host url of your database server >
DATABASE_PORT=< Port of your database server >
PRIVATE_KEY=< Private key for JWT token >
GOOGLE_CLIENT_ID=< Google Oauth id >
GOOGLE_CLIENT_SECRET=< Google Oauth secret >
FACEBOOK_APP_ID=< Facebook Oauth id >
FACEBOOK_APP_SECRET=< Facebook Oauth secret >
CLIENT_URL=< Client url address >
SERVER_URL=< Server url address >
```

## Installation

```
git clone git@github.com:GokhanTurgut/final-project.git
cd final-project/server
npm install
npm run build
npm start
```

For running "dev" or "ts" scripts you need to make the changes below to ormconfig.js file:

```
entities: ["src/entities/**/*.ts"],
migrations: ["src/migration/**/*.ts"],
subscribers: ["src/subscriber/**/*.ts"],
cli: {
  entitiesDir: "src/entities",
  migrationsDir: "src/migration",
  subscribersDir: "src/subscriber",
},
```

After making the necessary changes to use nodemon:

```
npm run dev
```

For ts-node:

```
npm run ts
```

# License

[MIT](./LICENSE)
