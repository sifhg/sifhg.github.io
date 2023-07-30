let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let aStream = new PerlinStream(0);
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

let theCity = new City(.75, .25);
for(let b = Math.PI/8; b < Math.PI*63/64; b+=.05) {
    theCity.addBuilding((b*4+Math.PI*63/64)/5, "A");
}

let speed = 1;

function draw() {
    rect(0, 0, canvas.width, canvas.height, false, addAlpha(backgroundColour, 25));

    circle(1*canvas.width/4, map(aStream.slow, 0, 1, 0, canvas.height), 20, "RED", false);
    circle(2*canvas.width/4, map(aStream.medium, 0, 1, 0, canvas.height), 20, "BLUE", false);
    circle(3*canvas.width/4, map(aStream.fast, 0, 1, 0, canvas.height), 20, "GREEN", false);
    aStream.update();

    theCity.display(.0375);
    theCity.update(speed);

    window.requestAnimationFrame(draw);
}