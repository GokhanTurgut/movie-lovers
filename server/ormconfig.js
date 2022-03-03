module.exports = {
  type: "mysql",
  url: process.env.DATABASE_URL,
  // database: process.env.DATABASE_NAME, // For local db
  synchronize: true,
  logging: ["error", "warn", "info"],
  // Change below to run ts or dev scripts
  entities: ["build/entities/**/*.js"],
  migrations: ["build/migration/**/*.js"],
  subscribers: ["build/subscriber/**/*.js"],
  cli: {
    entitiesDir: "build/entities",
    migrationsDir: "build/migration",
    subscribersDir: "build/subscriber",
  },
};
