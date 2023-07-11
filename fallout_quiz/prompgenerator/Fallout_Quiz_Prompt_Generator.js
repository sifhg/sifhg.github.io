let numberOfElements = 0;
const INPUT_FIELDS = document.getElementById("input-fields");
const ADD_BUTTON = document.getElementById("add-element");
const GENERATOR_PROMPTS = document.getElementById("generate-prompts");
const PROMPT_FIELD = document.getElementById("prompts");

function createElement(idNumber) {
    const DIV = document.createElement('div');
    
    DIV.id = `element-${idNumber}`;
    
    const NAME_LABEL = document.createElement('label');
    NAME_LABEL.innerHTML = 'Name';
    
    const NAME_INPUT = document.createElement('input');
    NAME_INPUT.type = 'text';
    
    const CATEGORY_LABEL = document.createElement('label');
    CATEGORY_LABEL.innerHTML = 'Category';
    
    const INFO_LABEL = document.createElement('label');
    INFO_LABEL.innerHTML = 'Info Text';
    
    const INFO_TEXTAREA = document.createElement('textarea');
    
    DIV.appendChild(NAME_LABEL);
    DIV.appendChild(NAME_INPUT);
    
    DIV.appendChild(CATEGORY_LABEL);
        const categoryValues = ["character", "location", "creature", "faction", "weapon", "quest", "lore"];
        for (let i = 0; i < categoryValues.length; i++) {
          const CATEGORY_INPUT = document.createElement('input');
          CATEGORY_INPUT.type = 'radio';
          CATEGORY_INPUT.name = `category-${idNumber}`;
          CATEGORY_INPUT.value = categoryValues[i];
          
          const categoryInputLabel = document.createElement('label');
          categoryInputLabel.innerHTML = categoryValues[i];
          
          DIV.appendChild(categoryInputLabel);
          DIV.appendChild(CATEGORY_INPUT);
        }

    DIV.appendChild(INFO_LABEL);
    DIV.appendChild(INFO_TEXTAREA);
    
    return DIV;
}

function generatePrompts(divElement) {
    const INPUT_NAME = divElement.querySelector('input[type="text"]');
    const NAME = INPUT_NAME.value;
    
    const CATEGORY_INPUT = divElement.querySelectorAll('input[type="radio"]');
    let category = '';
    for (let i = 0; i < CATEGORY_INPUT.length; i++) {
      if (CATEGORY_INPUT[i].checked) {
        category = CATEGORY_INPUT[i].value;
        break;
      }
    }
    
    const TEXTAREA = divElement.querySelector('textarea');
    const TEXTAREA_VALUE = TEXTAREA.value;
    const WORD_COUNT = TEXTAREA_VALUE.trim().split(/\s+/).length;
    let numberOfQuestions = Math.floor(WORD_COUNT / 35);
    numberOfQuestions = (numberOfQuestions < 1) ? 1 : numberOfQuestions;
    numberOfQuestions = (numberOfQuestions > 15) ? 15 : numberOfQuestions;
    
    return `Here is a wiki text about from the Fallout page for ${NAME}. Please give me ${numberOfQuestions} quiz questions based on knowledge from this text. Each question should have three possible answers, and list the right answer as the first for each question. List them as a JSON list, each with three keys "question", "answers", and "category", where category is ["${category}", "${NAME}"].\n\n\n${TEXTAREA_VALUE.trim()}\n\n\n\n`;
}


INPUT_FIELDS.append(createElement(numberOfElements));
numberOfElements++;

ADD_BUTTON.addEventListener("click", (event) => {
    INPUT_FIELDS.append(createElement(numberOfElements));
    numberOfElements++;
});

GENERATOR_PROMPTS.addEventListener("click", (event) => {
    for(const ELEMENT of INPUT_FIELDS.children) {
        PROMPT_FIELD.innerText += generatePrompts(ELEMENT);
    }
})