const personName = "Aastha"; 
const birthdayDate = "2026-08-05 00:00:00"; 

const nameElement = document.getElementById("personName");
const startBtn = document.getElementById("startBtn");
const wishSection = document.getElementById("wishSection");
const confettiBtn = document.getElementById("confettiBtn");
const music = document.getElementById("birthdayMusic");

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

nameElement.textContent = personName;

function updateCountdown() {
  const birthday = new Date(birthdayDate).getTime();
  const now = new Date().getTime();
  const distance = birthday - now;

  if (distance <= 0) {
    daysElement.textContent = "00";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  daysElement.textContent = String(days).padStart(2, "0");
  hoursElement.textContent = String(hours).padStart(2, "0");
  minutesElement.textContent = String(minutes).padStart(2, "0");
  secondsElement.textContent = String(seconds).padStart(2, "0");
}

setInterval(updateCountdown, 1000);
updateCountdown();

startBtn.addEventListener("click", () => {
  wishSection.classList.remove("hidden");
  startBtn.textContent = "Wish Opened";

  music.volume = 0.45;
  music.play().catch(() => {
    console.log("Music will play only after browser allows user interaction.");
  });

  launchConfetti();

  wishSection.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});

confettiBtn.addEventListener("click", () => {
  launchConfetti();
});

function launchConfetti() {
  const canvas = document.getElementById("confettiCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = [];
  const colors = ["#ff7aa8", "#7c4dff", "#ffd166", "#06d6a0", "#ffffff"];

  for (let i = 0; i < 140; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 4 + 2,
      angle: Math.random() * 360,
      rotation: Math.random() * 8 - 4
    });
  }

  let animationFrame = 0;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces.forEach((piece) => {
      ctx.save();
      ctx.translate(piece.x, piece.y);
      ctx.rotate((piece.angle * Math.PI) / 180);
      ctx.fillStyle = piece.color;
      ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
      ctx.restore();

      piece.y += piece.speed;
      piece.x += Math.sin(piece.y / 35);
      piece.angle += piece.rotation;
    });

    animationFrame++;

    if (animationFrame < 180) {
      requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  draw();
}

window.addEventListener("resize", () => {
  const canvas = document.getElementById("confettiCanvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
