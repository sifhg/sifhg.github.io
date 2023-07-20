function resizeHeader() {
    const HEADER = document.querySelector("embed");
    if(window.innerWidth < 895) {
        let newHeight = window.innerWidth*(49/150) + (68);
        newHeight = (newHeight+"").split(".")[0] + "px";
        HEADER.style.height = newHeight;
    }else {
        HEADER.style.height = "360px";
    }
}
addEventListener("DOMContentLoaded", (event) => {
    resizeHeader();
})
addEventListener("resize", (event) => {
    resizeHeader();
})


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