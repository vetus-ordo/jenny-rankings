// firebase.ts
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBL_LW8XvZ_deC7E-0MY_mTe2av0kTFsCI",
  authDomain: "jenny-rankings.firebaseapp.com",
  databaseURL: "https://jenny-rankings-default-rtdb.firebaseio.com", // Make sure this URL is correct from your Realtime Database dashboard
  projectId: "jenny-rankings",
  storageBucket: "jenny-rankings.firebasestorage.app", // Using your original, correct value
  messagingSenderId: "865979605682",
  appId: "1:865979605682:web:deac0e51b374408b391fab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the database instance for your pages to use
export const database = getDatabase(app);