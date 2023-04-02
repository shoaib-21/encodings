// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyBOfpBDUufV2Gi3aHhA2lDxxAclOmMFQ3w",
//   authDomain: "userdb-1db19.firebaseapp.com",
//   projectId: "userdb-1db19",
//   storageBucket: "userdb-1db19.appspot.com",
//   messagingSenderId: "895075055085",
//   appId: "1:895075055085:web:3fd73819d326726e4463e4",
//   measurementId: "G-1N9F026KHK",
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);

// export const db = getFirestore(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRa7NCJZbHJjok6eUanYCj6qyGfwDsQJs",
  authDomain: "user-login-register-d16ab.firebaseapp.com",
  projectId: "user-login-register-d16ab",
  storageBucket: "user-login-register-d16ab.appspot.com",
  messagingSenderId: "500860247016",
  appId: "1:500860247016:web:f0ebb3c5e3ffa34a16e25d",
  measurementId: "G-F2G0W9KPWV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);