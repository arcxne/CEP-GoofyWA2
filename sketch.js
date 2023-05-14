let pos;                                      // positions of blotches
let bList;                                    // list of blotches
let r;                                        // rotation of blotches
let s, sList;                                 // scale of canvas
let diameter, maxDiameter;                    // diameter of blotches
let alpha;                                    // opacity of overlay
let change;                                   // change in sineCircle
let scrolling;                                // bool to trigger overlay states
let scrolling2;                               // bool for checking if scrolling

function setup() {
  scaleCanvas();                              // handling canvas size
  
  pos = [];
  for (let a=0, n=(width-50-20)/50; a<n; a++) {
    pos.push(a*50+50-width/2);                // get positions of blotches
  }
  
  bList = [];
  for (let i=0, n=pos.length;i<n;i++) {
    for (let j=0;j<n; j++) {
      let b = new Blotch(pos[i], pos[j]);
      bList.push(b);                          // create blotches
    }
  }
  for (let p=0;p<bList.length;p++) {
    bList[p].drawing();                       // draw blotches
  }
  
  // setting up variables
  r = 0;
  sList = [];
  
  diameter = 27; maxDiameter = 60;
  alpha = 0;
  change = 0;
  scrolling = false; scrolling2 = false;

  angleMode(DEGREES);
}

function draw() {
  let prevWidth = width;

  scaleCanvas();                              // handling canvas size

  for (let i=0, n=bList.length; i<n; i++) {   // changing size and distance of blotches
    bList[i].x *= width / prevWidth;          // based on canvas
    bList[i].y *= width / prevWidth;
    bList[i].change(diameter);
  }  

  push();
  translate(width/2, height/2);               // shift origin to centre
  push();                                     // rotation and scaling of visuals
  
  r += s < 0 ? -0.05 : 0.05;                  // direction of rotation based on scale
  s = r / 200 - 0.6;                          // based on rotation of canvas
  rotate(r);
  scale(s);

  for (let p=0;p<bList.length;p++) {
    bList[p].jiggle();                        // move blotches
  }
  
  pop();
  sineCircle();                               // draw sineCircle
  pop();
  overlay();                                  // draw overlay
  scrolling2 = false;                         // reset to confirm if scrolling
}

// using scroll to set diameter, rotation, scale and opacity of overlay
function mouseWheel(event) {
  diameter = abs(diameter) < maxDiameter ? diameter + event.deltaY/5 : -Math.sign(diameter) * (maxDiameter - 0.01);
  r -= event.deltaX/10;
  s -= s/abs(s) * event.deltaX/20;
  scrolling = true;
  scrolling2 = true;
}

// scale canvas to square
function scaleCanvas() {
  let _width = windowWidth, _height = windowHeight;
  if (_width>_height) _width = _height;
  else _height = _width;
  createCanvas(_width, _height);
  background(220);
}

// overlay effect when scrolling
function overlay() {

  // change opacity of overlay

  if (scrolling === true) {
    alpha = alpha < 100 ? alpha+4 : 100;
  } else {
    alpha = alpha > 0 ? alpha-4 : 0;
  }
  if (alpha === 100 && scrolling2 === false) {
    scrolling = false;
  }
  
  // overall overlay
  fill(200, 60-alpha*1.5, 60-alpha*1.5, alpha);
  noStroke();
  rect(0, 0, width, height);

  if (alpha > 0) {

    // bar showing diameter of blotches
    fill(200, 60-alpha*1.5, 60-alpha*1.5, alpha);
    rect(width*7/8, height*3/4, width/13, height/13*2);    
    fill(200, 60-alpha*1.5, 60-alpha*1.5, alpha);
    rect(width*7/8, height*3/4 + width/13, width/13, ((diameter))*width/13/60);
  }
}

// draws sine circles
function sineCircle() {

  push();

  sList.push(s);
  if (sList.length > 30) {
    sList.shift();                            // keep track of scale
  }
  scale(sList[0]);

  let radius = width*6/11;                    // radius of sine circle

  fill('#cb2e3114');
  beginShape();                               // first sine circle
  for (let i=0; i<=360; i++) {
    let l = radius + radius/11 + 10*sin(i*15 + change);
    let x = l * cos(i);
    let y = l * sin(i);
    curveVertex(x, y);
  }
  endShape(CLOSE);
  beginShape();                              // second sine circle
  for (let i=0; i<=360; i++) {
    let l = radius + 35*sin(i*6 + change*2+180);
    let x = l * cos(i);
    let y = l * sin(i);
    curveVertex(x, y);
  }
  endShape(CLOSE);
  beginShape();                               // third sine circle
  for (let i=0; i<=360; i++) {
    let l = radius + radius/15 + 15*sin(i*9 + change*1.5+120);
    let x = l * cos(i);
    let y = l * sin(i);
    curveVertex(x, y);
  }
  endShape(CLOSE);

  change += s < 0 ? -1.5 : 1.5;               // setting scale of sine circle based on 
                                              // scale of canvas
  pop();
}