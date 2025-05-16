// Element DOM utama
const board = document.getElementById("game-board");
const rollBtn = document.getElementById("roll-dice");
const diceResult = document.getElementById("dice-result");
const questionBox = document.getElementById("question-box");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options");
const statusText = document.getElementById("status");
const toggleMusicBtn = document.getElementById("toggle-music");

let currentPlayer = 0;
const players = [
  { color: "red", position: 1, element: null },
  { color: "yellow", position: 1, element: null },
];

let winStats = { red: 0, yellow: 0 };
let askedQuestions = {};

// Audio
const music = document.getElementById("bg-music");
const sfx = {
  dice: document.getElementById("sfx-dice"),
  ladder: document.getElementById("sfx-ladder"),
  snake: document.getElementById("sfx-snake"),
  correct: document.getElementById("sfx-correct"),
  wrong: document.getElementById("sfx-wrong"),
};

toggleMusicBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    toggleMusicBtn.textContent = "🔊 Musik";
  } else {
    music.pause();
    toggleMusicBtn.textContent = "🔇 Musik";
  }
});

function playSFX(name) {
  if (sfx[name]) {
    sfx[name].currentTime = 0;
    sfx[name].play();
  }
}

// Posisi ular (snake) dan tangga (ladder)
const snakes = {
  16: 6,
  48: 30,
  64: 60,
  79: 19,
  93: 68,
  95: 24,
  97: 76,
  98: 78,
};

const ladders = {
  1: 38,
  4: 14,
  9: 31,
  21: 42,
  28: 84,
  36: 44,
  51: 67,
  71: 91,
  80: 100,
};

// Titik pertanyaan
const questionSpots = [5, 13, 22, 35, 47, 53, 66, 73, 88, 94];

// Daftar pertanyaan pilihan ganda
const questions = [
  {
    question: "Apa ibu kota Indonesia?",
    options: ["Bandung", "Surabaya", "Jakarta", "Medan"],
    answer: "Jakarta",
  },
  {
    question: "Siapa presiden pertama Indonesia?",
    options: ["Soekarno", "Jokowi", "Soeharto", "BJ Habibie"],
    answer: "Soekarno",
  },
  {
    question: "Pulau terbesar di Indonesia adalah?",
    options: ["Jawa", "Sulawesi", "Sumatera", "Kalimantan"],
    answer: "Kalimantan",
  },
  {
    question: "Lambang negara Indonesia adalah?",
    options: ["Garuda Pancasila", "Macan", "Burung Elang", "Merpati"],
    answer: "Garuda Pancasila",
  },
  {
    question: "Bahasa resmi Indonesia adalah?",
    options: ["Jawa", "Indonesia", "Sunda", "Melayu"],
    answer: "Indonesia",
  },
  {
    question: "Pahlawan nasional dari Jawa Barat?",
    options: ["Cut Nyak Dien", "Diponegoro", "Otto Iskandar", "Sudirman"],
    answer: "Otto Iskandar",
  },
  {
    question: "Gunung tertinggi di Indonesia?",
    options: ["Merapi
