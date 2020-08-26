import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBQf0FW3hpWL2s41HhWaAm8RrsoFnJnfJ0",
    authDomain: "facebook-841d8.firebaseapp.com",
    databaseURL: "https://facebook-841d8.firebaseio.com",
    projectId: "facebook-841d8",
    storageBucket: "facebook-841d8.appspot.com",
    messagingSenderId: "227586232058",
    appId: "1:227586232058:web:d121f415f6d409364ec343",
    measurementId: "G-S3MC4ZJDKP"
  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();


  export  { db , auth , storage} ;