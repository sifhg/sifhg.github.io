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
    draw();
});

addEventListener("resize", (event) => {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
})

function circle(x, y, r, strokeColour, fillColour) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2, true);
    ctx.closePath();
    if(!(fillColour == undefined || fillColour == false)) {
        ctx.fillStyle = fillColour;
        ctx.fill();
    }else {
        ctx.fillStyle = "transparent";
    }
    if(strokeColour == undefined) {
        ctx.strokeStyle = "#000000";
        ctx.stroke();
    }else if(strokeColour == false) {
        ctx.strokeStyle = "none";
    }else {
        ctx.strokeStyle = strokeColour;
        ctx.stroke();
    }
    
}

function addAlpha(color, alpha) {
    let r, g, b;
  
    if(!(alpha >= 0)) {
        throw new Error(`alpha = ${alpha}. In addAlpha(colour, alpha). Invalid argument for alpha. alpha must be a number of a value more than or equal to 0.`)
    }

    // Check if the color is in HSL format (e.g., "hsl(170, 45%, 25%)")
    if (/^hsl\(\d+, \d+%?, \d+%?\)$/.test(color)) {
      const [h, s, l] = color.match(/\d+/g).map(Number);
      ({ r, g, b } = hslToRgb(h, s, l));
    }
    // Check if the color is in RGB format (e.g., "rgb(10, 245, 125)")
    else if (/^rgb\(\d+, \d+, \d+\)$/.test(color)) {
      [r, g, b] = color.match(/\d+/g).map(Number);
    }
    // Check if the color is in hexadecimal format (e.g., "#05afcc")
    else if (/^#[0-9a-fA-F]{6}$/.test(color)) {
      r = parseInt(color.slice(1, 3), 16);
      g = parseInt(color.slice(3, 5), 16);
      b = parseInt(color.slice(5, 7), 16);
    }
    // Invalid color format
    else {
      throw new Error("Invalid color format. Accepted formats: HSL, RGB, or Hexadecimal.");
    }
    return `rgb(${r}, ${g}, ${b}, ${alpha}%)`;
}

function rect(x0, y0, x1, y1, strokeColour, fillColour) {
    if(fillColour == undefined || fillColour == false) {
        ctx.strokeRect(x0, y0, x1, y1);
    }else {
        ctx.fillStyle = fillColour;
        ctx.fillRect(x0, y0, x1, y1);
    }
    
    if(strokeColour == undefined) {
        ctx.strokeStyle = "#000000";
        ctx.stroke();
    }else if(strokeColour == false) {
        ctx.strokeStyle = "none";
    }else {
        ctx.strokeStyle = strokeColour;
        ctx.stroke();
    }
}
function hslToRgb(h, s, l) {
    // Convert HSL values to [0, 1] range
    h /= 360;
    s /= 100;
    l /= 100;
  
    let r, g, b;
  
    if (s === 0) {
      // If the saturation is 0, it's a shade of gray, and R, G, and B are all equal to L
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
  
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
  
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
  
    // Convert RGB values to [0, 255] range
    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);
  
    return { r, g, b };
  }

