let vehicles;

function setup(){
  createCanvas(windowWidth, windowHeight);
  
  vehicles = [];
  for (let i = 0; i < 50; i++) {
    const pos = createVector(
      random(width),
      random(height)
    );
    const velocity = p5.Vector.random2D();
    velocity.setMag(random(2, 4));
    const maxSpeed = 4;
    const maxForce = 2;
    
    
    vehicles.push(Vehicle.create(pos, velocity, maxSpeed, maxForce));
  }
}

function draw() {
  clear();

  vehicles.forEach(v => {
    Vehicle.flock(v, vehicles);
    Vehicle.update(v);
    Vehicle.draw(v, "#111");
  })
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


class Vehicle {
  // 位置・速度・最高速度・最大力
  static create(pos, velocity, maxSpeed, maxForce) {
    return {
      pos,
      velocity,
      acceleration: createVector(),
      maxSpeed,
      maxForce
    }
  }
  
  static update(v) {
    v.acceleration.limit(v.maxForce);
    v.velocity.add(v.acceleration);
    v.velocity.limit(v.maxSpeed);
    v.pos.add(v.velocity);
    v.acceleration.set(0);
    
    Vehicle.adjustEdge(v);
  }
  
  static adjustEdge(v) {
    if (v.pos.x < 0) {
      v.pos.x = 0;
      v.velocity.x *= -1;
    }
    else if (v.pos.x >= width) {
      v.pos.x = width - 1;
      v.velocity.x *= -1;
    }
    
    
    if (v.pos.y < 0) {
      v.pos.y = 0;
      v.velocity.y *= -1;
    }
    else if (v.pos.y >= height) {
      v.pos.y = height - 1;
      v.velocity.y *= -1;
    }
  }
  
  static draw(v, strokeColor) {
    push();
    // noFill();
    fill("#111");
    strokeWeight(2);
    stroke(strokeColor);
    translate(v.pos);
    rotate(v.velocity.heading());
    beginShape();
    const r = 8;
    vertex(r * 2, 0);
    vertex(-r, r);
    vertex(-r, -r);
    endShape(CLOSE);
    pop();
  }
  
  // 探す
  static seek(v, target) {
    const tv = p5.Vector.sub(target, v.pos);
    tv.limit(v.maxSpeed);
    const force = p5.Vector.sub(tv, v.velocity);
    v.acceleration.add(force);
  }
  
  // 逃げる
  static flee(v, target) {
    const tv = p5.Vector.sub(target, v.pos);
    tv.limit(v.maxSpeed);
    const force = p5.Vector.sub(tv, v.velocity);
    v.acceleration.sub(force);
  }
  
  // 洞察力
  static inSight(v, other){
    const d = dist(v.pos.x, v.pos.y, other.pos.x, other.pos.y);
    return d < 100;
  }
  
  // 整列
  static align(v, vehicles) {
    const avgVel = createVector();
    let n = 0;
    for (const other of vehicles) {
      if (v === other || !Vehicle.inSight(v, other)) continue;
      avgVel.add(other.velocity);
      n++;
    }
    
    if (n > 0) {
      avgVel.div(n);
      avgVel.limit(v.maxSpeed);
      v.acceleration.add(p5.Vector.sub(avgVel, v.velocity));
    }
  }
  
  // 分離
  static separation(v, boids) {
    for (const other of boids) {
      if (v === other || !Vehicle.inSight(v, other)) continue;
      
      const d = dist(v.pos.x, v.pos.y, other.pos.x, other.pos.y);
      if (d < 50) {
        Vehicle.flee(v, other.pos);
      }
    }
  }
  
  // 凝集
  static cohesion(v, boids) {
    let avgPos = createVector();
    let n = 0;
    for (const other of boids) {
      if (v === other || !Vehicle.inSight(v, other)) continue;
      
      avgPos.add(other.pos);
      n++;
    }
    
    if (n > 0) {
      avgPos.div(n);
      Vehicle.seek(v, avgPos);
    }
  }
  
  // 群れ
  static flock(v, boids) {
    Vehicle.align(v, boids);
    Vehicle.cohesion(v, boids);
    Vehicle.separation(v, boids);
  }
}