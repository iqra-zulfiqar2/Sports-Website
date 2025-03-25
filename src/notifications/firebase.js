// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD53aGhX8tIfwhKtZsRhRPTyZqsDEsa7E4",
  authDomain: "pushnotifications-a13a0.firebaseapp.com",
  projectId: "pushnotifications-a13a0",
  storageBucket: "pushnotifications-a13a0.firebasestorage.app",
  messagingSenderId: "989285140765",
  appId: "1:989285140765:web:7f67c99d9929a115f7f9f4",
  measurementId: "G-1SJWFL5DXJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
const messaging = getMessaging(app);

export { messaging };


export const generateToken = async () => {
    const permission = await Notification.requestPermission();
    console.log(permission);
    if(permission === "granted"){
        const token = await getToken(messaging, {
            vapidKey: "BEFGv0VYOLZR0ylKpn_68ax5yEWMNCp-kns7Wf06qUkxW6dkbut07DcOHZ439ImKcTYHGJljCE_dAYQ8MaeugNM"
        });
        console.log(token);
    }
};
