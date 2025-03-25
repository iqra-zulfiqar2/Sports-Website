// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.

import { IoPlayOutline } from "react-icons/io5";

// Replace 10.13.2 with latest version of the Firebase JS SDK.
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyD53aGhX8tIfwhKtZsRhRPTyZqsDEsa7E4",
    authDomain: "pushnotifications-a13a0.firebaseapp.com",
    projectId: "pushnotifications-a13a0",
    storageBucket: "pushnotifications-a13a0.firebasestorage.app",
    messagingSenderId: "989285140765",
    appId: "1:989285140765:web:7f67c99d9929a115f7f9f4",
    measurementId: "G-1SJWFL5DXJ"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();


messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.image,
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });