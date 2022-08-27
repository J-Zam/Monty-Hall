import "./style.scss";

let allDoors: NodeListOf<HTMLElement> = document.querySelectorAll(".container .door-container .door");
let container: HTMLElement = (document.querySelector(".container") as HTMLElement);
let doorsContainer: HTMLElement = (document.querySelector(".door-container") as HTMLElement);
let dataContainer: HTMLElement = (document.querySelector(".info-container") as HTMLElement);
let dataInfo: HTMLElement = (document.querySelector(".info-container p") as HTMLElement);
let dataMessage: HTMLElement = (document.querySelector(".info-message-container") as HTMLElement);

let welcomeMessage: HTMLElement = (document.querySelector(".info-result") as HTMLElement);
let restartGame: HTMLElement = (document.querySelector(".info-restart") as HTMLElement);
let stayDoorOption: HTMLElement = (document.getElementById("stayDoorOption") as HTMLElement);
let changeDoorOption: HTMLElement = (document.getElementById("changeDoorOption") as HTMLElement);
let simulateBtn: HTMLElement = (document.getElementById("simulate") as HTMLElement);

let changePorcentageWin: HTMLElement = (document.getElementById("changePorcentageWin") as HTMLElement);
let changeAmountCarsWin: HTMLElement = (document.getElementById("changeAmountCarsWin") as HTMLElement);
let changePorcentageLose: HTMLElement = (document.getElementById("changePorcentageLose") as HTMLElement);
let changeAmountCarsLose: HTMLElement = (document.getElementById("changeAmountCarsLose")as HTMLElement);

let stayPorcentageWin: HTMLElement = (document.getElementById("stayPorcentageWin") as HTMLElement);
let stayAmountCarsWin: HTMLElement = (document.getElementById("stayAmountCarsWin") as HTMLElement);
let stayPorcentageLose: HTMLElement = (document.getElementById("stayPorcentageLose") as HTMLElement);
let stayAmountCarsLose: HTMLElement = (document.getElementById("stayAmountCarsLose") as HTMLElement);

let changeWinBar: HTMLElement = (document.getElementById("win-changing") as HTMLElement);
let changeLoseBar: HTMLElement = (document.getElementById("lose-changing") as HTMLElement);
let stayWinBar: HTMLElement= (document.getElementById("win-staying") as HTMLElement);
let stayLoseBar: HTMLElement = (document.getElementById("lose-staying") as HTMLElement);

let door1: HTMLElement = (document.querySelector(".door1") as HTMLElement);
let door2: HTMLElement = (document.querySelector(".door2") as HTMLElement);
let door3: HTMLElement = (document.querySelector(".door3") as HTMLElement);

let content1: HTMLElement = (document.querySelector(".content-1") as HTMLElement);
let content2: HTMLElement = (document.querySelector(".content-2") as HTMLElement);
let content3: HTMLElement = (document.querySelector(".content-3") as HTMLElement);

let switchDoorIndex: number;
let selectedDoorIndex: number;
let doors: string[] = [];

let totalAttempsChanging = 0;
let winAttempsChanging = 0;
let looseAttempsChanging = 0;

let totalAttempStaying = 0;
let winAttempsStaying = 0;
let loseAttempsStaying = 0;

let carsChange = 0;
let sheepsChange = 0;
let carStay = 0;
let sheepStay = 0;

door1.addEventListener("click", () => openDoor(0));
door2.addEventListener("click", () => openDoor(1));
door3.addEventListener("click", () => openDoor(2));

changeDoorOption.addEventListener("click", () => willSwitchDoor(true));
stayDoorOption.addEventListener("click", () => willSwitchDoor(false));
restartGame.addEventListener("click", () => restart());
simulateBtn.addEventListener("click", () => simulate());

function restart() {
  doors = ["🐑", "🐑", "🐑"];
  let index = Math.floor(Math.random() * 3);
  doors[index] = "🚗";

  welcomeMessage.style.display = "block";
  container.classList.remove("blocked");
  dataMessage.style.display = "none";
  doorsContainer.classList.remove("blocked");

  door1.textContent = "1";
  door2.textContent = "2";
  door3.textContent = "3";

  content1.textContent = "";
  content2.textContent = "";
  content3.textContent = "";

  allDoors.forEach((element: HTMLElement) => {
    element.style.backgroundColor = "#f9ad5b";
    element.style.border = "4px solid transparent";
    element.classList.remove("translated");
  });
};


