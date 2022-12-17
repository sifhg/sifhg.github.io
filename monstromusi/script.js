const queryString = window.location.search;
const urlParameters = new URLSearchParams(queryString);
let postContent;
let metaData;

fetch("https://raw.githubusercontent.com/sifhg/sifhg.github.io/main/monstromusi/posts.json")
    .then((response) => response.json())
    .then((data) => {
        metaData = data;
        document.getElementById("post-load").innerHTML = "";
        
        if(urlParameters.get('post') == null) {
            addPreviews(0, 10);
        }else {
            document.getElementById("post-list").remove();
            document.getElementById("more-posts").remove();
            loadPost(urlParameters.get('post'));
        }
    })
    .catch((error) => {
        console.log("ERROR: " + error);
    });
function createP(someInner, aClass, anId) {
    const startTag = '<p class="' + aClass + '" id="' + anId + '">';
    const inner = someInner;
    const endTag = '</p>';
    return startTag + inner + endTag;
}
function createTr(aDate, aTitle, someContent) {
    const startTag = '<tr><td class="td-left">';
    const inner =  "" + aDate + '</td><td class="td-right"><a href="?post=' + aDate + '"><h2>' + aTitle + "</h2></a>" + someContent;
    const endTag = "</td></tr>";
    return startTag + inner + endTag;
}
function addPreviews(firstPreview, lastPreview) {
    for(let i = firstPreview; i < lastPreview; i++) {
        fetch("https://sifhg.github.io/monstromusi/" + metaData[i].publicationDate + ".html")
        .then((response) => {
            return response.text();
        })
        .then((html) => {
            let preview = fixHTML(getWordString(html, 60).replaceAll("<a", "<span").replaceAll("</a>", "") + " [...]");
            let title = preview.split("<h2>")[1].split("</h2>")[0];
            preview = preview.split("</h2>")[1];
            document.getElementById("post-list").innerHTML += createTr(metaData[i].publicationDate, title, preview);
        })
        .catch((error) => {
            console.log("ERROR: " + error);
        })
        
    }    
}
function loadPost(postName) {
    fetch("https://sifhg.github.io/monstromusi/" + postName + ".html")
    .then((response) => {
        if(!response.ok) {
            window.location.href = "https://sifhg.github.io/monstromusi/";
        }
        return response.text();
    })
    .then((html) => {
        document.getElementsByTagName("body")[0].innerHTML += '<p class="menu-item">' + postName + '<br>Written by Sif Høg </p>';
        postContent = html.replace("</h2>", ('</h2><img src="' + postName + '.png" onerror="this.style.visibility = \'hidden\'">'));
        document.getElementsByTagName("body")[0].innerHTML += postContent;
    })
    .catch((error) => {
        console.log("ERROR: "+ error);
    })
}
function fixHTML(html) {
    let div = document.createElement("div");
    div.innerHTML = html;
    return div.innerHTML;
}
function getWordString(string, numOfWords) {
    return string.split(/\s+/).slice(0, numOfWords).join(" ");
}
document.getElementsByTagName("body")[0].innerHTML += '<button id="more-posts">OLDER POSTS</button>';
const loadMoreButton = document.getElementById("more-posts");
loadMoreButton.addEventListener("click", (event) => {
    addPreviews(10, metaData.length-1);
    loadMoreButton.style.display = "none";
});