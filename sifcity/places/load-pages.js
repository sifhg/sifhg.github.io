const PAGE_TABLE = document.getElementById("page-list");
const PAGE_LIST = JSON.parse(localStorage.getItem("allPlaces"));

let latestLoaded = 0;


window.addEventListener('storage', function(event) {
    if (event.key === 'allPlaces' && event.newValue) {
      latestLoaded = load10Posts(latestLoaded, JSON.parse(event.newValue), PAGE_TABLE);
    }
  });


function load10Posts(firstIndex, publications, topTable) {
    let i;
    for(i = firstIndex; i < publications.length-1 && i < firstIndex+10; i++) {
        const PUBLICATION_CONTENT = generatePostRow(publications[i]);
        topTable.appendChild(PUBLICATION_CONTENT);
    }
    if(publications.length > i) {
        //ADD BUTTON ELEMENT HERE
    }
    return i;
}

function generatePostRow(publication) {
    //Create table elements
    const ROW = document.createElement("tr");
    const TITLE_CELL = document.createElement("td");
    const TITLE_LINK = document.createElement("a");
    const TITLE_HEADING = document.createElement("h2");
    const DESCRIPTION = document.createElement("p");

    //Add data
    TITLE_HEADING.innerText = publication.title;
    TITLE_LINK.setAttribute("href", publication.link);
    TITLE_LINK.setAttribute("class", "title-link");
    DESCRIPTION.innerText = publication.description;

    //Gather elements
    TITLE_CELL
        .appendChild(TITLE_LINK)
        .appendChild(TITLE_HEADING);
    TITLE_CELL.appendChild(DESCRIPTION);
    ROW.appendChild(TITLE_CELL);
    
    //SHOULD I ADD PREVIEW OF POSTS?
    
    return ROW;
}