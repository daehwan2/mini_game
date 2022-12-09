const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const HERO_INIT_Y = 200;

const MONSTER_INIT_X = canvas.width;
const MONSTER_INIT_Y = 200 + 20;

let animation_id;

const heroImage = new Image();
heroImage.src = "./hero.JPG";

const monsterImage = new Image();
monsterImage.src = "./mon.jpeg";

const Hero = {
  x: 10,
  y: HERO_INIT_Y,
  width: 30,
  height: 50,

  jumpSpeed: 5,

  up() {
    this.y -= this.jumpSpeed;
  },

  down() {
    this.y += this.jumpSpeed;
  },

  draw() {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(heroImage, this.x, this.y, this.width, this.height);
  },
};

class Monster {
  constructor() {
    this.x = MONSTER_INIT_X;
    this.y = MONSTER_INIT_Y;
    this.speed;
    this.width = 30;
    this.height = 30;
  }

  move() {
    this.x -= this.speed;
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(monsterImage, this.x, this.y, this.width, this.height);
  }
}

const Score = {
  x: 500,
  y: 20,

  draw(value) {
    console.log(value);
    ctx.font = "italic bold 15px Arial, sans-serif";
    ctx.fillStyle = "black";
    ctx.fillText(`점수: ${value}`, this.x, this.y);
  },
};

const EndText = {
  x: canvas.width / 2 - 60,
  y: canvas.height / 2,

  draw() {
    ctx.font = "italic bold 40px Arial, sans-serif";
    ctx.fillStyle = "black";
    ctx.fillText(`게임 끝`, this.x, this.y);
    ctx.font = "italic bold 20px Arial, sans-serif";
    ctx.fillText(`재시작:Enter`, this.x, this.y + 40);
  },
};

let isEnd = false;
let timer = 0;
let monsters = [];
let isJump = false;
let jumpTimer = 0;
let monsterCreateTimer = 0;
let preventJunmp = false;
let stage = 1;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

const isCrash = (left_obj, right_obj) => {
  if (
    right_obj.x - (left_obj.x + left_obj.width) <= 0 &&
    right_obj.y - (left_obj.y + left_obj.height) <= 0
  ) {
    EndText.draw();
    isEnd = true;
    cancelAnimationFrame(animation_id);
  }
};

const frameExecute = () => {
  if (timer === -1) {
    return;
  }
  animation_id = requestAnimationFrame(frameExecute);
  timer++;
  monsterCreateTimer++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const monster_create_time = getRandomInt(45, 55);
  if (monsterCreateTimer % monster_create_time === 0) {
    monsterCreateTimer = 0;
    const monster1 = new Monster();
    monsters.push(monster1);
  }

  monsters.forEach((monster, index, monsters) => {
    isCrash(Hero, monster);

    if (monster.x < 0) {
      monsters.splice(index, 1);
    }

    if (timer % 400 === 0) {
      stage++;
    }

    monster.speed = 4 + stage;
    monster.move();
    monster.draw();
  });

  if (isJump) {
    jumpTimer++;
    Hero.up();
    preventJunmp = true;
  } else if (Hero.y < HERO_INIT_Y) {
    Hero.down();
  } else {
    preventJunmp = false;
  }
  if (jumpTimer === 20) {
    isJump = false;
    jumpTimer = 0;
  }

  // 스테이지 업

  Hero.draw();
  Score.draw(timer);
};

window.addEventListener("keypress", (e) => {
  console.log(e);
  if (e.code === "Space") {
    if (!preventJunmp) {
      isJump = true;
    }
  } else if (isEnd && e.code === "Enter") {
    timer = 0;
    isJump = false;
    jumpTimer = 0;
    monsterCreateTimer = 0;
    preventJump = false;
    stage = 1;
    monsters = [];
    isEnd = false;
    frameExecute();
  }
});

const startBtn = document.querySelector(".startBtn");

startBtn.addEventListener("click", () => {
  canvas.classList.add("visible");
  const firstLanding = document.querySelector(".first_landing_container");
  firstLanding.classList.remove("visible");

  timer = 0;
  isJump = false;
  jumpTimer = 0;
  monsterCreateTimer = 0;
  preventJump = false;
  stage = 1;
  monsters = [];
  isEnd = false;

  frameExecute();
});
