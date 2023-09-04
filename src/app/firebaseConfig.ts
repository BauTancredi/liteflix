import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQwNMtlJj91EviblVA7Q19qIDLDVieuYM",
  authDomain: "liteflix-53422.firebaseapp.com",
  databaseURL: "https://liteflix-53422-default-rtdb.firebaseio.com",
  projectId: "liteflix-53422",
  storageBucket: "liteflix-53422.appspot.com",
  messagingSenderId: "1089787058132",
  appId: "1:1089787058132:web:52abb84630aa51199f6841",
};

const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;
