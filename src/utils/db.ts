import ServerlessClient from "serverless-postgres";

const client = new ServerlessClient({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  debug: true,
  delayMs: 3000,
  ssl: true,
});

const db = <T>(cb: (client: ServerlessClient) => T): T => {
  client.connect();
  const result = cb(client);
  client.clean();
  return result;
};

export default db;
