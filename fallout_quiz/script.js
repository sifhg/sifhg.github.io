let questions;
let shuffleCode;
const OPENING_WINDOW = document.getElementById("opening-window");
const GAME_WINDOW = document.getElementById("game-window");
const INPUT_BOX = document.querySelector("input[type='text']");

  
INPUT_BOX.addEventListener("focus", (event) => {
    console.log("Active");
});
  
INPUT_BOX.addEventListener("blur", (event) => {
    console.log("Inactive");
})

fetch("https://raw.githubusercontent.com/sifhg/sifhg.github.io/main/fallout_quiz/questions_and_answers.json")
    .then((response) => response.json())
    .then((data) => {
        questions = data;
        console.log(questions);
    });

function getShuffleCode() {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    if(!urlParams.has("SC")) {
        return false;
    }
    return urlParams.get("SC");
}

shuffleCode = getShuffleCode();
if(shuffleCode === false) {
    OPENING_WINDOW.style.display = "block";
    GAME_WINDOW.style.display = "none";
}else {
    OPENING_WINDOW.style.display = "none";
    GAME_WINDOW.style.display = "block";
}

