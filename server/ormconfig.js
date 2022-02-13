module.exports = {
  type: "mysql",
  url: process.env.DATABASE_URL,
  // database: process.env.DATABASE_NAME, // For local db
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
