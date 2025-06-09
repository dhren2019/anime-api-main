require('dotenv').config();

module.exports = {
  dialect: "postgresql",
  schema: "./configs/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL || ""
  }
};
