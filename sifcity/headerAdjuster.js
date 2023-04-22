function resizeHeader() {
    const HEADER = document.querySelector("embed");
    if(window.innerWidth < 895) {
        let newHeight = window.innerWidth*(49/150) + (48);
        newHeight = (newHeight+"").split(".")[0] + "px";
        HEADER.style.height = newHeight;
    }else {
        HEADER.style.height = "340px";
    }
}
addEventListener("DOMContentLoaded", (event) => {
    resizeHeader();
})
addEventListener("resize", (event) => {
    resizeHeader();
})