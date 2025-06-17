// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "@firebase/auth";
import {getFirestore} from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDb02-XGxW5zuSf6GrddBDl9iFtu60QMVw",
    authDomain: "test-insiders-c84b9.firebaseapp.com",
    projectId: "test-insiders-c84b9",
    storageBucket: "test-insiders-c84b9.firebasestorage.app",
    messagingSenderId: "234749193766",
    appId: "1:234749193766:web:79fdae6d8da14ed4fdc0e7",
    measurementId: "G-2P4MEZQH5N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const authUser = getAuth(app);