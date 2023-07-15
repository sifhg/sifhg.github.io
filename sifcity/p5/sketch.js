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

function addAlpha(colour, alpha) {
    //add alpha to a colour
    const R = red(colour);
    const G = green(colour);
    const B = blue(colour);
    return color(R, G, B, alpha);
}

class Building {
    constructor(C, a) {
        this.distance = 0;
        this.angle = a;
        this.style = "A";
        this.height = .5;
        this.center = C;
    }
    getCartesianCoordinates() {
        let cartesianCoordinates = {
            x: sin(this.angle) * this.distance,
            y: cos(this.angle)*this.distance
        };
        return cartesianCoordinates;
    }
    display(p) {
        //p is the perspective acceleration
        let displatCoordinates = {
            x: this.getCartesianCoordinates().x*(width/2) + (this.center.x*width),
            y: (this.getCartesianCoordinates().y + sq(p*this.getCartesianCoordinates().y)) *(height/2) + (this.center.y*height)
        };

        circle(displatCoordinates.x, displatCoordinates.y, 10);
    }
    update(speed) {
        this.distance += speed;
    }
}
class City {
    constructor() {
        this.buildings = [];
        this.center = {
            x: .75,
            y: .25
        };
    }
    addBuilding(angle) {
        this.buildings.push(new Building(this.center, angle));
    }
    demolishBuilding(index) {
        this.buildings = this.buildings.slice(0, index).concat(this.buildings.slice(index + 1));
    }
    updateCity(speed) {
        for(const BUILDING of this.buildings) {
            BUILDING.update(speed);
        }
    }
    displayCity(p, cutoff) {
        //p is the perspective acceleration
        for(let b = 0; b < this.buildings.length; b++) {
            const ALPHA = (this.buildings[b].getCartesianCoordinates().y < cutoff) ? map(this.buildings[b].getCartesianCoordinates().y, cutoff/4, cutoff, 0, 255) : 255;
            fill(addAlpha(specialIngridColour, ALPHA));
            stroke(addAlpha(specialIngridColour, ALPHA));
            this.buildings[b].display(p);
            if (this.buildings[b].getCartesianCoordinates().y > 1 ||
            this.buildings[b].getCartesianCoordinates().y < -1) {
                this.demolishBuilding(b);
            }
        }
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

class PerlinStreams {
    constructor(seed) {
        this.time = seed;
        this.fast = noise(this.time * .005 +10);
        this.medium = noise(this.time * .0025 +100);
        this.slow = noise(this.time * .00125 +1000);
    }
    update() {
        this.time++;
        this.fast = polarizor(noise(this.time * .005 +10), .3);
        this.medium = polarizor(noise(this.time * .0025 +100), .2);
        this.slow = polarizor(noise(this.time * .00125 +1000), .1);
    }
}

let aPerlinStream;

function setup() {
    let headerAnimation = document.getElementById("header-animation");
    let ani = createCanvas(headerAnimation.offsetWidth, headerAnimation.offsetHeight);
    ani.parent("header-animation");
    background(addAlpha(dimIngridColour, 0));
    addEventListener("resize", (event) => {
        ani.resize(headerAnimation.offsetWidth, headerAnimation.offsetHeight);
        background(addAlpha(dimIngridColour, 0));
    });

    aPerlinStream = new PerlinStreams(100);
}

let theCity = new City();
theCity.addBuilding(-1.2);

const START = new Date();

function draw() {
    clear();
    theCity.displayCity(1, .25);
    theCity.updateCity(.005);

    //Counts number of iterations in 10 seconds
    if (new Date() - START <= 10000) {
        console.count("Draw iteration");
    }

    noStroke();
    fill(200, 20, 20, 127);
    circle(width*2/5, map(aPerlinStream.fast, 0, 1, 0, height), 30);
    fill(20, 200, 20, 127);
    circle(width*3/5, map(aPerlinStream.medium, 0, 1, 0, height), 30);
    fill(20, 20, 200, 127);
    circle(width*4/5, map(aPerlinStream.slow, 0, 1, 0, height), 30);
    aPerlinStream.update();
}