/**
 *
 * @param {string} ms - time for until function executes
 */

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * plays the answer key for simon game
 *
 * @param {Array} answerKey - the simon answer key
 */

export const playAnswer = async answerKey => {
  const time = 300;
  for (let i = 0; i < answerKey.length; i++) {
    await sleep(time);
    let element = document.getElementById(answerKey[i]);
    element.style.filter = "brightness(100%)";
    document.getElementById(`${answerKey[i]}-sound`).play();
    await sleep(time);
    element.style.filter = "brightness(65%)";
  }
};
