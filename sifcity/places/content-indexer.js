function incrementLastStringNumber(input) {
    return input.replace(/(\d+)$/, (match) => {
        const number = parseInt(match);
        return (number + 1).toString();
    });
}  
  

function createHeaderList(domElement) {
    const HEADER_LIST = document.createElement('ol');
  
    const H2_ELEMENTS = domElement.querySelectorAll('h2');
    const HEADER_ELEMENTS = domElement.querySelectorAll('h2, h3');

    for(let h2 = 0; h2 < H2_ELEMENTS.length; h2++) {
        const LIST_ITEM = document.createElement('li');

        //Create ID for H2 element based on position in list
        H2_ELEMENTS[h2].id = "" + (h2+1);

        //Create link element
        const LINK = document.createElement('a');
        LINK.href = `#${H2_ELEMENTS[h2].id}`;
        LINK.textContent = H2_ELEMENTS[h2].innerText;

        LIST_ITEM.appendChild(LINK);
        HEADER_LIST.appendChild(LIST_ITEM)
    }
    let h3Counter = 0;

    for(let h = 0; h < HEADER_ELEMENTS.length-1; h++) {
        const TAG_NAME = HEADER_ELEMENTS[h].tagName.toLowerCase();
        const NEXT_TAG_NAME = HEADER_ELEMENTS[h+1].tagName.toLowerCase();

        if(TAG_NAME === "h2" && NEXT_TAG_NAME === "h3") {
            const NESTED_LIST = document.createElement("ol");
            const LIST_ITEM = document.createElement("li");

            //Create ID for H3 element based on position in list
            HEADER_ELEMENTS[h+1].id = `${HEADER_ELEMENTS[h].id}-1`;

            //Create link element
            const LINK = document.createElement("a");
            LINK.href = `#${HEADER_ELEMENTS[h+1].id}`;
            LINK.textContent = HEADER_ELEMENTS[h+1].innerText;

            LIST_ITEM.appendChild(LINK);
            NESTED_LIST.appendChild(LIST_ITEM);
            HEADER_LIST.childNodes[h-h3Counter].appendChild(NESTED_LIST);
            h3Counter++;
        }

        if(TAG_NAME === "h3" && NEXT_TAG_NAME === "h3") {
            const LIST_ITEM = document.createElement("li");

            //Create ID for H3 element based on position in list
            HEADER_ELEMENTS[h+1].id = incrementLastStringNumber(HEADER_ELEMENTS[h].id);

            //Create link element
            const LINK = document.createElement("a");
            LINK.href = `#${HEADER_ELEMENTS[h+1].id}`;
            LINK.textContent = HEADER_ELEMENTS[h+1].innerText;

            LIST_ITEM.appendChild(LINK);
            HEADER_LIST.childNodes[h-h3Counter].lastChild.appendChild(LIST_ITEM);
            h3Counter++;
        }
    }
    
    return HEADER_LIST;
  }

const BODY = document.getElementsByTagName("body")[0];
const CONTENT = document.getElementsByClassName("content")[0];

CONTENT.appendChild(createHeaderList(BODY));