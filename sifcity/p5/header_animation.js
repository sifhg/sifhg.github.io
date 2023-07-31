let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let aStream = new PerlinStream(0);
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

let theCity = new City(.75, .25);


let speed = 1;

function draw() {
    rect(0, 0, canvas.width, canvas.height, false, addAlpha(backgroundColour, 25));

    //circle(1*canvas.width/4, map(aStream.slow, 0, 1, 0, canvas.height), 20, "RED", false);
    //circle(2*canvas.width/4, map(aStream.medium, 0, 1, 0, canvas.height), 20, "BLUE", false);
    //circle(3*canvas.width/4, map(aStream.fast, 0, 1, 0, canvas.height), 20, "GREEN", false);
    aStream.update();

    
    //Generate house
    if(Math.random()*30 < 1) {
        theCity.addBuilding(map(aStream.fast, 0, 1, Math.PI/6, Math.PI*5/4), "A");
    }

    theCity.display(4);
    theCity.update(speed);

    window.requestAnimationFrame(draw);
}