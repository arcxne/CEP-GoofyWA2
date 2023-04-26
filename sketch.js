/*

battleplan:

- changing cicle size and dist btwn circles and speed etc in app
- true bounce of circles
- when left click, initiate state where the particles move to other points
- when right click, initiate state where particles move to beat of galaxy brain meme

*/

let pos;
let bList;
let r, s;
let state;
let counter;
let diameter;
let changing;
let alpha;
let mov;

function setup() {
  //handling canvas size
  scaleCanvas();
  
  pos = [];
  bList = [];
  
  for (let a=50;a<width-30;a+=(width-100)/10) pos.push(a-width/2);
  
  angleMode(DEGREES);
  
  for (let i=0;i<11;i++) {
    for (let j=0;j<11; j++) {
      let b = new Botch(pos[i], pos[j]);
      bList.push(b);
    }
  }
  
  pos = [];
  
  for (let p=0;p<bList.length;p++) {
    bList[p].drawing();
  }
  
  state = 0;
  
  r = 50;
  s = 1.2;
  
  counter = 0;
  diameter = 55;
  changing = false;
  alpha = 0;
  mov = 0;
}

function draw() {
  scaleCanvas();

  for (let a=50;a<width-30;a+=(width-100)/10) pos.push(a-width/2);
  let num = 0;

  for (let i=0;i<11;i++) {
    for (let j=0;j<11; j++) {
      bList[num].change(pos[i], pos[j], diameter);
      num++;
    }
  }

  pos = [];
  
  background(220);
  push();
  translate(width/2, height/2);
  r+=0.05;
  s+=0.00005;
  rotate(r);
  scale(s);
  for (let p=0;p<bList.length;p++) {
    bList[p].jiggle();
  }
  pop();
  
  overlay();
}

function mouseWheel(event) {
  diameter += event.deltaY/5;
  mov = event.deltaY > 5 ? event.deltaY : 0;
  alpha = alpha < 120 ? alpha+3 : 120;
}

function scaleCanvas() {
  let _width = windowWidth, _height = windowHeight;
  if (_width>_height) _width = _height;
  else _height = _width;
  createCanvas(_width, _height);
}

function overlay() {
  fill(0, alpha);
  noStroke();
  rect(0, 0, width, height);
  alpha = alpha > 0 ? (alpha-1)/1.1 : 0;
}
