import * as functions from 'firebase-functions';
const admin = require('firebase-admin');
const stripe = require('stripe')(functions.config().stripe.token);


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
 response.send('Hello from Firebase!');
});


exports.createStripeCustomer = functions.auth.user().onCreate(async (user) => {
    const customer = await stripe.customers.create({email: user.email});
    return admin.firestore().collection('stripe_customers').doc(user.uid).set({customer_id: customer.id});
  });
