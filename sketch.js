let pos;
let bList;
let r, s, sList;
let diameter;
let alpha;
let change;

function setup() {
  //handling canvas size
  scaleCanvas();
  
  pos = [];
  for (let a=0, n=(width-50-20)/50; a<n; a++) {
    pos.push(a*50+50-width/2);
  }
  
  bList = [];
  for (let i=0, n=pos.length;i<n;i++) {
    for (let j=0;j<n; j++) {
      let b = new Botch(pos[i], pos[j]);
      bList.push(b);
    }
  }
  for (let p=0;p<bList.length;p++) {
    bList[p].drawing();
  }
  
  r = 0;
  sList = [];
  
  diameter = 27;
  alpha = 0;
  change = 0;

  angleMode(DEGREES);
}

function draw() {
  let prevWidth = width;
  scaleCanvas();

  for (let i=0, n=bList.length; i<n; i++) {
    bList[i].x *= width / prevWidth;
    bList[i].y *= width / prevWidth;
    bList[i].change(diameter);
  }

  background(220);
  
  push();
  translate(width/2, height/2);

  push();
  r += s < 0 ? -0.05 : 0.05;
  s = r / 200 - 0.6;
  rotate(r);
  scale(s);
  for (let p=0;p<bList.length;p++) {
    bList[p].jiggle();
  }
  pop();

  sineCircle();
  pop();

  overlay();
}

function mouseWheel(event) {
  diameter = abs(diameter) < 60 ? diameter + event.deltaY/5 : -diameter/abs(diameter) * 59.99;
  r -= event.deltaX/10;
  s -= s/abs(s) * event.deltaX/20;
  alpha = alpha < 170 ? alpha+3 : 170;
  console.log(width, diameter);
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
  alpha = alpha > 0 ? (alpha-1)/1.2 : 0;
}

function sineCircle() {
  push();

  sList.push(s);
  if (sList.length > 30) {
    sList.shift();
  }

  scale(sList[0]);

  let radius = width*6/11;

  fill('#cb2e3114');

  beginShape();
  for (let i=0; i<=360; i++) {
    let l = radius + radius/11 + 10*sin(i*15 + change);
    let x = l * cos(i);
    let y = l * sin(i);
    curveVertex(x, y);
  }
  endShape(CLOSE);

  beginShape();
  for (let i=0; i<=360; i++) {
    let l = radius + 35*sin(i*6 + change*2+180);
    let x = l * cos(i);
    let y = l * sin(i);
    curveVertex(x, y);
  }
  endShape(CLOSE);

  beginShape();
  for (let i=0; i<=360; i++) {
    let l = radius + radius/15 + 15*sin(i*9 + change*1.5+120);
    let x = l * cos(i);
    let y = l * sin(i);
    curveVertex(x, y);
  }
  endShape(CLOSE);

  change += s < 0 ? -1.5 : 1.5;

  pop();
}