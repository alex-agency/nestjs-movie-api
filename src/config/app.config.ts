import { registerAs } from '@nestjs/config';
import { AppConfig } from './app-config.type';

export default registerAs<AppConfig>('app', () => {
  return {
    nodeEnv: process.env.NODE_ENV || 'development',
    appName: process.env.APP_NAME || 'app',
    workingDirectory: process.cwd(),
    frontendDomain: 'http://localhost:3000',
    backendDomain: 'http://localhost:3000',
    appPort: process.env.APP_PORT ? parseInt(process.env.APP_PORT, 10) : 3000,
    fallbackLanguage: 'en',
    headerLanguage: 'x-custom-lang',
  };
});
