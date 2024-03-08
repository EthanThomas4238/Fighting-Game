const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
context.fillRect(0, 0, canvas.width, canvas.height);
const gravity = 0.7;

class Sprite {
  constructor({position, velocity, health}) {
    this.position = position;
    this.velocity = velocity;
    this.height = 60;
    this.width = 30;
    this.lastKey;
    this.grounded = false;
    this.numJumps = 0;
    this.health = health;
  }

  draw(color) {
    context.fillStyle = color;
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }



  update(color) {
    this.draw(color)

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
      this.grounded = true;
      this.numJumps = 0;
      this.position.y = canvas.height-this.height;
    } else if (this.position.y <= 0) {
      this.velocity.y = 0;
      this.velocity.y += gravity;
      this.grounded = false;
    } else {
      this.velocity.y += gravity;
      this.grounded = false;
    }

    if (this.position.x <= 0) {
      this.position.x = 0;
    } else if (this.position.x + this.width >= canvas.width) {
      this.position.x = canvas.width - this.width;
    }
  }

  attack(sprite){
    if(Math.abs(sprite.position.x-this.position.x)<this.width+30&&Math.abs(sprite.position.y-this.position.y)<this.height/2){
      sprite.health = sprite.health-10;
    }
  }
}

const player = new Sprite({
  velocity: {
    x: 0,
    y: 0
  },
  position: {
    x: 0,
    y: 0
  },
  health: 200
});
player.draw('red');


const enemy = new Sprite({
  position: {
    x: 400,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  },
  health: 200
});
enemy.draw('blue');

const keys = {
  w: {
    pressed: false
  },
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowUp:{
    pressed:false
  }
}


let playerAttack = false;
let enemyAttack = false;
let playerAttackCounter = 0;
let enemyAttackCounter = 0;
let playerDashFrames = 0;
let enemyDashFrames = 0;

function animate() {
  
  const animationId = window.requestAnimationFrame(animate);
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);
  player.update('red');
  enemy.update('blue');

  context.font = "30px Comic Sans Ms";
  context.fillStyle = "blue";
  context.fillText(`Health: ${enemy.health}`,canvas.width-200,50);

  context.font = "30px Comic Sans Ms";
  context.fillStyle = "Red";
  context.fillText(`Health: ${player.health}`,20,50);

  if(player.health===0 || enemy.health===0){
    if(player.health === 0){
      context.font = "150px Comic Sans Ms";
      context.fillStyle = "white";
      context.fillText("Blue wins!",10,canvas.height/2);
    }else if(enemy.health === 0){
      context.font = "150px Comic Sans Ms";
      context.fillStyle = "white";
      context.fillText("Red wins!",10,canvas.height/2);
      }
  }
  
  player.velocity.x = 0;
  enemy.velocity.x = 0;

  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -randomstuff;
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = randomstuff;
  }

  if(playerAttack||playerAttackCounter>0){
    context.fillStyle = "#32CD32";
    if(enemy.position.x-player.position.x<0){
      context.fillRect(player.position.x-30,player.position.y,30,20);
    }else{
    context.fillRect(player.position.x+player.width,player.position.y,30,20);
    }
    playerAttack = false;
    playerAttackCounter--;
  }
  if(enemyAttack||enemyAttackCounter>0){
    context.fillStyle = "#32CD32";
    if(enemy.position.x-player.position.x>0){
      context.fillRect(enemy.position.x-30,enemy.position.y,30,20);
    }else{
context.fillRect(enemy.position.x+enemy.width,enemy.position.y,30,20);
    }
    enemyAttack = false;
    enemyAttackCounter--;
  }

  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -randomthingy;
  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = randomthingy;
  }
  if(keys.ArrowUp.pressed){
    enemy.velocity.y = -20;
    enemy.numJumps++;
    keys.ArrowUp.pressed = false;
  }if(keys.w.pressed){
    player.velocity.y = -20;
    player.numJumps++;
    keys.w.pressed = false;
  }

  if(player.health===0||enemy.health===0){
    window.cancelAnimationFrame(animationId);
  }
}

animate();

let HimAttack = true;
let guyAttack = true;
let randomstuffy = true;
let randomstuff = 5
let randomthingy = 5;
let randombool = true;

window.addEventListener('keydown',(event)=>{
  switch (event.key) {
    case 'd':
      keys.d.pressed = true;
      player.lastKey = 'd';
      break;
    case 'a':
      keys.a.pressed = true;
      player.lastKey = 'a';
      break;
    case 'w':
      if (player.grounded || player.numJumps < 2) {
        keys.w.pressed = true;
      }
      break;

    case 'q':
      if(randomstuffy){
        randomstuffy =false;
        randomstuff = 20;
        setTimeout(()=>{
          randomstuff = 5;
        },50);
        setTimeout(()=>{
          randomstuffy = true;
        },1000);
      }
      break;
    case 'e':
      if(HimAttack){
        HimAttack = false;
        playerAttack = true;
        player.attack(enemy);
        playerAttackCounter = 5;
        setTimeout(()=>{
          HimAttack = true;
        },500);
        
      }
        
      break;
    case 'Shift':
      if(randombool){
        randombool =false;
        randomthingy = 20;
        setTimeout(()=>{
          randomthingy = 5;
        },50);
        setTimeout(()=>{
          randombool = true;
        },1000);
      }
      break;

    case 'ArrowDown':
      if(guyAttack){
        enemyAttack=true;
        enemyAttackCounter=5;
        guyAttack=false
        enemy.attack(player);
        setTimeout(()=>{
          guyAttack=true;
        },500);
      }
      break;

    case 'ArrowRight':
      keys.ArrowRight.pressed = true;
      enemy.lastKey = 'ArrowRight';
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = 'ArrowLeft';
      break;
    case 'ArrowUp':
      if (enemy.grounded || enemy.numJumps < 2) {
        keys.ArrowUp.pressed = true;
      }
      break;
  }
});

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false;
      break;
    case 'a':
      keys.a.pressed = false;
      break;

    case 'ArrowRight':
      keys.ArrowRight.pressed = false;
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false;
      break;
  }
});
