const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const flashingCount = async count => {
  let element = document.getElementById("menu-count");
  if (Number(count) && Number(count) < 10) {
    count = `0${count}`;
  }
  for (let i = 0; i < 5; i++) {
    await sleep(300);
    element.innerHTML = i % 2 === 0 ? count : "";
  }
};
