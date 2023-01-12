import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBWWQtYioQzMjnxA7oWcP_3yN66UtIkM2A",
  authDomain: "rmc-employee.firebaseapp.com",
  databaseURL: "https://rmc-employee-default-rtdb.firebaseio.com",
  projectId: "rmc-employee",
  storageBucket: "rmc-employee.appspot.com",
  messagingSenderId: "497961924911",
  appId: "1:497961924911:web:fd6b2a17325379ac5c49da",
  measurementId: "G-DX9TM7EFXH",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)
