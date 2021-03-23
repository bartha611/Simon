const { flashingCount } = require("../js/flashingCount");
const { playAnswer } = require("../js/playAnswerkey");
const { sleep } = require("../js/sleep");

const colors = ["red", "yellow", "green", "blue"];

const Game = {
  on: false,
  start: false,
  strict: false,
  answerKey: [],
  playerKey: [],
  turn: false,
  interval: null
};

document.getElementById("start").addEventListener("click", () => {
  if (Game.on) {
    clearInterval(Game.interval);
    Game.start = true;
    Game.answerKey = [];
    Game.playerKey = [];
    Game.turn = false;
    Game.interval = setInterval(() => simon(), 1000);
  }
});

document.getElementById("strict").addEventListener("click", () => {
  Game.strict = !Game.strict;
  document.getElementById("strict-light").style.background = Game.strict
    ? "red"
    : "transparent";
});

// event listerner for the simon blocks
document.querySelectorAll(".block").forEach((item) => {
  item.addEventListener("click", async (event) => {
    const block = event.target.id;
    if (Game.turn && Game.on && Game.start) {
      const element = document.getElementById(block);
      element.style.filter = "brightness(100%)";
      document.getElementById(`${block}-sound`).play();
      Game.playerKey.push(block);
      await sleep(200);
      element.style.filter = "brightness(65%)";
      if (
        Game.playerKey.length === Game.answerKey.length &&
        Game.answerKey[Game.answerKey.length - 1] === block
      ) {
        Game.turn = !Game.turn;
        Game.playerKey = [];
        Game.interval = setInterval(() => simon(), 1000);
      } else if (Game.answerKey[Game.playerKey.length - 1] !== block) {
        Game.playerKey = [];
        Game.start = false;
        await flashingCount(Game.answerKey.length);
        if (Game.strict) {
          Game.answerKey = [];
          document.getElementById("menu-count").innerHTML = "00";
          Game.interval = setInterval(() => simon(), 1000);
        }
        await playAnswer(Game.answerKey);
        Game.start = true;
      }
    }
  });
});

document.querySelectorAll(".switch").forEach((item) => {
  item.addEventListener("click", (event) => {
    const { id } = event.target;
    Game.on = !Game.on;
    document.getElementById("off").style.background =
      id === "off" ? "black" : "white";
    document.getElementById("on").style.background =
      id === "on" ? "black" : "white";
    if (id === "off") {
      document.getElementById("menu-count").innerHTML = "";
    } else {
      flashingCount("- -");
    }
  });
});

const simon = async () => {
  if (Game.on && Game.start && !Game.turn) {
    clearInterval(Game.interval);
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    Game.answerKey.push(randomColor);
    const element = document.getElementById("menu-count");
    element.innerHTML =
      Game.answerKey.length < 10
        ? `0${Game.answerKey.length}`
        : String(Game.answerKey.length);
    Game.turn = true;
    await playAnswer(Game.answerKey);
  }
};

Game.interval = setInterval(() => simon(), 1000);
