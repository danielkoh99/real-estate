declare namespace NodeJS {
 interface ProcessEnv {
  NODE_ENV: string;
  PORT: string;
  JWT_SECRET: string;
  DB_NAME: string;
  DB_HOST: string;
  DB_PORT: string;
  DB_USER: string;
  DB_PASSWORD: string;
  SERVER_URL: string;
  FRONTEND_URL: string;
  GMAIL_USER: string;
  GMAIL_PASS: string;
 }
}
