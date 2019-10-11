//beranek@oaulpar.cz

class spaceObject {  
  constructor(mass, diameter){
    if(mass > 0 && diameter > 0){
      this.mass = mass;
      this.diameter = diameter;
    }
  }
}

class planet extends spaceObject {
  constructor(mass, diameter = random(1,5), solidOrGas,ellipseDimensions = [300,200], starWhichRotatesAround = star) {
    super(mass,diameter);
    //to be implemented
    if(solidOrGas == "Solid" || solidOrGas == "Gas") {
      this.solidOrGas = solidOrGas;
    }
    //Setting major axis and minor axis of orbit
    this.majorAxis = ellipseDimensions[0];
    this.minorAxis = ellipseDimensions[1];
    //Semi_major and semi_minor axes
    this.semi_major = this.majorAxis/2;
    this.semi_minor = this.minorAxis/2;
    //Setting Center of everything
    this.centerX = starWhichRotatesAround.helioCentrism()[0];
    this.centerY = starWhichRotatesAround.helioCentrism()[1];
    //G = (6,674 08 ± 0,000 31)×10−11 m3·kg−1·s−2
    this.gravityConstant = 6.674e-11;
    this.firstFPSSkipped = false;
    this.speed = 0;
  }

  showOrbit() {
    push();
    noFill();
    stroke(255);
    strokeWeight(1);
    if(this.majorAxis > this.minorAxis) {
      ellipse(this.centerX + this.getFocus(), this.centerY, this.majorAxis, this.minorAxis);
    } else {
      ellipse(this.centerX, this.centerY + this.getFocus(), this.majorAxis, this.minorAxis);
    }
    pop();
  }

  getFocus() {
    if(this.semi_major > this.semi_minor) {
      return ceil(Math.sqrt((Math.pow(this.semi_major,2) - Math.pow(this.semi_minor,2))));
    } else {
      return ceil(Math.sqrt((Math.pow(this.semi_minor,2) - Math.pow(this.semi_major,2))));
    }
  }
  
  showAround(StarMass) {
    //Function description, semi major and semi minor axes are providing width
    //of travel, centers + focus are providing the position
    //SKIP FIRST FRAME TO SET FIRST SPEED VALUE
    if(this.firstFPSSkipped){
      if(this.semi_major > this.semi_minor) {
        this.x = this.centerX + (this.semi_major * sin(this.speed * HALF_PI)) + this.getFocus();
        this.y = this.centerY + (this.semi_minor * cos(this.speed * HALF_PI));
      } else if (this.semi_major <= this.semi_minor){
        this.x = this.centerX + (this.semi_major * sin(this.speed * HALF_PI));
        this.y = this.centerY + (this.semi_minor * cos(this.speed * HALF_PI)) + this.getFocus();
      }
    } else {
      this.x = 0
      this.y = 0
      this.firstFPSSkipped = true;
    }
    //Speed will differentiate when planet is close to star or far from it
    this.speed += Math.sqrt((StarMass*this.gravityConstant)/dist(this.centerX,this.centerY,this.x,this.y));
    push();
    stroke(0);
    strokeWeight(2);
    fill(255);
    circle(this.x,this.y, this.diameter);
    pop();
  }

  getPosition() {
    return [this.x, this.y];
  }
}

class star extends spaceObject{
  static instance;

  constructor(mass, diameter, centerDimensions = [width/2, height/2]) {
    //singleton
    if(!star.instance) {
      super(mass,diameter); 
      this.centerX = centerDimensions[0];
      this.centerY = centerDimensions[1];
      star.instance = this;     
    } else {
      super();
      this.instance = star.instance;
    }
  }
  
  showStar() {
    push();
    fill(255,195,0);
    noStroke();
    circle(this.centerX, this.centerY, this.diameter);
    pop();  
  }

  helioCentrism() {
    return [this.centerX, this.centerY];
  }

  getMass() {
    return this.mass;
  }
}

class comet extends spaceObject {
  constructor(mass, diameter = random(1,5),ellipseDimensions = [500,700], starWhichRotatesAround = star) {
    super(mass,diameter);
    //Setting major axis and minor axis of orbit
    this.majorAxis = ellipseDimensions[0];
    this.minorAxis = ellipseDimensions[1];
    //Semi_major and semi_minor axes
    this.semi_major = this.majorAxis/2;
    this.semi_minor = this.minorAxis/2;
    //Setting Center of everything
    this.centerX = starWhichRotatesAround.helioCentrism()[0];
    this.centerY = starWhichRotatesAround.helioCentrism()[1];
    //Storing vectors;
    this.history = [];
    //G = (6,674 08 ± 0,000 31)×10−11 m3·kg−1·s−2
    this.gravityConstant = 6.674e-11;
    this.firstFPSSkipped = false;
    this.speed = 0;
  }

