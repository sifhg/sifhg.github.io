function updateGridTemplateColumns() {
    const body = document.querySelector('body');
    const windowWidth = window.innerWidth;
  
    if (windowWidth >= 1280) {
      body.style.gridTemplateColumns = "18.75% repeat(3, 1fr) 18.75%";
      for(const DIV of contentDivisions[2]) {
        DIV.style.gridColumn = "span 3";
      }
      for(const DIV of contentDivisions[1]) {
        DIV.style.gridColumn = "span 2";
      }
    } else if (windowWidth >= 601) {
      body.style.gridTemplateColumns = "18.75% repeat(2, 1fr) 18.75%";
      for(const DIV of contentDivisions[2]) {
        DIV.style.gridColumn = "span 2";
      }
      for(const DIV of contentDivisions[1]) {
        DIV.style.gridColumn = "span 2";
      }
    } else {
      body.style.gridTemplateColumns = "18.75% 1fr 18.75%";
      for(const DIV of contentDivisions[2]) {
        DIV.style.gridColumn = "span 1";
      }
      for(const DIV of contentDivisions[1]) {
        DIV.style.gridColumn = "span 1";
      }
    }
  }

function getEndColumn(element) {
    const computedStyle = window.getComputedStyle(element);
    const gridColumnStart = computedStyle.getPropertyValue('grid-column-start');

    if (gridColumnStart.startsWith('span')) {
        const gridItem = element.parentElement;
        const grid = gridItem.parentElement;

        const gridColumnSpan = parseInt(gridColumnStart.split(' ')[1]);
        const gridColumnIndex = Array.from(grid.children).indexOf(gridItem);

        const gridColumnEnd = gridColumnIndex + gridColumnSpan + 1; // Add 1 for 1-based indexing
        return `span ${gridColumnEnd}`;
    } else {
        return gridColumnStart;
    }
}

function getGridElement(row, col) {
    // Convert row and col to 1-based indices
    row = row + 1;
    col = col + 1;

    // Get all elements with a class of 'content'
    const contentElements = document.querySelectorAll('.content');

    // Iterate through the content elements
    for (const element of contentElements) {
        const gridColumnSpan = parseInt(window.getComputedStyle(element).gridColumnEnd) - parseInt(window.getComputedStyle(element).gridColumnStart);
        const gridRowSpan = parseInt(window.getComputedStyle(element).gridRowEnd) - parseInt(window.getComputedStyle(element).gridRowStart);

        // Calculate the ending column and row based on the span
        const endCol = col + gridColumnSpan - 1;
        const endRow = row + gridRowSpan - 1;

        // Check if the specified row and column are within the span of the element
        if (col >= parseInt(window.getComputedStyle(element).gridColumnStart) && col <= endCol && row >= parseInt(window.getComputedStyle(element).gridRowStart) && row <= endRow) {
            return element;
        }
    }

    // If no element is found, return null
    return null;
}
  

const CONTENT = document.querySelectorAll(".content");
let contentDivisions = [[], [], []];
for(const DIV of CONTENT) {
  const NUM_OF_COLUMNS = window.getComputedStyle(DIV).getPropertyValue('grid-column');
  contentDivisions[Number(NUM_OF_COLUMNS.split(" ")[1])-1].push(DIV);
  console.log(getEndColumn(DIV));
}
updateGridTemplateColumns();
window.addEventListener('resize', updateGridTemplateColumns);