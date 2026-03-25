// Ref: https://zenn.dev/baroqueengine/books/a19140f2d9fc1a/viewer/aaffb1

const BACKGROUND_COLOR = [255, 204, 0]; // 黄色の背景色 (RGB)
const CIRCLE_SIZE = 100; // 円のサイズ
const CIRCLE_INITIAL_ALPHA = 150; // 円の初期透明度 (0-255)
const CIRCLE_FADE_SPEED = 2; // 円の透明度が減少する速度 (数値が大きいほど速くフェードアウト)

let circles = [];

// sketch.js default template
function setup() {
  createCanvas(windowWidth, windowHeight);

  // 背景色を黄色に設定
  background(...BACKGROUND_COLOR);
}

function draw() {
  background(...BACKGROUND_COLOR); // 毎フレーム背景を再描画して、前の円を消す

  for (let i = circles.length - 1; i >= 0; i--) {
    const circle = circles[i];

    fill(255, 255, 255, circle.alpha);
    noStroke();
    ellipse(circle.x, circle.y, circle.size, circle.size);

    // 円の透明度を減少させる
    circle.alpha -= CIRCLE_FADE_SPEED;

    // 透明度が0以下になったら配列から削除
    if (circle.alpha <= 0) {
      circles.splice(i, 1);
    }
  }
}

// ウィンドウがリサイズされたときにキャンバスを更新
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// マウスがクリックされたときに円を描く
function mouseClicked() {
  drawCircle();
}

// 円を描く
function drawCircle() {
  const circle = {
    x: mouseX,
    y: mouseY,
    size: CIRCLE_SIZE,
    alpha: CIRCLE_INITIAL_ALPHA
  };
  circles.push(circle);
}
