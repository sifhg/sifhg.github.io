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

function polarizor(x, f) {
    //Link to Mathematical formula: https://www.geogebra.org/classic/qbcf5yea
    //x is the input value to be polarized.
    //f is the force of which x will be polarized.
    //if f is 0, x will be polarized to either 0 or 1.
    //if f is 1, x almost wont be changed.

    if(typeof x !== 'number' || typeof f !== 'number') {
        throw new Error(`Inputs must be numbers. \nType of x is "${typeof x}"\nType of f is "${typeof f}"`);
    }
    if(x > 1 || x < 0) {
        console.warn(`WARNING: polarizor() might not work as intended when the input, x is out of range (0 to 1)\nx = ${x}`);
    }
    if(x > .5) {
        return ((x*f) + (1*(x-.5))) / (f + (x-.5));
    } else if(x < .5) {
        return ((x*f) + (0*(-2*x +1))) / (f + (1-(2*x)));
    } else {
        return .5;
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