import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9aGCvfRrmSz9jZ8o-Y58hDoXlGuIqQeU",
  authDomain: "shop-b5dc9.firebaseapp.com",
  projectId: "shop-b5dc9",
  storageBucket: "shop-b5dc9.appspot.com",
  messagingSenderId: "563442318508",
  appId: "1:563442318508:web:7d199ac4a25357ed51b309"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyA9aGCvfRrmSz9jZ8o-Y58hDoXlGuIqQeU",
//   authDomain: "shop-b5dc9.firebaseapp.com",
//   projectId: "shop-b5dc9",
//   storageBucket: "shop-b5dc9.appspot.com",
//   messagingSenderId: "563442318508",
//   appId: "1:563442318508:web:7f715359197e3f3c51b309"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);