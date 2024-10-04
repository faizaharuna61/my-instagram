// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwZconoF7uZzlJhliGxLpfUeEROXyR5NY",
  authDomain: "instagram-da119.firebaseapp.com",
  projectId: "instagram-da119",
  storageBucket: "instagram-da119.appspot.com",
  messagingSenderId: "897836034789",
  appId: "1:897836034789:web:62e0276cd340d1a0c2c20c"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig): getApp();
const db = getFirestore();
const storage = getStorage();
const auth = getAuth(app);

export { app, db, storage, auth };








// import { initializeApp, getApps, getApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// import { getAuth } from "firebase/auth";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID
// };

// // Initialize Firebase
// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const db = getFirestore(app);
// const storage = getStorage(app);
// const auth = getAuth(app);

// export { app, db, storage, auth };







// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAwZconoF7uZzlJhliGxLpfUeEROXyR5NY",
//   authDomain: "instagram-da119.firebaseapp.com",
//   projectId: "instagram-da119",
//   storageBucket: "instagram-da119.appspot.com",
//   messagingSenderId: "897836034789",
//   appId: "1:897836034789:web:62e0276cd340d1a0c2c20c"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);






// // Import the functions you need from the SDKs you need
// import { initializeApp, getApps, getApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// import { getAuth } from "firebase/auth";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAwZconoF7uZzlJhliGxLpfUeEROXyR5NY",
//   authDomain: "instagram-da119.firebaseapp.com",
//   projectId: "instagram-da119",
//   storageBucket: "instagram-da119.appspot.com",
//   messagingSenderId: "897836034789",
//   appId: "1:897836034789:web:62e0276cd340d1a0c2c20c"
// };

// // Initialize Firebase
// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const db = getFirestore(app); // Initialize Firestore
// const storage = getStorage(app); // Initialize Storage
// const auth = getAuth(app); // Initialize Auth

// export { app, db, storage, auth };


