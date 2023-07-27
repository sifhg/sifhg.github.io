import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from  "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import  { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

if(window.self == window.top) {

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

    //Obtain authentication instance app, to check if the app works
    const AUTH = getAuth(APP);

    onAuthStateChanged(AUTH, user => {
        if(user != null) {
            console.log("logged in!");
        }else {
            console.log("No user.")
        }
    });

    // Initialize Cloud Firestore and get a reference to the service
    const DB = getFirestore(APP);

    //Write data
    /* try {
        const DOC_REF = await addDoc(collection(DB, "users"), {
            first: "Alan",
            middle: "Mathison",
            last: "Turing",
            born: 1912
        });
        console.log("Document written with ID: ", DOC_REF.id);
    }catch(e) {
        console.error("ERROR adding document: ", e);
    } */

    //Read data
    const SNAPSHOT = await getDocs(collection(DB, "users"));
    SNAPSHOT.forEach((doc) => {
        console.log(doc.id);
        console.log(doc.data());
    })

    sessionStorage.setItem("title", document.querySelector("title").innerText);

    if(!sessionStorage.getItem("session-start")) {
        sessionStorage.setItem("session-start", Date.parse(new Date()));
    }

    const SESSION_DATA = {
        title: document.querySelector("title").innerText,
        webLocation: document.URL,
        time: Date.parse(new Date()),
        previous: document.referrer,
        sessionStart: sessionStorage.getItem("session-start"),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    }

    console.log(SESSION_DATA.sessionStart == SESSION_DATA.time);
    console.log(SESSION_DATA);
    if(SESSION_DATA.sessionStart == SESSION_DATA.time) {
        try {
            const DOC_REF = await addDoc(collection(DB, "visits"), SESSION_DATA);
            console.log("Session logged with ID: ", DOC_REF.id);
        }catch(e) {
            console.error("ERROR adding document: ", e);
        }
    }
}