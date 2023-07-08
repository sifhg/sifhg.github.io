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
    const ENCRYPTED_MESSAGE = " â \x84¡\x94\x92®áÛ ²ÒºÛÏ\x84h \x8D²â ×Õ×¾ÎÊ\x85 \x95\x8CĮÐōä  \x86\n\ni ª\x81·â æØ ÆÊß °\x9B\x81·Ù ëØÙ ÝÕ µ¢\x95w ­áÛ ÊÑÇ\x94 ¬\x8F¾ ÔÛÐÌÇ Ç\x93§r \x92 Ëá×⁽Ç Ë\x96¡¡ ´ÜÖé Û»ÎØ\x85 §\x8F ÐÌÙÒÒt ¯ ©\x98\x81·\x9A ÞÒÏ¸\x95 \x86«¥ ®äÌäâØ»ÒÔ\x87]\nf²àÚæ Ó¹ Ç\x8C¨_ \x92 ÞÓ×Ø ÝÕ ¯\x94\x99 âÏÓ×Ï âÕ\x95 \x99\x8F» ÖçÛ ¿ÊÙ\x94 \x94\x84¿ÓÕæÞÖ¸ÜÙ \x9D¥\x8F¾ÜË ®ÒºÕÇ\x8E a ¢ÝÜ ÜÌÂàË\x84  \x85 áÖ ÖÅÁâ \x8C«©\x85µç âÕÅ¶ÎÙN \x8C\x8F¾ ÍÛÕÐ Öß ¤\x98\x81»â éÒØ» Ò\x8F²\x98\x8CÂ Ô×ÖÓÅÒË\x93] J®æÊÛÝÉ· Ö\x89£\x98\x8F· ÕáÒ×¸\x8A\x87J \x8A\x81µÙÐàÐ ÊÒÚ\x88 ¬\x8F¾ ÏÓ×È\x80ÒÔM¤\x94\x8E­ ÌêÙÐÂÛÏ\x8E£ \x94±Ó åÞÑÀÎØ\x99 ¦\x89°ÖÛå Ó¹ ¹\x83\x9D¥\x82¸àÖçÐÌ\x7F Ö\x92«¨\x84µç ÔÎÍÁÐ \x90±\x95\x8C²Ñ ÓËÓÈÝ \x8F±¥ ªÔÍ×ÌØ¼ØÔL ª\x81½ÑÏÛ×Ë ÝÎ\x85 \x96\x95½Ó åÑÓÃÜ \x89ª \x94±Ó ÅÑÅÀËÒ\x85¯_ ®áÊÓÙÍÁÐ \x94¤\x98 ¬×Ûë ÊÂÛ \x94¤\x98 ¬ÏÓß ±´ÛÙ\x84¡¡L ÏÕÖ Ö¸ßÏ\x93¥§\x89·Õ ßâ ¹ÊÜ\x8F±¥\x89½Ó áÏ ÇÑË \x81¡\x87µ×ÚÚ Ç¼ÝÏ\x85¯_ \x96ÏÕÕÑÉÆÝË\x92 ⁆ \x92₇Ô ÛÉ´ÕÒ\x99 ¥\x85ªÚÓë Ö¸ÊÒ\x8Cµ J»ÓÚæÊÖÇÜ \x96«\x96\x81µ ÈâÙÅÅÊÚ\x95¯] »ÓÈÞÕÝ ÑÇ\x90¬¬ ½ÖÈæ ÝÂÞ \x86¥\x9F\x8C Ûà ÑÉ´ÛÚ ¨\x9C\x8B® ÛÚÊØ\x81 º\x88¥¦ ÀÖÖÞÎ ÇÑÏ\x8E£_ ¶ÏÒ×Ü ÀÎ \x86¡\x98\x8C ÚÐÝÎ ÊÎ \x81®\x98 ¯ÏÔÛÕÝ\x7F Ç\x8E  i ÖÖâÎ ¼Ýⁿ\x93 ¢\x8Bu ÐØ ­ ÜÚ\x81®§ ¬ÝÕåÒÈ¸ÛÏ\x8E£ \x99¸ã ÓÜ ÆÞÉ\x88 \x99\x92¸Û àØÛ ØÔ xf\n Ó ÓÕ×Â Ý\x85ª§ ¸Ü æÑÉ ÊÊ\x96¡¡\x94¾àÌ ÝÓ ±Ç\x92®¢\x87ªâÌ  ­ ÑÇ\x96¡ \x91¾×Ìæ Å ÏË\x97 §\x88²ÜÎå ­ àÇ\x8E° \x94¸ ÛÚÊÒ¾ ß\x8F± \x86¸à ÚÎÖ¸\x97 t¤\x94\x8E´ àáÞ ¹ØØ °\x9B\x85 ÞÖåÑ µÛË\x81§\x99\x81¼â\x93 ÒØ àÇ\x93 \x98\x98ºãÐåÒØ¸\x97 aª\x97 ½ÖÈàÔ ÌØÛ ¢¢\x92 ÚÐåÝÉÁÒÔ\x87 \x94\x8E­ Ï×ÕÔ¼×Í ©\x98 ½Ý ÙÊØ»ÎØ ©¬ ½ÖÖçÐÌÇÜ \x81\x9E¢\x95½ Ôë ×¼ÝÛ\x81°\x9C\x8F· ÞÛÝÌ Öß ¯\x9C\x93½ÓÙ   \x94×Ê \x85 \x81µáÖ àÅÁÝ \x94« \x94±ÏÕÝ ÝÂÞ \x86«¥ ²ÜÛäØÈÈÌÏ\x8E£ \x8D® Ûá ÝÂÞ \x90\x9D¥\x85·âÚ\x93 ¸»Îß ¯\x98\x85¶ ÕÛÌÉ ÊÔ\x84 \x94\x8D àÌÓÕÐÌ Î\x81¬£\x99 âÏÓÝ ÌØÛ £\x94\x96® Ô× Ø»ÒÙ ¬\x98\x85´ ÐàÝÓ âÕ\x95® \x8C²ÔÌ  ­⁬Ö \x96¡¥\x99 ÖÈâÙÝ ÒÚ \x9D\x9F\x93¸ Ú×ÎÑ¸Í \x8C¥\x9E\x85 âÏ×â ¿ÒÑ\x85  \x8D® ÉÓÌÏ £ª\n}¡\x84 âÏÓ×Ï âÕ\x95 \x99\x8F» ÐàÝÖÂÍÛ\x83¥¡\x87 ÛÌ ÝÓ »Õ\x93¥\x98 ½ÝÖ\x93 ·»Îⁿ\x93 ¦\x95¬Ö Ó× ¸×Ë\x92£\x9C\x83 ÞÌäÜÓÁ\x97 y«¨ ²ÜÛäØÈÈÌÏ\x8E£ \x8D® Ûá Ø»Î \x90¡¢\x90µÓ æÑÅÇ Ó\x85\x9D¡ ¼ÝÔ×ÝÌ¼×Í °¢ ÂÝÜ ÖÅ¾ÎÙ ©\x98 ¯ÓÌÞ Ð¼ÔË ³\x98 ªàÌ ÎÚ¸× \x8D«¥\x85 ÞÈäÝ× ØÌ ¡\x94\x83± ÖæÑÉÅ₂Ù ¨\x9C\x96®á\x95 ² ¶ÊÔ‹° \x97ª×Û ÝÓ ÖË\x85° \x8D¸àÌ ØÊ âÕ\x95® \x86»×ÌàÍ×t\nº\x88\x9D¡\x8B çÖç\x95 \x9C×Í\x92¥\x97L ÔÖä ÒÂÝ \x8Fª\x9F\x99 ×ÕèÒØ¼×Í ©\x98 ²ÜÛá ÝÂÞØ ¤¢\x8D®\x9A ÔÞØ ÊÒ\x93« \x89·äÐæÒÒº Ó\x85 \x9C\x8E½Ý ëØÙÅ Ò\x89¢\x98N · ØÎÉ¿ Ù\x8F \x94\x94 ÖÖßÎ ¼× \x99«¨\x92 ÚÐØÎ\x92 ÂÕ\x95 \x94\x92® ÑçÜØ ÒÙ ³\x98\x8C¬ÝÔ× ÍÁ Ó\x99 \x9F\x89¯Ó ®\x9C\n\x9CÝ \x86¡\x98\x8C¼ Úá Ö¼ÐÎ\x94 §\x8F âÙÓßÉ¿ Ý\x89°\x9B ÂÝÜ  ­⁬Ö \x89ª \x8E¸ ËáÞÆÇ Ú\x88\x9D§ ÀÓ ÕÊÒ ÖÇ\x8B¡ \x81 ÖÖßÎ ÇØÍ\x85°\x9B\x85»\x9C\n\n½Ì´×Ñ µ¢\x95 ÔÖä Æ¸ÒÔ\x87 ¬\x8F¾\x9C ËØÙ ÖË\x81ª \x85¿ÓÙëÝÌ¼×Í °¢ ¶Ó ®\x9C \x8F\x9C \\o\n\n\x91ãÎ ÊÒ· Ñ\x89¯¦\x85¼\x9C\n³×È ÜÔ\x95£\x9A\x8C®á Ó×È àÎ\x89¬£\x89·ÕÚ ÊÒ· Ú\x89¡¦N\n²Ðà Ï´ÏÌ\x85h s²Ô\n";
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