function openDoor(selectedIndex: number) {
  selectedDoorIndex = selectedIndex;
  let openDoorIndex = doors.findIndex(
    (door: string, index: number) => door !== "🚗" && index !== selectedIndex
  );
  switchDoorIndex = doors.findIndex(
    // @ts-ignore
    (door: string, index: number) =>
      index !== selectedIndex && index !== openDoorIndex
  );

  welcomeMessage.style.display = "none";
  dataInfo.innerHTML = `Do you want to change to door #${switchDoorIndex + 1}?`;
  const openDoor = (document.querySelector(`.content-${openDoorIndex + 1}`) as HTMLElement);
  openDoor.innerHTML = "🐑";
  const selectedDoor:HTMLElement =  (document.querySelector(`.door${selectedIndex + 1}`) as HTMLElement);
  selectedDoor!.style.border = "4px solid #000";

  document.querySelector(`.door${openDoorIndex + 1}`)!.classList.add("translated");

  container.classList.add("blocked");
  dataContainer.style.display = "block";
};


function willSwitchDoor(option: boolean) {
  let message: HTMLElement = (document.querySelector(".info-message") as HTMLElement);
  let youWon: boolean;

  option ? totalAttempsChanging++ : totalAttempStaying++;
  const switchDoor: HTMLElement = (document.querySelector(`.content-${switchDoorIndex + 1}`) as HTMLElement);
  const selectedDoor: HTMLElement = (document.querySelector(`.content-${selectedDoorIndex + 1}`) as HTMLElement);

  youWon = doors[option ? switchDoorIndex : selectedDoorIndex] === "🚗";
  youWon
    ? (message.textContent = "You won!")
    : (message.textContent = "You lost!");

  if (option) {
    youWon ? (winAttempsChanging++, carsChange++) : (looseAttempsChanging++, sheepsChange++);

    changeWinBar.style.width = `${(winAttempsChanging / totalAttempsChanging) * 100}%`;
    changeLoseBar.style.width = `${(looseAttempsChanging / totalAttempsChanging) * 100  }%`;
    changePorcentageWin.textContent = `${((winAttempsChanging / totalAttempsChanging) *100).toFixed(2)}%`;
    changePorcentageLose.textContent = `${((looseAttempsChanging / totalAttempsChanging) *100).toFixed(2)}%`;
    changeAmountCarsWin.textContent = `Cars: ${carsChange}`;
    changeAmountCarsLose.textContent = `Sheeps: ${sheepsChange}`;
  };

  if (!option) {
    youWon ? (winAttempsStaying++, carStay++) : (loseAttempsStaying++, sheepStay++);

    stayWinBar.style.width = `${(winAttempsStaying / totalAttempStaying) * 100}%`;
    stayLoseBar.style.width = `${(loseAttempsStaying / totalAttempStaying) * 100}%`;
    stayPorcentageWin.textContent = `${((winAttempsStaying / totalAttempStaying) *100).toFixed(2)}%`;
    stayPorcentageLose.textContent = `${((loseAttempsStaying / totalAttempStaying) *100).toFixed(2)}%`;
    stayAmountCarsWin.textContent = `Cars: ${carStay}`;
    stayAmountCarsLose.textContent = `Sheeps: ${sheepStay}`;
  };

  let finalDoor: HTMLElement = (document.querySelector(`.door${(option ? switchDoorIndex : selectedDoorIndex) + 1}`) as HTMLElement);
  finalDoor.style.backgroundColor = youWon ? "#77dd77" : "#ff6961";

  selectedDoor.textContent = doors[selectedDoorIndex];
  switchDoor.textContent = doors[switchDoorIndex];

  allDoors.forEach((element: HTMLElement) => {
    element.classList.add("translated");
    element.style.border = "4px solid transparent";
  });

  dataContainer.style.display = "none";
  dataMessage.style.display = "block";
  doorsContainer.classList.add("blocked");
};


async function simulate() {
  const doorsToChoose = [door1, door2, door3];

  for (let i = 0; i < 200; i++) {
    let randomDoorIndex = Math.floor(Math.random() * 3);
    doorsToChoose[randomDoorIndex]?.click();
    i < 100 ? willSwitchDoor(true) : willSwitchDoor(false);
    await sleep(100);
    restart();
  }
};


function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};


restart();
