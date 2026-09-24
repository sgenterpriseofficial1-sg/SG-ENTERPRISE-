import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-storage.js";

export const firebaseConfig = {
  apiKey: "AIzaSyDhdlvtI-0dxH4wx0osv833ezZb-kdvN5s",
  authDomain: "sg-enterprise-4e6ed.firebaseapp.com",
  databaseURL: "https://sg-enterprise-4e6ed-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sg-enterprise-4e6ed",
  storageBucket: "sg-enterprise-4e6ed.firebasestorage.app",
  messagingSenderId: "184583700396",
  appId: "1:184583700396:web:3b5ee36e9d2374e0b9c409",
  measurementId: "G-4NC5559KL9"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
