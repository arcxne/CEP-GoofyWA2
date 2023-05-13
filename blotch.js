// link to documentation (I'm pretty sure documentation means 
// commenting code and not writing a separate document but 
// I'm lazy to bring over everything from the notion document):
//
//https://www.notion.so/Documentation-3332a90821fd4465b813582f88cd248f?pvs=4

class Blotch {
  constructor(_x, _y) {
    this.c = createVector(_x, _y);
    this.rgb = [random(180, 255), random(0, 60), random(0, 90)];
    this.d = 2;
    this.p = [];
    this.prgb = [[], [], []];
    this.tri = [[], []];
    this.movMin = 0.5;
    this.movMax = 1.71;
    this.num = 10;
  }
  
  drawing() {
    for (let i=0;i<this.num;i++) {
      this.prgb[0].push(this.rgb[0]+random(-10, 20));
      this.prgb[1].push(this.rgb[1]+random(-10, 10));
      this.prgb[2].push(this.rgb[2]+random(-10, 10));
      this.p.push(createVector(random(-10, 10), random(-10, 10)));
      this.tri[0].push(round(random(0,1),0));
      this.tri[1].push(round(random(0,1),0));
      this.tri[0][i] = this.tri[0][i] === 0 ? -1 : this.tri[0][i];
      this.tri[1][i] = this.tri[1][i] === 0 ? -1 : this.tri[1][i];
    }
  }
  
  jiggle() {
    strokeWeight(7);
    stroke(0);
    
    for (let i = 0; i < this.num; i++) {
      if (abs(this.p[i].x) > 25) {
        this.tri[0][i] *= -1;
      }
      if (abs(this.p[i].y) > 25) {
        this.tri[1][i] *= -1;
      }
      
      this.p[i].add(random(this.movMin, this.movMax) * this.tri[0][i],
                    random(this.movMin, this.movMax) * this.tri[1][i]);

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