function resizeHeader() {
    const HEADER = document.querySelector("embed");

    if(window.innerWidth < 895) {
        let newHeight = window.innerWidth*(49/150) + (68);
        newHeight = (newHeight+"").split(".")[0] + "px";
        HEADER.style.height = newHeight;
    }else {
        HEADER.style.height = "360px";
    }
    console.log(`Window width: ${window.innerWidth}`);
    console.log(`Width: ${HEADER.style.width}`);
    console.log(`Height: ${HEADER.style.height}`);
}
addEventListener("DOMContentLoaded", (event) => {
    resizeHeader();
})
addEventListener("resize", (event) => {
    resizeHeader();
})