  showOrbit() {
    push();
    noFill();
    stroke(255);
    strokeWeight(1);
    if(this.majorAxis > this.minorAxis) {
      ellipse(this.centerX + this.getFocus(), this.centerY, this.majorAxis, this.minorAxis);
    } else {
      ellipse(this.centerX, this.centerY + this.getFocus(), this.majorAxis, this.minorAxis);
    }
    pop();
  }

  getFocus() {
    if(this.semi_major > this.semi_minor) {
      return ceil(Math.sqrt((Math.pow(this.semi_major,2) - Math.pow(this.semi_minor,2))));
    } else {
      return ceil(Math.sqrt((Math.pow(this.semi_minor,2) - Math.pow(this.semi_major,2))));
    }
  }
  
  showAround(StarMass) {
    //Function description, semi major and semi minor axes are providing width
    //of travel, centers + focus are providing the position
    //SKIP FIRST FRAME TO SET FIRST SPEED VALUE
    if(this.firstFPSSkipped){
      if(this.semi_major > this.semi_minor) {
        this.x = this.centerX + (this.semi_major * sin(this.speed * HALF_PI)) + this.getFocus();
        this.y = this.centerY + (this.semi_minor * cos(this.speed * HALF_PI));
      } else if (this.semi_major <= this.semi_minor){
        this.x = this.centerX + (this.semi_major * sin(this.speed * HALF_PI));
        this.y = this.centerY + (this.semi_minor * cos(this.speed * HALF_PI)) + this.getFocus();
      }
    } else {
      this.x = 0
      this.y = 0
      this.firstFPSSkipped = true;
    }
    //Speed will differentiate when planet is close to star or far from it
    this.speed += Math.sqrt((StarMass*this.gravityConstant)/dist(this.centerX,this.centerY,this.x,this.y));
    push();
    stroke(0);
    strokeWeight(2);
    fill(255);
    circle(this.x,this.y, this.diameter);
    // this creates trail of the comet
    let vector = createVector(this.x,this.y);
    this.history.push(vector);
    if(this.history.length >= 15) {
      this.history.splice(0,1);
    }
    for(let i = 0; i <= this.history.length; i++) {
      let pos = this.history[i];
      if(pos != undefined) {
        fill(180,255,250);
        circle(pos.x,pos.y, this.diameter);
      }
    }
    pop();
  }
}

class moon extends spaceObject {
  constructor(mass, diameter, planetWhichRotatesAround = planet){
    super(mass, diameter);
    this.rotationSpeed = 0;
    this.x;
    this.y;
    this.planetWhichRotatesAround = planetWhichRotatesAround;
  }
  
  rotateAround(speed = 0.01, distance = 100){

    this.centerX = this.planetWhichRotatesAround.getPosition()[0];
    this.centerY = this.planetWhichRotatesAround.getPosition()[1];
    this.rotationSpeed += speed;
    //console.log(this.rotationSpeed);
    this.x = this.centerX + Math.cos(this.rotationSpeed * HALF_PI) * distance;
    this.y = this.centerY + Math.sin(this.rotationSpeed * HALF_PI) * distance;
    console.log(Math.cos(this.rotationSpeed * HALF_PI))

    push();
    stroke(0);
    strokeWeight(2);
    fill(255);
    circle(this.x,this.y, this.diameter);
    pop();
  }
}

//MAIN

let s,b,m;
let v,k,sun,moon2,sun2, moonM,moonM2;
let cometH;
let backgroundColor = 0;
let x = 1200;
let y = 1000;
let sunWeight = 10e8;
let dms = [800,600];
let dms2 = [400,500];
let dms3 = [600,750]


function setup() {
  createCanvas(x,y);
  sun = new star(sunWeight, 20, [1,1]);
  //sun2 = new star(10e9,50, [1,1]);
  cometH = new comet(100,3, [600,400], sun);
  v = new planet(100,5,"Gas",dms,sun);
  k = new planet(8,3,"Solid",dms2, sun);
  m = new planet(20,6,"Gas",dms3, sun);
  moon2 = new moon(2, 4,v);
  moonM = new moon(2,3,m);
  moonM2 = new moon(2,3,m);
}


function draw() {
  background(backgroundColor)
  
  translate(x/2,y/2);
  sun.showStar();
  //cometH.showOrbit();
  push();
  rotate(Math.PI/4);
  cometH.showAround(sun.getMass());
  rotate(Math.PI/4);
  v.showOrbit();
  v.showAround(sun.getMass());
  moon2.rotateAround(0.1,50);
  rotate(Math.PI/6)
  m.showAround(sun.getMass());
  m.showOrbit();
  moonM.rotateAround(0.15,40);
  moonM2.rotateAround(0.1,20);

  rotate(Math.PI/2);
  //k.showOrbit();
  k.showAround(sun.getMass());
}