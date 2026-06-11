export default () => ({
  app: {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || 3000,
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    name: process.env.DB_NAME || 'fullstack_db',
  },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || 'access-secret',
    accessExpiration: process.env.JWT_ACCESS_EXPIRATION || '15m',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'refresh-secret',
    refreshExpiration: process.env.JWT_REFRESH_EXPIRATION || '7d',
  },
});
