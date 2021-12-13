import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

let firebaseConfig = {
  apiKey: "AIzaSyCOUtHV5x24FeJKp1klcDCdbhKBhZ5iE7w",
  authDomain: "gcv1-532dc.firebaseapp.com",
  projectId: "gcv1-532dc",
  storageBucket: "gcv1-532dc.appspot.com",
  messagingSenderId: "710766474505",
  appId: "1:710766474505:web:d7c05891d3f476e2044fd8",
  measurementId: "G-86T1SK0L7G"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export default firebase;