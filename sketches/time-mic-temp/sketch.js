let cam;
let mic;
let micLevel = 0;

let nowHour = 0;
let nowMinute = 0;

let weather = {
  temperature: null,
  windspeed: null,
  wathercode: null
}

async function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // カメラ
  cam = createCapture(VIDEO);
  cam.size(320, 240);
  cam.hide();
  
  // マイク
  mic = new p5.AudioIn();
  mic.start();
  
  // 天気
  await loadWeather(34.7108, 137.7261); // 例: 浜松
}

function draw() {
  background(0);
  
  // 時間
  nowHour = hour();
  nowMinute = minute();
  
  // マイク音量
  micLevel = mic.getLevel();
  
  // カメラ映像
  image(cam, 0, 0, width, height);
  
  // 反映
  let brightnessValue = map(micLevel, 0, 0.2, 50, 255, true);
  fill(brightnessValue, 100, 200, 120);
  noStroke();
  
  let circleSize = map(nowHour, 0, 23, 50, 300);
  circle(width / 2, height / 2, circleSize);
  
  fill(255);
  textSize(16);
  text(`time: ${nowHour}:${nf(nowMinute, 2)}`, 20, 30);
  text(`mic: ${micLevel.toFixed(3)}`, 20, 55);
  text(`temp: ${weather.temperature ??"--"}℃`, 20, 80);
}


async function loadWeather(lat, lon) {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,weather_code`;

  const res = await fetch(url);
  const data = await res.json();
  
  console.log(data);
  
  weather.temperature = data.current.temperature_2m;
  weather.windspeed = data.current.wind_speed_10m;
  weather.weathercode = data.current.weather_code;
}

