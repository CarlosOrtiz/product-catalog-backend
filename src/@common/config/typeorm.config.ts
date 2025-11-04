import { registerAs } from '@nestjs/config';

export default registerAs('typeorm', () => {
  const pathEntities = ['dist/entities/**/*.js'];

  const configDefault = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    ssl: process.env.NODE_ENV !== 'develop' ? { rejectUnauthorized: false } : undefined,
  };

  return {
    catalogDb: {
      ...configDefault,
      name: 'catalogDb',
      entities: pathEntities.map((path) => path.replace('{schema}', 'catalogDb')),
    }
  };
});
