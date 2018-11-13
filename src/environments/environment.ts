// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBZuQs251wz3UJWqFKqCfnuSX6zDuM-fkU',
    authDomain: 'djn-paid-chat.firebaseapp.com',
    databaseURL: 'https://djn-paid-chat.firebaseio.com',
    projectId: 'djn-paid-chat',
    storageBucket: 'djn-paid-chat.appspot.com',
    messagingSenderId: '1000738106995'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
