const queryString = window.location.search;
const urlParameters = new URLSearchParams(queryString);
let postContent;

fetch("https://raw.githubusercontent.com/sifhg/sifhg.github.io/main/monstromusi/posts.json")
    .then((response) => response.json())
    .then((data) => {
        const metaData = data;
        console.log(metaData);
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
    const endTag = "[...]</td></tr>";
    return startTag + inner + endTag;
}
function addPreviews(firstPreview, lastPreview) {
    document.getElementById("post-list").innerHTML += createTr("2022-12-15", "TodayToday", "Her er der rigtig mange");
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
        postContent = html;
        document.getElementsByTagName("body")[0].innerHTML += postContent;
    })
    .catch((error) => {
        console.log("ERROR: "+ error);
    })
}