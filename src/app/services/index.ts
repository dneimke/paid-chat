import { dataServices } from './data-services';
import { appServices } from './application-services';

export const services = [...appServices, ...dataServices];

export * from './data-services';
export * from './application-services';
