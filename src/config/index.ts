//env: development, production
const NODE_ENV = process.env.NODE_ENV;
const isProduction = NODE_ENV === "production";
const isDevelopment = NODE_ENV === "development";

export const app_db_connect_string = process.env.APP_DB || "";

export const app_secret = process.env.SERVER_SECRET || "";
