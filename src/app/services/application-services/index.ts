import { ConfigService } from './config.service';
import { LoggerService } from './logger.service';

export const appServices = [ ConfigService, LoggerService ];

export * from './config.service';
export * from './logger.service';
