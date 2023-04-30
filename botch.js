class Botch {
  constructor(_x, _y) {
    this.c = createVector(_x, _y);
    this.rgb = [random(180, 255), random(0, 60), random(0, 90)];
    this.d = 2;
    this.p = [];
    this.prgb = [[], [], []];
    this.tri = [[], []];
    this.delay = 0;
    this.movMin = 0.5;
    this.movMax = 1.71;
  }
  
  drawing() {
    for (let i=0;i<10;i++) {
      this.prgb[0].push(this.rgb[0]+random(-10, 20));
      this.prgb[1].push(this.rgb[1]+random(-10, 10));
      this.prgb[2].push(this.rgb[2]+random(-10, 10));
      this.p.push(createVector(random(-10, 10), random(-10, 10)));
      this.tri[0].push(round(random(0,1),0)); this.tri[1].push(round(random(0,1),0));
      if (this.tri[0][i]==0) this.tri[0][i] = -1;
      if (this.tri[1][i]==0) this.tri[1][i] = -1;
    }
  }
  
  jiggle() {
    fill(this.r, this.g, this.b);
    noStroke();
    
    for (let i=0;i<10;i++) {
      if (this.p[i].x>25) {
        this.tri[0][i] = -1;
      } else if (this.p[i].x<-25) {
        this.tri[0][i] = 1;
      }
      if (this.p[i].y>25) {
        this.tri[1][i] = -1;
      } else if (this.p[i].y<-25) {
        this.tri[1][i] = 1;
      }
    
      this.p[i].add(random(this.movMin, this.movMax) * this.tri[0][i], random(this.movMin, this.movMax) * this.tri[1][i]);

      this.p[i].x /= 1.05;
      this.p[i].y /= 1.05;
      
      fill(this.prgb[0][i], this.prgb[1][i], this.prgb[2][i]);
      ellipse(this.p[i].x+this.c.x, this.p[i].y+this.c.y, this.d);
    }
  }
  
  change(_d) {
    this.d = _d;
  }
  
}