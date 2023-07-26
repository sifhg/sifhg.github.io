import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from  "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

// Your web app's Firebase configuration
const CONFIG = {
    apiKey: "AIzaSyDnrO6FHN4tb5unnbNEAhXv9UfwsZLhsgo",
    authDomain: "sif-city-view-counter.firebaseapp.com",
    projectId: "sif-city-view-counter",
    storageBucket: "sif-city-view-counter.appspot.com",
    messagingSenderId: "627953674704",
    appId: "1:627953674704:web:a3c38c121cb7895c77f1d5"
  };

// Initialize Firebase
const APP = initializeApp(CONFIG);

//Obtain authentication instance app.
const AUTH = getAuth(APP);

onAuthStateChanged(AUTH, user => {
    if(user != null) {
        console.log("logged in!");
    }else {
        console.log("No user.")
    }
});

sessionStorage.setItem("title", document.querySelector("title").innerText);

if(!sessionStorage.getItem("session-start")) {
    sessionStorage.setItem("session-start", new Date());
}

const SESSION_DATA = {
    title: document.querySelector("title").innerText,
    webLocation: document.URL,
    time: new Date(),
    previous: document.referrer,
    sessionStart: sessionStorage.getItem("session-start"),
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
}

console.log(SESSION_DATA);