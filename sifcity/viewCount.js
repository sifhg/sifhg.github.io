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