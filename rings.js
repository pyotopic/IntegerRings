const WIDTH = 500;
const HEIGHT = 500;

let numPoints = 10;
let plane = new Plane();
let integers = new IntegerRing(5);


function setup() {
    // put setup code here
    createCanvas(WIDTH, HEIGHT);
    background(0);
    plane.display();
    integers.showPoints();
  }

function draw() {
    background(0);
    translate(WIDTH/2,HEIGHT/2);
    //there
    strokeWeight(10);
    plane.display();
    integers.showPoints();
}

function mouseWheel(event){
    plane.zoom += event.delta;
}