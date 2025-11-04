import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  appPort: +process.env.PORT,
  appEnv: process.env.NODE_ENV,
}));
