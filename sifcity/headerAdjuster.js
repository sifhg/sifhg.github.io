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

let sessionData = {
    title: document.querySelector("title").innerText,
    webLocation: document.URL,
    time: new Date(),
    previous: document.referrer,
    sessionStart: sessionStorage.getItem("session-start")
}

//Get country code
fetch("http://ip-api.com/json/?fields=61439")
    .then((response) => response.json())
    .then((response) => {
        if(response.query != "77.241.128.131") {
            sessionData.countryCode = response.countryCode;
        }else {
            sessionData.countryCode = "SIF";
        }
        console.log(sessionData);
});