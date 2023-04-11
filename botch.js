class Botch {
  constructor(_x, _y) {
    this.x = _x; this.y = _y;
    this.r = random(180, 255);
    this.g = random(0, 60);
    this.b = random(0, 90);
    this.a = random(20, 75);
    this.d = 50;
    this.px = []; this.py = [];
    this.cx = []; this.cy = [];
    this.pr = []; this.pg = []; this.pb = []; this.pa = [];
    this.randX = []; this.randY = [];
    this.trigX = []; this.trigY = []; this.trans = 0;
    this.delay = 0;
  }
  
  drawing() {
    for (let i=0;i<10;i++) {
      this.pr.push(this.r+random(-10, 20));
      this.pg.push(this.g+random(-10, 10));
      this.pb.push(this.b+random(-10, 10));
      this.pa.push(this.a+random(-15, 15));
      this.px.push(random(-10, 10));
      this.py.push(random(-10, 10));
      this.cx.push(0);
      this.cy.push(0);
      this.trigX.push(round(random(0,1),0)); this.trigY.push(round(random(0,1),0));
      if (this.trigX[i]==0) this.trigX[i] = -1;
      if (this.trigY[i]==0) this.trigY[i] = -1;
    }
  }
  
  jiggle() {
    fill(this.r, this.g, this.b, 75);
    noStroke();
    //ellipse(this.x, this.y, this.d); /////////////////////////////////////////////////////
    for (let i=0;i<10;i++) {
      if (dist(this.px[i]+this.x, this.py[i]+this.y, this.x, this.y)>15) {
        if (this.px[i]+this.x>this.x) {
          this.trigX[i] = -1;
        }
        else if (this.px[i]+this.x<this.x) {
          this.trigX[i] = 1;
        }
        if (this.py[i]+this.y>this.y) {
          this.trigY[i] = -1;
        }
        else if (this.py[i]+this.y<this.y) {
          this.trigY[i] = 1;
        }
      }
      
      if (this.trigX[i]>0) {
        this.px[i] += random(0.2, 0.7)
      } else if (this.trigX[i]<0) {
        this.px[i] -= random(0.2, 0.7)
      }
      if (this.trigY[i]>0) {
        this.py[i] += random(0.2, 0.7)
      } else if (this.trigY[i]<0) {
        this.py[i] -= random(0.2, 0.7)
      }
      this.px[i] += random(0.2, 0.7) * this.trigX[i];
      this.py[i] += random(0.2, 0.7) * this.trigY[i];

      this.px[i] = this.px[i]/1.05;
      this.py[i] = this.py[i]/1.05;
      
      fill(this.pr[i], this.pg[i], this.pb[i], this.pa[i]);
      ellipse(this.px[i]+this.x, this.py[i]+this.y, this.d-5);
    }
  }
  
  randomov() {
    // TODO: insert delay ////////////////////////////////\\\\\\\\
    this.delay++;
    if (this.delay>9) {
      fill(this.r, this.g, this.b, 75);
      noStroke();
      ellipse(this.x, this.y, 50);
      for (let i=0;i<10;i++) {
        this.randX[i] = (width-100)/10*round(random(1, 10), 0);
        this.randY[i] = (height-100)/10*round(random(1, 10), 0);
        // TODO: change this to accelerate towards point ///////////\\\\\\\\\\\\\\\\\\\\\\\\
        this.px[i] = this.randX[i]; this.py[i] = this.randY[i];
        fill(this.pr[i], this.pg[i], this.pb[i], this.pa[i]);
        ellipse(this.px[i], this.py[i], this.d-5);
      }

      this.delay = 0;
    }
    
  }
  
  change(_x, _y, _d) {
    this.x = _x;
    this.y = _y;
    this.d = _d;
  }
  
}