function map(i, imin, imax, omin, omax) {
    return (((i-imin)/(imax-imin))*omax-omin) + omin;
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

function distance(x0, y0, x1, y1) {
    const XD = x0 - x1;
    const YD = y0 - y1;
    return Math.sqrt(Math.pow(XD, 2) + Math.pow(YD, 2));
}

class PerlinStream {
    constructor(seed) {
        this.s = seed;
        this.t = .1;
        this.update();
    }
    update() {
        this.t++;
        this.fast = polarizor(map(perlin.get(this.s+0, this.t*.025), -1, 1, 0, 1), .2);
        this.medium = polarizor(map(perlin.get(this.s+1, this.t*.0075), -1, 1, 0, 1), .1);
        this.slow = polarizor(map(perlin.get(this.s+2, this.t*.001), -1, 1, 0, 1), .05);
    }
}

class City {
    constructor(centerXp, centerYp) {
        this.buildings = [];
        this.time = 0;
        if(!(centerXp >= 0 && centerXp <= 1 && centerYp >= 0 && centerYp <= 1)) {
            throw new Error(`centerXp = ${centerXp}; centerYp = ${centerYp}. centerXp and centerYp must be numbers in the range 0<=n<=1`);
        }
        this.center = {
            x: centerXp,
            y: centerYp
        }
    }
    addBuilding(angle, style) {
        this.buildings.push(new Building(angle, style, this.time));
    }
    demolishBuilding(index) {
        this.buildings = this.buildings.slice(0, index).concat(this.buildings.slice(index + 1));
    }
    update(speed) {
        this.time += speed;
    }
    abstract2Concrete(ac, dim, dist, pos, a) {
        const ABSTRACT = ac;
        const DIMENSIONS = dim;
        const ANGLE = a;
        const HEIGHT = pos.y - (this.center.y * canvas.height);
        const WIDTH = pos.x - (this.center.x * canvas.width);
        const DISTANCE = dist;

        let concrete = [];
        for(const COO of ABSTRACT) {
            let pointAngle = ANGLE - (COO.x * DIMENSIONS.width) - (COO.y * DIMENSIONS.height);
            const THETA_X = Math.PI - (Math.PI/2) - (pointAngle-Math.PI/2);
            const THETA_Y = Math.PI - pointAngle;
            const DIST_DIFF_X = COO.x * ((HEIGHT / Math.sin(THETA_X)) - DISTANCE);
            const DIST_DIFF_Y = -COO.y * ((WIDTH / Math.cos(THETA_Y)) - (COO.y * DISTANCE));
            const POINT_DISTANCE = DISTANCE + DIST_DIFF_X - DIST_DIFF_Y;

            concrete.push({
                x: Math.cos(pointAngle) * POINT_DISTANCE + (this.center.x * canvas.width),
                y: Math.sin(pointAngle) * POINT_DISTANCE + (this.center.y * canvas.height)
            })
        }
        console.log(concrete);
        return concrete;
    }
    getCartesianCoordinates(building, p) {
        //p is the perspective acceleration
        const TIME = this.time - building.birthTime;
        const INIT_X = Math.cos(building.angle) * TIME + (this.center.x * canvas.width);
        const INIT_Y = Math.sin(building.angle) * TIME + (this.center.y * canvas.height);
        const DIST = distance(.5, 1, map(INIT_X, 0, canvas.width, 0, 1), map(INIT_Y, this.center.y * canvas.height, canvas.height, 0, 1));
        const PERSPECTIVE_DIST = (TIME * Math.pow(2, (-p*DIST+p < 0) ? 0 : (-p*DIST+p)));

        const BUILDING_CENTER = {
            x: Math.cos(building.angle) * PERSPECTIVE_DIST + (this.center.x * canvas.width),
            y: Math.sin(building.angle) * PERSPECTIVE_DIST + (this.center.y * canvas.height)
        }

        const POINT_COOR = this.abstract2Concrete(building.coordinates, building.dimensions, PERSPECTIVE_DIST, BUILDING_CENTER, building.angle);
        return [BUILDING_CENTER].concat(POINT_COOR);
    }
    display(p) {
        //p is the perspective acceleration
        for(let b = 0; b < this.buildings.length; b++) {
            let C = this.getCartesianCoordinates(this.buildings[b], p);
            for(let p = 1; p < C.length; p++) {
                circle(C[p].x,C[p].y, 5, specialIngridColour, false);
            }
            //circle(C.x, C.y, 5, specialIngridColour, false);
            if(C[0].y > canvas.height || C[0].y < canvas.height*this.center.y || C[0].x < 0 || C[0].x > canvas.width) {
                this.demolishBuilding(b);
            }
        }
    }
}

class Building {
    constructor(a, S, bt) {
        this.angle = a;
        this.style = S;
        this.birthTime = bt;
        this.coordinates = this.getAbstractCoordinates();
        this.dimensions = {
            width: Math.PI/16,
            height: Math.PI/16,
            length: 10
        }
        this.width = Math.PI/16;

        if(typeof(this.angle) != "number") {
            throw new Error(`a = ${this.angle}, if of type ${typeof(this.angle)}. Building.constructor(). The angle argument, a, must be of type "number".`);
        }
        if(S != "A" && S != "B") {
            throw new Error(`S = ${this.style}. Building.constructor(). The style argument, S, must be a string: either "A" or "B".`);
        }
        if(typeof(this.birthTime) != "number") {
            throw new Error(`bt = ${this.birthTime}, if of type ${typeof(this.birthTime)}. Building.constructor(). The birth time argument, bt, must be of type "number".`);
        }
    }
    getAbstractCoordinates() {
        if(this.style == "A") {
            return [{
                x: 1,
                y: 0,
                t: 0
            },{
                x: 0,
                y: 0,
                t: 0
            },{
                x: 0,
                y: -1,
                t: 0
            },{
                x: 1,
                y: -1,
                t: 0
            }];
        }else if(this.style =="B") {
            return [{
                x: 1,
                y: 2,
                t: 0
            },{
                x: -1,
                y: 2,
                t: 0
            },{
                x: -1,
                y: 0,
                t: 0
            },{
                x: -1,
                y: -1,
                t: -.5
            },{
                x: 1,
                y: -1,
                t: -.5
            },{
                x: 1,
                y: 0,
                t: -1
            },{
                x: 1,
                y: 2,
                t: -1
            },{
                x: 1,
                y: 2,
                t: 0
            },{
                x: 1,
                y: 0,
                t: 0
            },{
                x: -1,
                y: 0,
                t: 0
            },]
        }else {
            throw new Error(`S = ${this.style}. Building.getAbstractCoordinates(). The building.style property must be a string: either "A" or "B".`);
        }
    }
}

//Thank you to Joe Iddon for providing this perlin noise function.
//This code is fetched from their Github repository, perlin, https://github.com/joeiddon/perlin
'use strict';
let perlin = {
    rand_vect: function(){
        let theta = Math.random() * 2 * Math.PI;
        return {x: Math.cos(theta), y: Math.sin(theta)};
    },
    dot_prod_grid: function(x, y, vx, vy){
        let g_vect;
        let d_vect = {x: x - vx, y: y - vy};
        if (this.gradients[[vx,vy]]){
            g_vect = this.gradients[[vx,vy]];
        } else {
            g_vect = this.rand_vect();
            this.gradients[[vx, vy]] = g_vect;
        }
        return d_vect.x * g_vect.x + d_vect.y * g_vect.y;
    },
    smootherstep: function(x){
        return 6*x**5 - 15*x**4 + 10*x**3;
    },
    interp: function(x, a, b){
        return a + this.smootherstep(x) * (b-a);
    },
    seed: function(){
        this.gradients = {};
        this.memory = {};
    },
    get: function(x, y) {
        if (this.memory.hasOwnProperty([x,y]))
            return this.memory[[x,y]];
        let xf = Math.floor(x);
        let yf = Math.floor(y);
        //interpolate
        let tl = this.dot_prod_grid(x, y, xf,   yf);
        let tr = this.dot_prod_grid(x, y, xf+1, yf);
        let bl = this.dot_prod_grid(x, y, xf,   yf+1);
        let br = this.dot_prod_grid(x, y, xf+1, yf+1);
        let xt = this.interp(x-xf, tl, tr);
        let xb = this.interp(x-xf, bl, br);
        let v = this.interp(y-yf, xt, xb);
        this.memory[[x,y]] = v;
        return v;
    }
}
perlin.seed();
