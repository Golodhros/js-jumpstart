var canvas;
var player;
var explosion;
var bullet1;
var bullet2;
var allImageCount = 2;
var imageCount = 0;
var debug;
var bulletCount = 0;
var bullets = [];
var score = 0;
var ziki = 2;
var timer;
var gameOverFlag = false;
var bulletTick;
var twitterButton;

/**
 * プレイヤークラス
 */
Player = function(image) {
  this.image = image;
  this.x = 0;
  this.y = 0;
  this.count = 0;
  this.hitFlag = false;
}

Player.prototype = {
draw:
  function(ctx) {
    if (this.count < 31 && this.count % 2 == 0) {
      ctx.drawImage(this.image, this.x - 16, this.y - 16);
    }
    if (this.count == 31) {
      this.hitFlag = true;
      ctx.drawImage(this.image, this.x - 16, this.y - 16);
    }
    this.count ++;
    if (this.count > 31) this.count = 31;
  },
reset:
  function() {
    this.count = 0;
    this.hitFlag = false;
  }
}

/**
 * 爆炎クラス
 */
Explosion = function(image) {
  this.image = image;
  this.x = 0;
  this.y = 0;
  this.count = 0;
  this.finishFlag = true;
}
Explosion.prototype = {
draw:
  function(ctx) {
    if (this.count < 16) {
      var xx = this.count % 8;
      var yy = Math.floor(this.count / 8);
      ctx.drawImage(this.image, xx * 96, yy * 96, 96, 96, this.x - 48, this.y - 48, 96, 96);
      this.count ++;
      if (this.count == 16) {
        this.finishFlag = true;
        player.reset();
        if (ziki < 0) gameOverFlag = true;
      }
    }
  },
start:
  function() {
    this.finishFlag = false;
    this.count = 0;
    this.x = player.x;
    this.y = player.y;
  }
}

/**
 * たまクラス
 */
Bullet = function() {
  var direc = randomInt(2);
  if (direc == 1) {
    this.x = -20 + randomInt(2) * 680;
    this.y = randomInt(480);
  } else {
    this.x = randomInt(640);
    this.y = -20 + randomInt(2) * 520;
  }

  var atn = Math.atan2(this.y - player.y, this.x - player.x);
  var r = Math.random() * 7 + 3;
  this.ax = -Math.cos(atn) * r;
  this.ay = -Math.sin(atn) * r;
}

Bullet.prototype = {
move:
  function() {
    this.x += this.ax;
    this.y += this.ay;
  },
hitTest:
  function(player) {
    var xx = this.x - player.x;
    var yy = this.y - player.y;
    var dist = Math.sqrt(Math.pow(xx, 2) + Math.pow(yy, 2));
    if (dist <= 16 && explosion.finishFlag && player.hitFlag) {
      return true;
    } else {
      return false;
    }
  },

checkRemove:
  function() {
    if (this.x < -20 || this.x > 660 ||
        this.y < -20 || this.y > 500) {
      return true;
    } else {
      return false;
    }
  },

draw:
  function(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
    ctx.fill();
  }
}

/**
 * 読込完了
 */
window.onload = function() {
  twitterButton = document.getElementById('twitterButton');
  twitterButton.disabled = true;
  twitterButton.onclick = function() {
    window.open('http://twitter.com/home?status=' + encodeURI('HTML5 TAMAYOKE!!!111 SCORE:' + score + ' http://www.hojamaka.com/game/html5yoke/'));
  }
  canvas = document.getElementById('canvas');
  canvas.onmousemove = onMouseMove;
  debug = document.getElementById('debug');
  player = new Player(setImage("player.png"));
  explosion = new Explosion(setImage("bakuen01.png"));
}

function setImage(src) {
  var image = new Image();
  image.onload = checkLoad;
  image.onerror = checkLoad;
  image.onabort = checkLoad;
  image.src = src;
  return image;
}

function checkLoad() {
  imageCount ++;
  if (imageCount >= allImageCount) {
    init();
  }
}

/**
 * init
 */
function init() {
  player.reset();
  bulletCount = 0;
  bullets = [];
  score = 0;
  ziki = 2;
  gameOverFlag = false;
  timer = setInterval(tick, 33);
  bulletTick = 10;
  twitterButton.disabled = true;
}

/**
 * メインループ
 */
function tick() {
  bulletCount = (bulletCount + 1) % bulletTick;
  if (bulletCount == 0) {
    bullets.push(new Bullet());
    score ++;
    if (score == 60) bulletTick = 5;
    if (score == 150) bulletTick = 3;
    if (score == 300) bulletTick = 2;
    if (score == 1000) bulletTick = 1;
  }
  for (var i = 0; i < bullets.length; i++) {
    bullet = bullets[i];
    bullet.move();
    if (bullet.checkRemove()) {
      bullets.splice(i, 1);
      i--;
    }
    if (bullet.hitTest(player)) {
      explosion.start();
      ziki --;
    }
  }
  draw();
}

function result() {
  clearInterval(timer);
  twitterButton.disabled = false;
  var ctx = document.getElementById('canvas').getContext('2d');
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, 640, 480);
  ctx.font = "72px 'Times New Roman'";
  ctx.fillStyle = "#ffffff";
  ctx.fillText('Result', 200, 100);
  ctx.font = "36px 'Times New Roman'";
  ctx.fillText('Score: ' + score, 200, 260);
  canvas.onclick = function() {
    canvas.onclick = undefined;
    init();
  }
}

function onMouseMove(event) {
  event = event || window.event;
  var target = event.target || event.srcElement;
  var rect = target.getBoundingClientRect();
  player.x = event.clientX - rect.left;
  player.y = event.clientY - rect.top;
  if (player.x > 635) player.x = 635;
  if (player.x < 5) player.x = 5;
  if (player.y > 475) player.y = 475;
  if (player.y < 5) player.y = 5;
}

function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');
  ctx.clearRect(0, 0, 640, 480);
  for (var i = 0; i < ziki; i++) {
    ctx.drawImage(player.image, 5 + i * 35, 5, 20, 20);
  }
  if (!explosion.finishFlag) {
    explosion.draw(ctx);
  } else {
    player.draw(ctx);
  }
  for (i = 0; i < bullets.length; i++) {
    bullets[i].draw(ctx);
  }
  ctx.font = "14px 'Times New Roman'";
  ctx.fillStyle = "#ffffff";
  ctx.fillText('Score: ' + score, 100, 10);
  if (gameOverFlag) result();
}

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function trace(str) {
  debug.innerHTML = str;
}
