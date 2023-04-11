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
  let _width = windowWidth, _height = windowHeight;
  if (_width>_height) _width = _height;
  else _height = _width;
  createCanvas(_width, _height);
  
  pos = []; pos = [];
  bList = [];
  
  for (let a=50;a<width-30;a+=(width-100)/10) {
    pos.push(a);
  }
  
  angleMode(DEGREES);
  
  for (let i=0;i<11;i++) {
    for (let j=0;j<11; j++) {
      let b = new Botch(pos[i], pos[j]);
      bList.push(b);
    }
  }
  
  pos = []; pos = [];
  
  for (let p=0;p<bList.length;p++) {
    bList[p].drawing();
  }
  
  state = 0;
  
  r = 50;
  s = 1;
  
  counter = 0;
  
  diameter = 50;
  
  changing = false;
  
  alpha = 0;

  mov = 0;
}

function draw() {
  let _width = windowWidth, _height = windowHeight;

  if (_width>_height) _width = _height;
  else _height = _width;

  createCanvas(_width, _height);

  for (let a=50;a<width-30;a+=(width-100)/10) pos.push(a);
  for (let b=50;b<height-30;b+=(height-100)/10) pos.push(b);
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
  r+=10;
  s+=0.05;
  rotate(r);
  scale(s);
  pop();
  for (let p=0;p<bList.length;p++) {
    bList[p].jiggle();
  }
  //b.randomov();
  //pop();
  overlay();
}

function mouseWheel(event) {
  diameter += event.delta/5;
  mov = event.delta > 5 ? event.delta : 0;
  alpha = alpha < 120 ? alpha+3 : 120;
}

function overlay() {
  fill(0, alpha);
  noStroke();
  rect(0, 0, width, height);
  alpha = alpha > 0 ? (alpha-1)/1.1 : 0;
  // if (changing && alpha!= 60) alpha+=3;
  // else if (changing && alpha == 60) changing = false;
  // else if (!changing && alpha != 0) alpha-=6;
}
