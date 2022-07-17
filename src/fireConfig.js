// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCK3aY7TTC_9UGoihGEK9AlKSOlwogwTGI",
  authDomain: "firecommerce-11a08.firebaseapp.com",
  projectId: "firecommerce-11a08",
  storageBucket: "firecommerce-11a08.appspot.com",
  messagingSenderId: "671160118413",
  appId: "1:671160118413:web:716e51597c486353e786c4",
  measurementId: "G-PWLSQ0FSEF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const fireDB = getFirestore(app);

export default fireDB;
