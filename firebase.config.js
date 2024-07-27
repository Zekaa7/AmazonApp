// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDouORSPFVGS_fq5yN0pKCAmOpdBIPw9mA",
  authDomain: "app-e4673.firebaseapp.com",
  projectId: "app-e4673",
  storageBucket: "app-e4673.appspot.com",
  messagingSenderId: "161685654072",
  appId: "1:161685654072:web:1b618bf379e89f0702b4cd",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);

const storage = getStorage(app);

export { app, db, storage };
