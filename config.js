import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDKPd_A_n95kHrh4pk7I9iITG-K9eFqg54",
    authDomain: "fir-auth-react-960c1.firebaseapp.com",
    projectId: "fir-auth-react-960c1",
    storageBucket: "fir-auth-react-960c1.appspot.com",
    messagingSenderId: "614950462876",
    appId: "1:614950462876:web:2318e9665d3abf1be3d459",
    measurementId: "G-SJZVBGTXNX"
  };

  if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

  export {firebase};