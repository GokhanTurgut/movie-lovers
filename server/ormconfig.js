module.exports = {
  type: "mysql",
  url: process.env.DATABASE_URL,
  // For local db
  database: process.env.DATABASE_NAME,
  //
  synchronize: true,
  logging: ["error", "warn", "info"],
  // Change below to run ts or dev scripts
  entities: ["src/entities/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};
