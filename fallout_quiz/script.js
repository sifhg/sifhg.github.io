let questions;

fetch("https://raw.githubusercontent.com/sifhg/sifhg.github.io/main/fallout_quiz/questions_and_answers.json")
    .then((response) => response.json())
    .then((data) => {
        questions = data;
        console.log(questions);
    });