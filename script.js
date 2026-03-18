let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

let player = { x: 180, y: 450, width: 40, height: 40 };
let bullets = [];
let enemies = [];
let score = 0;
let gameRunning = false;

function drawPlayer() {
  ctx.fillStyle = "cyan";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBullets() {
  ctx.fillStyle = "yellow";
  bullets.forEach(b => {
    ctx.fillRect(b.x, b.y, 5, 10);
  });
}

function drawEnemies() {
  ctx.fillStyle = "red";
  enemies.forEach(e => {
    ctx.fillRect(e.x, e.y, 40, 40);
  });
}

function update() {
  if (!gameRunning) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  bullets.forEach(b => b.y -= 5);
  enemies.forEach(e => e.y += 2);

  if (Math.random() < 0.03) {
    enemies.push({
      x: Math.random() * 360,
      y: 0
    });
  }

  bullets.forEach((b, bi) => {
    enemies.forEach((e, ei) => {
      if (
        b.x < e.x + 40 &&
        b.x + 5 > e.x &&
        b.y < e.y + 40 &&
        b.y + 10 > e.y
      ) {
        bullets.splice(bi, 1);
        enemies.splice(ei, 1);
        score++;
      }
    });
  });

  bullets = bullets.filter(b => b.y > 0);
  enemies = enemies.filter(e => e.y < 500);

  for (let e of enemies) {
    if (
      player.x < e.x + 40 &&
      player.x + player.width > e.x &&
      player.y < e.y + 40 &&
      player.y + player.height > e.y
    ) {
      gameRunning = false;
      alert("💥 Game Over! Score: " + score);
    }
  }

  document.getElementById("score").innerText = "Score: " + score;

  drawPlayer();
  drawBullets();
  drawEnemies();

  requestAnimationFrame(update);
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft" && player.x > 0) player.x -= 20;
  if (e.key === "ArrowRight" && player.x < 360) player.x += 20;

  if (e.key === " ") {
    bullets.push({ x: player.x + 18, y: player.y });
  }
});

function startGame() {
  player.x = 180;
  bullets = [];
  enemies = [];
  score = 0;
  gameRunning = true;
  update();
}
