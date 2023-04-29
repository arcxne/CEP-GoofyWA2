class Botch {
  constructor(_x, _y) {
    this.x = _x; this.y = _y; // use vector
    this.r = random(180, 255);
    this.g = random(0, 60);
    this.b = random(0, 90); // 1 list
    this.d = 2;
    this.p = [[]];
    this.cx = []; this.cy = []; // 1 list
    this.pr = []; this.pg = []; this.pb = []; this.pa = []; // 1 list
    this.trigX = []; this.trigY = []; // 1 list
    this.delay = 0;
    this.movMin = 0.3;
    this.movMax = 2;
  }
  
  drawing() {
    for (let i=0;i<10;i++) {
      this.pr.push(this.r+random(-10, 20));
      this.pg.push(this.g+random(-10, 10));
      this.pb.push(this.b+random(-10, 10));
      this.p.push([random(-10, 10), random(-10, 10)]);
      this.cx.push(0);
      this.cy.push(0);
      this.trigX.push(round(random(0,1),0)); this.trigY.push(round(random(0,1),0));
      if (this.trigX[i]==0) this.trigX[i] = -1;
      if (this.trigY[i]==0) this.trigY[i] = -1;
    }
  }
  
  jiggle() {
    fill(this.r, this.g, this.b);
    noStroke();
    
    for (let i=0;i<10;i++) {
      if (this.p[i][0]>25) {
        this.trigX[i] = -1;
      } else if (this.p[i][0]<-25) {
        this.trigX[i] = 1;
      }
      if (this.p[i][1]>25) {
        this.trigY[i] = -1;
      } else if (this.p[i][1]<-25) {
        this.trigY[i] = 1;
      }
    
      this.p[i][0] += random(this.movMin, this.movMax) * this.trigX[i];
      this.p[i][1] += random(this.movMin, this.movMax) * this.trigY[i];

      this.p[i][0] = this.p[i][0]/1.05;
      this.p[i][1] = this.p[i][1]/1.05;
      
      fill(this.pr[i], this.pg[i], this.pb[i]);
      ellipse(this.p[i][0]+this.x, this.p[i][1]+this.y, this.d);
    }
  }
  
  change(_x, _y, _d) {
    this.x = _x;
    this.y = _y;
    this.d = _d;
  }
  
}