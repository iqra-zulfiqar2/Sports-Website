// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwUy2BG_spa2ARbhUrgPu1wSB3Rp16Axs",
  authDomain: "pushnotifications-da431.firebaseapp.com",
  projectId: "pushnotifications-da431",
  storageBucket: "pushnotifications-da431.firebasestorage.app",
  messagingSenderId: "1043585772694",
  appId: "1:1043585772694:web:ef277f2c97b8e9213ae6b7",
  measurementId: "G-4F1D9X3H84"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider()



export { messaging };

export const generateToken = async () => {
  const permission = await Notification.requestPermission();
  console.log(permission);
  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey: "BMH7FCxtqdP-JXxz4kmW_HR5bUZUYVVZj5BS0c9mjYYjAPQTwnsWYb-2bn1ysvtGKZuJQcbJgnAsvHgTgiFn3sw"
    });
    console.log(token);
  }
};
