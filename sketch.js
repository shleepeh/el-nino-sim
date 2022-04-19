let img;
function preload() {
  img = loadImage('./leftarrow.png');
}

let particles;
let numParticles;
let warmstart;
let slider;
let descText;
function setup() {
  descText = createSpan('Trade Wind Strength');
  descText.position(10, 540);
  slider = createSlider(350, 800, 800);
  slider.position(10, 510);
  slider.style('width', '200px');
  particles = [];
  numParticles = 2000;
  createCanvas(1000, 500);
  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: random(300, 700),
      y: random(100, 400),
      dx: random(-1, 1),
      dy: random(-1, 1),
      lvl: 1,
    });
    if (particles[i].y > 250) {
      particles[i].lvl = 0;
    } else {
    }
  }
}

function draw() {
  s = slider.value();
  let warmstart = 930 - s;
  background(220);
  fill('red');
  rect(warmstart, 410, 300, 10);
  line(80, 400, 900, 400);
  line(100, 100, 100, 420);
  line(900, 400, 900, 420);
  line(80, 100, 100, 100);
  fill('black');
  textSize(15);
  textAlign(CENTER);
  text('West', 80, 440);
  text('East', 885, 440);
  text('Sea\nLevel', 45, 390);
  text('Troposphere', 50, 120);
  textSize(30);
  text('Pacific Ocean', 350, 480);
  textSize(20);
  text('Trade Winds', 860, 480);
  image(img, 750, 455, 40, 40);
  if (s > 500) {
    image(img, 700, 455, 40, 40);
  }
  if (s > 650) {
    image(img, 650, 455, 40, 40);
  }
  if (s > 750) {
    image(img, 600, 455, 40, 40);
  }
  for (let p of particles) {
    if (s > 550) {
      if (
        p.x > warmstart + 50 &&
        p.x < warmstart + 200 &&
        p.lvl == 0 &&
        random() > 0.92
      ) {
        p.lvl = 1;
      } else if (p.x > warmstart + 500 && p.lvl == 1 && random() > 0.95) {
        p.lvl = 0;
      }
      if (p.y > (p.lvl == 1 ? 150 : 350)) {
        p.dy += 0.5;
      } else {
        p.dy -= 0.5;
      }
      if (p.x > warmstart + 50) {
        p.dx += p.lvl == 1 ? -0.05 : 0.05;
      } else {
        p.dx -= 0.05;
      }
    } else {
      if (
        p.x > warmstart + 50 &&
        p.x < warmstart + 200 &&
        p.lvl == 0 &&
        random() > 0.92
      ) {
        p.lvl = 1;
      } else if (p.x < warmstart - 300 && p.lvl == 1 && random() > 0.95) {
        p.lvl = 0;
      } else if (p.x > warmstart + 300 && p.lvl == 1 && random() > 0.95) {
        p.lvl = 0;
      }
      if (p.lvl == 0 && p.x < warmstart) {
        p.dx -= 0.05;
      } else if (p.lvl == 0 && p.x > warmstart + 50) {
        p.dx += 0.05;
      }
      if (p.y > (p.lvl == 1 ? 150 : 350)) {
        p.dy += 0.5;
      } else {
        p.dy -= 0.5;
      }
    }

    if (p.dy > 1 || p.dy < -1) {
      p.dy *= 0.91;
    }
    if (p.dy > -0.5 && p.dy < 0.5) {
      p.dy *= 3;
    }
    if (p.dx > 1 || p.dx < -1) {
      p.dx *= 0.95;
    }
    p.x -= p.dx;
    p.y -= p.dy;
    fill('DarkCyan');
    circle(p.x, p.y, 10);
  }
}
