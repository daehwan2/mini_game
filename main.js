const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const HERO_INIT_Y = 300;

const MONSTER_INIT_X = canvas.width;
const MONSTER_INIT_Y = 300;

let animation_id;
let isStart = false;

const joggingImage = new Image();
joggingImage.src = "assets/jogging.png";

const heroImage = new Image();

const monsterImage = new Image();
monsterImage.src = "assets/mon.jpeg";

class Hero {
  constructor() {
    this.x = 20;
    this.y = HERO_INIT_Y;
    this.width = 40;
    this.height = 100;

    this.jogging_width = 128;
    this.jogging_height = 110;
    this.jogging_x = 0;
    this.jogging_y = 50;
    this.jogging_dx = this.x;
    this.jogging_dy = this.y + this.width;
    this.jogging_dwidth = this.width;
    this.jogging_dheight = this.height - this.width;
    this.jumpSpeed = 5;
  }

  up() {
    this.y -= this.jumpSpeed;
    this.jogging_dy = this.y + this.width;
  }

  down() {
    this.y += this.jumpSpeed;
    this.jogging_dy = this.y + this.width;
  }

  draw() {
    ctx.fillStyle = "green";
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(
      joggingImage,
      this.jogging_x,
      this.jogging_y,
      this.jogging_width,
      this.jogging_height,
      this.jogging_dx,
      this.jogging_dy,
      this.jogging_dwidth,
      this.jogging_dheight
    );
    ctx.drawImage(heroImage, this.x, this.y, this.width, this.width);
  }
}

const hero = new Hero();

class Monster {
  constructor() {
    this.speed;
    this.width = 40;
    this.height = 40;
    this.x = MONSTER_INIT_X;
    this.y = MONSTER_INIT_Y + (hero.height - this.height);
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
    // console.log(value);
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
    isStart = false;
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

  //캐릭터 달리기
  if (timer % 3 === 0) {
    hero.jogging_x += hero.jogging_width;
    if (hero.jogging_x > joggingImage.width - hero.jogging_width) {
      hero.jogging_x = 0;
    }
  }

  const monster_create_time = getRandomInt(45, 55);
  if (monsterCreateTimer % monster_create_time === 0) {
    monsterCreateTimer = 0;
    const monster1 = new Monster();
    monsters.push(monster1);
  }

  monsters.forEach((monster, index, monsters) => {
    isCrash(hero, monster);

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
    hero.up();
    preventJunmp = true;
  } else if (hero.y < HERO_INIT_Y) {
    hero.down();
  } else {
    preventJunmp = false;
  }
  if (jumpTimer === 20) {
    isJump = false;
    jumpTimer = 0;
  }

  // 스테이지 업

  hero.draw();
  Score.draw(timer);
};

// 게임할때 이벤트 걸기
window.addEventListener("keypress", (e) => {
  if (isStart && e.code === "Space") {
    if (!preventJunmp) {
      isJump = true;
    }
  } else if (isEnd && e.code === "Enter") {
    firstLanding.classList.add("visible");
    canvas.classList.remove("visible");
  }
});

//시작하기 함수
const startGame = () => {
  canvas.classList.add("visible");

  timer = 0;
  isJump = false;
  jumpTimer = 0;
  monsterCreateTimer = 0;
  preventJump = false;
  stage = 1;
  monsters = [];
  isEnd = false;
  isStart = true;

  frameExecute();
};

// 첫번째 렌더링 화면
const startBtn = document.querySelector(".startBtn");
const firstLanding = document.querySelector(".first_landing_container");
const secondLanding = document.querySelector(".choice_image_landing_container");

startBtn.addEventListener("click", () => {
  firstLanding.classList.remove("visible");
  secondLanding.classList.add("visible");
});

// 캐릭터 선택 화면
const characters = document.querySelectorAll(".image_item");

const onClickCharacter = (e) => {
  const character = e.currentTarget;
  heroImage.src = character.querySelector("img").src;

  secondLanding.classList.remove("visible");

  startGame();
};

characters.forEach((character) => {
  character.addEventListener("click", onClickCharacter);
});
