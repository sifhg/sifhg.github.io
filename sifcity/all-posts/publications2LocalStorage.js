const TABLE_ROWS = document.getElementsByClassName("publication");
let publications = [];
for(const PUBLICATION of TABLE_ROWS) {
    const LINK_ELEMENT = PUBLICATION.querySelector(".publication-title a");
    const TO_STORAGE = {
        title: LINK_ELEMENT.innerText,
        link: LINK_ELEMENT.getAttribute("href"),
        date: PUBLICATION.querySelector(".publication-date").innerText,
        author: PUBLICATION.querySelector(".publication-author").innerText,
        description: PUBLICATION.querySelector(".publication-description").innerText
    }
    publications.push(TO_STORAGE);
}
publications.push(new Date());
localStorage.setItem("allPublications", JSON.stringify(publications));
