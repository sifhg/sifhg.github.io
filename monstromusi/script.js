fetch("https://raw.githubusercontent.com/sifhg/sifhg.github.io/main/monstromusi/posts.json")
    .then((response) => response.json())
    .then((data) => {
        const metaData = data;
        console.log(metaData);
        document.getElementById("post-load").innerHTML = "";
        addPreviews(0, 10);
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
    const startTag = "<tr><td>";
    const inner =  "" + aDate + '</td><td><a href="?post=' + aDate + '"><h2>' + aTitle + "</h2></a><br>" + someContent;
    const endTag = "[...]</td></tr>";
    return startTag + inner + endTag;
}
function addPreviews(firstPreview, lastPreview) {
    document.getElementById("post-list").innerHTML += createTr("2022-12-15", "TodayToday", "Her er der rigtig mange");
}