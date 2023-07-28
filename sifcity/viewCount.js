import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import  { getFirestore, setDoc, doc, updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

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

    // Initialize Cloud Firestore and get a reference to the service
    const DB = getFirestore(APP);

    sessionStorage.setItem("title", document.querySelector("title").innerText);

    const NOW = Date.now();
    if(!sessionStorage.getItem("session-id")) {
        sessionStorage.setItem("session-id", `${NOW}|${Math.floor(Math.random()*1000000).toString(36)}`);
    }

    const SESSION_DATA = {
        webLocation: document.URL,
        previous: document.referrer,
        sessionID: sessionStorage.getItem("session-id"),
        sessionStart: Number(sessionStorage.getItem("session-id").split("|")[0]),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        navigations: [{title: document.querySelector("title").innerText,
                       time: NOW}]
    }
    const NAVIGATION_DATA = {
        title: document.querySelector("title").innerText,
        time: NOW 
    }
    console.log(SESSION_DATA);

    //Add sesion to database
    if(SESSION_DATA.sessionStart == SESSION_DATA.navigations[0].time) {
        try {
            const DOC_REF = doc(DB, "visits", SESSION_DATA.sessionID);
            await setDoc(DOC_REF, SESSION_DATA);
            console.log("Session logged with ID: ", DOC_REF.id);
        }catch(e) {
            //console.error("ERROR adding document: ", e);
        }
    }else {
        //Update session in database
        try {
            const DOC_REF = doc(DB, "visits", SESSION_DATA.sessionID);
            await updateDoc(DOC_REF, {
                navigations: arrayUnion(NAVIGATION_DATA)
            });
            console.log("Session updated with ID", DOC_REF.id);
        }catch(e) {
            //console.error("ERROR updating document: ", e);
        }
    }
}