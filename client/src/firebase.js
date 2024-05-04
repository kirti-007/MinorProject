import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyD7na1NCUSfBwTXN-p7EHvhsacKixepz-0",
    authDomain: "walkingpal-app.firebaseapp.com",
    projectId: "walkingpal-app",
    storageBucket: "walkingpal-app.appspot.com",
    messagingSenderId: "888519761777",
    appId: "1:888519761777:web:3bebcca302c3da1c2fe0d0",
    measurementId: "G-WVRKE7TX58"
  };

  firebase.initializeApp(firebaseConfig);
  let auth = firebase.auth();
  export { auth };