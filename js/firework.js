const PI2 = Math.PI * 2;
const canvas = document.querySelector('#fireworksCanvas');
const ctx = canvas.getContext('2d');

const random = (min, max) => Math.random() * (max - min + 1) + min || 0;

class Firework {
  constructor(x, y, targetX, targetY, shade, offsprings) {
    this.dead = false;
    this.offsprings = offsprings;

    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;

    this.shade = shade;
    this.history = [];
  }

  update(delta) {
    if (this.dead) return;

    const xDiff = this.targetX - this.x;
    const yDiff = this.targetY - this.y;
    if (Math.abs(xDiff) > 3 || Math.abs(yDiff) > 3) {
      this.x += xDiff * 2 * delta;
      this.y += yDiff * 2 * delta;

      this.history.push({
        x: this.x,
        y: this.y,
      });

      if (this.history.length > 20) this.history.shift();
    } else {
      if (this.offsprings && !this.madeChilds) {
        const babies = this.offsprings / 2;
        for (let i = 0; i < babies; i += 1) {
          const targetX = this.x + this.offsprings * Math.cos((PI2 * i) / babies) || 0;
          const targetY = this.y + this.offsprings * Math.sin((PI2 * i) / babies) || 0;

          congratulations.fireworks.push(new Firework(this.x, this.y, targetX, targetY, this.shade, 0));
        }
      }
      this.madeChilds = true;
      this.history.shift();
    }

    if (this.history.length === 0) this.dead = true;
    else if (this.offsprings) {
      for (let i = 0; this.history.length > i; i += 1) {
        const point = this.history[i];
        ctx.beginPath();
        ctx.fillStyle = 'hsl(' + this.shade + ',100%,' + i + '%)';
        ctx.arc(point.x, point.y, 1, 0, PI2, false);
        ctx.fill();
      }
    } else {
      ctx.beginPath();
      ctx.fillStyle = 'hsl(' + this.shade + ',100%,50%)';
      ctx.arc(this.x, this.y, 1, 0, PI2, false);
      ctx.fill();
    }
  }
}

export class Congratulations {
  constructor() {
    this.resize();
    this.fireworks = [];
    this.counter = 0;
  }

  resize() {
    this.width = canvas.width;
    canvas.width = window.innerWidth;

    const center = this.width / 2 || 0;
    this.spawnA = center - center / 4 || 0;
    this.spawnB = center + center / 4 || 0;

    this.height = window.innerHeight;
    canvas.height = window.innerHeight;
    this.spawnC = this.height * 0.1;
    this.spawnD = this.height * 0.5;
  }

  onClick(evt) {
    const x = evt.clientX || (evt.touches && evt.touches[0].pageX);
    const y = evt.clientY || (evt.touches && evt.touches[0].pageY);

    const count = random(3, 5);
    for (let i = 0; i < count; i += 1)
      this.fireworks.push(new Firework(random(this.spawnA, this.spawnB), this.height, x, y, random(0, 260), random(30, 110)));

    this.counter = -1;
  }

  update(delta) {
    ctx.globalCompositeOperation = 'hard-light';
    ctx.fillStyle = `rgba(0,45,100,${7 * delta})`;
    ctx.fillRect(0, 0, this.width, this.height);

    ctx.globalCompositeOperation = 'lighter';

    /* eslint-disable-next-line */
    for (const firework of this.fireworks) firework.update(delta);

    this.counter += delta * 3;
    if (this.counter >= 1) {
      this.fireworks.push(
        new Firework(
          random(this.spawnA, this.spawnB),
          this.height,
          random(0, this.width),
          random(this.spawnC, this.spawnD),
          random(0, 360),
          random(30, 110)
        )
      );
      this.counter = 0;
    }
    if (this.fireworks.length > 1000) this.fireworks = this.fireworks.filter((firework) => !firework.dead);
  }
}

const congratulations = new Congratulations();
