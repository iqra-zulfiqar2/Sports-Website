// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { getDatabase, ref, set, get, child } from "firebase/database";


// Your web app's Firebase configuration
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
const database = getDatabase(app); // Initialize Firebase Realtime Database

export { messaging, database };

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

// Function to get the votes data from Firebase
export const getVotes = async () => {
  const dbRef = ref(database);
  try {
    const snapshot = await get(child(dbRef, "votes"));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return { team1: 0, team2: 0 }; // If no votes are found, return 0 for both teams
    }
  } catch (error) {
    console.error("Error getting votes: ", error);
    return { team1: 0, team2: 0 };
  }
};

// Function to update the votes in Firebase
export const updateVotes = (votes) => {
  const votesRef = ref(database, 'votes');
  set(votesRef, votes);
};
