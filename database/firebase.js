import firebase from 'firebase'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyDQvSOWFNuMXlB-9MxCkgX8FOFWb6u7naw",
    authDomain: "sistemagestaometrologica.firebaseapp.com",
    projectId: "sistemagestaometrologica",
    storageBucket: "sistemagestaometrologica.appspot.com",
    messagingSenderId: "289659494458",
    appId: "1:289659494458:web:01d9e476934c87aae39503",
    measurementId: "G-8RMTT7HQX7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  export default {
      firebase,
      db,

  }


  