//Colours from style
let backgroundColour;
let standardIngridColour;
let specialIngridColour;
let dimIngridColour;
let standardSifColour;
let specialSifColour;
let dimSifColour;
document.addEventListener("DOMContentLoaded", (event)=> {
    let rootStyles = getComputedStyle(document.documentElement);

    backgroundColour = rootStyles.getPropertyValue("--background-colour");
    standardIngridColour = rootStyles.getPropertyValue("--standard-ingrid-colour");
    specialIngridColour = rootStyles.getPropertyValue("--special-ingrid-colour");
    dimIngridColour = rootStyles.getPropertyValue("--dim-ingrid-colour");
    standardSifColour = rootStyles.getPropertyValue("--standard-sif-colour");
    specialSifColour = rootStyles.getPropertyValue("--special-sif-colour");
    dimSifColour = rootStyles.getPropertyValue("--dim-sif-colour");
});

class Building {
    constructor() {
        this.distance = 1;
        this.angle = .5;
        this.style = "A";
        this.height = .5;
    }
}
class City {
    constructor() {
        this.buildinigs = [];
    }
    addBuilding() {
        this.building.push(new Building());
    }
    demolishBuilding(index) {
        this.buildinigs.splice(index, 0);
    }
}
function setup() {
    let headerAnimation = document.getElementById("header-animation");
    let ani = createCanvas(headerAnimation.offsetWidth, headerAnimation.offsetHeight);
    ani.parent("header-animation");
    background(dimIngridColour);
    addEventListener("resize", (event) => {
        ani.resize(headerAnimation.offsetWidth, headerAnimation.offsetHeight);
        background(dimIngridColour);
    })
}

function draw() {
    //background(color(random(0, 256), random(0, 256), random(0, 256)));
}