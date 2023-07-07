let questions;
let shuffleCode;
const OPENING_WINDOW = document.getElementById("opening-window");
const GAME_WINDOW = document.getElementById("game-window");
const SYSTEM_DIAGNOSTICS_WINDOW = document.getElementById("system-diagnostics-window");
const INPUT_BOX = document.querySelector("input[type='text']");
const SYSTEM_DIAGNOSTICS_BUTTON = document.getElementById("system-diagnostics-button");
const SYSTEM_DIAGNOSTICS_MESSAGE = document.getElementById("diagnostics-message");
const BACK_BUTTON = document.getElementById("back-button");

  
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

function decrypt(key, message) {
    let keyCode = [];
    for(let k = 0; k < key.length; k++) {
        const KEY_CODE = key.charCodeAt(k);
        keyCode.push(KEY_CODE);
    }

    let numbersArray = [];
    for(let i = 0; i < message.length; i++) {
        const CHAR_CODE = message.charCodeAt(i);
        if(CHAR_CODE == 32 || CHAR_CODE == 10) {
            numbersArray.push(CHAR_CODE);
        }else {
            numbersArray.push(CHAR_CODE - (keyCode[i%keyCode.length]));
        }
    }

    let decrypted = "";
    for(let d = 0; d < numbersArray.length; d++) {
        const CHAR = String.fromCharCode(numbersArray[d]);
        decrypted += (CHAR == "\n") ? "<br>" : CHAR;
    }
    return decrypted;
}

SYSTEM_DIAGNOSTICS_BUTTON.addEventListener("click", (event) => {
    console.log("Clicked");
    const ENCRYPTED_MESSAGE = " â \x84¡\x94\x92®áÛ ²ÒºÛÏ\x84h \x8D²â ×Õ×¾ÎÊ\x85 \x95\x8CĮÐōä  \x86\n\nt¤\x94\x8E´ àáÞ ÆØ \x8D±\x96\x88 ÔÖä Ø»Î \x8C\x9D¦\x94 âÙÛÙ ÊÒÚ\x88 ¬\x8F¾ ÈäØÙÁÍ \x89ª e·ÕÓÓ×È\x81 ¿\x8F± \x86²ÚÓ ÖÝ ÑË\x81® \x97²âÏ ÕÓÉÎÒ\x99  \x85¶ÝÙÛÎ× ÝÎ\x81° i åÐÞÕ ÁÎÜ\x85® \x86¸àÎ×Ý\x92 ½Î\x81ª\x9E ÂÝÜ  ¸»ØÙ\x85 ª\x85»Ó æÛÙ¿â \x93« \x85 ÏÔÓãÍÁÐ \x81 ©\x85·âÜäÎ×t\nº\x88\x9D¡\x8B çÖç\x95 \x9C×Í\x92¥\x97L ÔÖä ÍÁßÏ\x94¥¡\x87 ÛÌ ÒÒ\x81 ¯ ¢\x98\x85µ Úá ÅÇ Î\x8F©\x98 À×ÛÚ ÝÂÞ\x94 \x85 \x81¬âÜÓÕÐÌ Ì\x85¡\x9F ¶ÝÙ× ÅÇ Î\x8F©\x98 À×ÛÚ ÝÂÞ \x94¤\x94\x8E ÏÕëàÌ¸ÛË ¡\x9F\x93®\x9C\nÆÑÅÁÔ \x99«¨ ¯ÝÙ ÕÉÇÝÏ\x8E£ \x8D® Ô×ÎØ âÕ\x95® \x86»×ÌàÍ×\x81 ¯\x94  \x81´ÓÚ ÖÉ ÏË\x85¨ \x8C²ÙÌ ²⁽À É\x8F©\x9C\x8E° ÊÞØ×¸Û \x89ª§\x8F çÖçÛ ¿ÒÌ\x85j a·Ò æÑÅÁÔ \x99«¨ ¯ÝÙ ÕÉÇÝÏ\x8E£ \x8D® Ô×ÎØ âÕ\x95® \x86ªÛÐÞâ\x92 ² \x86¡\x98\x8C ÚÐÝÎ \x9C₂Ó \x9D£\x90»ÝÝ×Í\x92\n½Î\x81ª\x9E ÂÝÜ ÏÓÅ Ú\x92\x9D©\x85µ×ÕÙ Û¼ÝÎ ©\x98N ·Û ÏÉ¸ÕÙ ¯¢ »×ÎÚÝ\x90 ÊÔ\x84 |‹¶ Ðà ÒÂ Ê\x8F±\x95\x94 âÏÓÝ ÊÎ \x83\x9D¡ ¶ÏÒ× Å ÑÕ\x8D¡ \x94¸ÕÌæÑÉÅ Ç\x8E  \x82® ÊÞØ×¸\x97\n\n\x90\x9B\x81·Ù ëØÙ ÏÕ\x92 \x95\x85²ÜÎ âÓÈ\x97 y«¨ ¶ÓÈà ÉÉÎØ\x99°\x9B\x89·Õ æØ ÀÎ \\o \\| £¥\n\n\x9BÞÍ \x9D¡\x84 ÙÐåÜÉÆ\x97\naª\x97 ¼ÜÜÙÐÐ¸Ü \x81ª\x97 ÀÖÐâÙÍÁÐÙ \x9D¡\x84 âÐ×Ü\x92\n­Ï\x8E \x9E\x81¯ÔÌ\x9E ·¼Ï";
    const KEY = (INPUT_BOX.value == "") ? " " : INPUT_BOX.value;
    SYSTEM_DIAGNOSTICS_MESSAGE.innerHTML = decrypt(KEY, ENCRYPTED_MESSAGE);
    SYSTEM_DIAGNOSTICS_WINDOW.style.display = "block";
    BACK_BUTTON.style.display = "block";
    OPENING_WINDOW.style.display = "none";
})

BACK_BUTTON.addEventListener("click", (event) => {
    OPENING_WINDOW.style.display = "block";
    GAME_WINDOW.style.display = "none";
    SYSTEM_DIAGNOSTICS_WINDOW.style.display = "none";
    BACK_BUTTON.style.display = "none";
})

shuffleCode = getShuffleCode();
if(shuffleCode === false) {
    OPENING_WINDOW.style.display = "block";
    GAME_WINDOW.style.display = "none";
    SYSTEM_DIAGNOSTICS_WINDOW.style.display = "none";
}else {
    OPENING_WINDOW.style.display = "none";
    GAME_WINDOW.style.display = "block";
    SYSTEM_DIAGNOSTICS_WINDOW.style.display = "none";
}

