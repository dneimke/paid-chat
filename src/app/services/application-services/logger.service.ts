import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { LoggingLevel } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  private _level: LoggingLevel = LoggingLevel.Warnings;

  constructor(config: ConfigService) {
    if (config.loggingLevel) {
      this._level = config.loggingLevel;
    }
  }

  log(message: any, level = LoggingLevel.Warnings, ...optionalParams: any[]) {
    if (this.shouldLog(level)) {
      switch (level) {
        case LoggingLevel.Errors:
          console.error(message, optionalParams);
          break;
        case LoggingLevel.Warnings:
          console.warn(message, optionalParams);
          break;
        case LoggingLevel.Info:
          // tslint:disable-next-line:no-console
          console.info(message, optionalParams);
          break;
        default:
          // tslint:disable-next-line:no-console
          console.debug(message, optionalParams);
      }
    }
  }

  logError(message: any, ...optionalParams: any[]) {
    this.log(message, LoggingLevel.Errors, optionalParams);
  }

  logWarning(message: any, ...optionalParams: any[]) {
    this.log(message, LoggingLevel.Warnings, optionalParams);
  }

  logInfo(message: any, ...optionalParams: any[]) {
    this.log(message, LoggingLevel.Info, optionalParams);
  }

  logVerbose(message: any, ...optionalParams: any[]) {
    this.log(message, LoggingLevel.Verbose, optionalParams);
  }

  private shouldLog(level: LoggingLevel) {
    if (this._level === LoggingLevel.None) {
      return false;
    } else if (this._level === LoggingLevel.Errors) {
      return level === LoggingLevel.Errors;
    } else if (this._level === LoggingLevel.Warnings) {
      return level === LoggingLevel.Errors || level === LoggingLevel.Warnings;
    } else if (this._level === LoggingLevel.Info) {
      return level === LoggingLevel.Errors || level === LoggingLevel.Warnings || level === LoggingLevel.Info;
    } else {
      return true;
    }
  }
}
