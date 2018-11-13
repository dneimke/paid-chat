import { Injectable } from '@angular/core';
import { LoggingLevel } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  loggingLevel: LoggingLevel = LoggingLevel.None;
  constructor() { }
}
