import "./style.scss";

let allDoors: NodeListOf<HTMLElement> = document.querySelectorAll(
  ".container .door-container .door"
);
let container: HTMLElement | null = document.querySelector(".container");
let doorsContainer: HTMLElement | null = document.querySelector(".door-container");
let dataContainer: HTMLElement | null = document.querySelector(".info-container");
let dataInfo: HTMLElement | null = document.querySelector(".info-container p");
let dataMessage: HTMLElement | null = document.querySelector(".info-message-container");
let welcomeMessage: HTMLElement | null = document.querySelector(".info-result");
let restartGame: HTMLElement | null = document.querySelector(".info-restart");
let stayDoorOption: HTMLElement | null = document.getElementById("stayDoorOption");
let changeDoorOption: HTMLElement | null = document.getElementById("changeDoorOption");

let door1: HTMLElement | null = document.querySelector(".door1");
let door2: HTMLElement | null = document.querySelector(".door2");
let door3: HTMLElement | null = document.querySelector(".door3");

let content1: HTMLElement | null = document.querySelector(".content-1");
let content2: HTMLElement | null = document.querySelector(".content-2");
let content3: HTMLElement | null = document.querySelector(".content-3");

let switchDoorIndex: number;
let selectedDoorIndex: number;
let doors: string[] = [];

door1?.addEventListener("click", () => openDoor(0));
door2?.addEventListener("click", () => openDoor(1));
door3?.addEventListener("click", () => openDoor(2));

changeDoorOption?.addEventListener("click", () => willSwitchDoor(true));
stayDoorOption?.addEventListener("click", () => willSwitchDoor(false));

restartGame?.addEventListener("click", () => restart());

// Main function
restart();

function restart() {
  doors = ["🐑", "🐑", "🐑"];

  welcomeMessage!.style.display = "block";
  container!.classList.remove("blocked");
  dataMessage!.style.display = "none";
  doorsContainer!.classList.remove("blocked");

  door1!.textContent = "1";
  door2!.textContent = "2";
  door3!.textContent = "3";

  content1!.textContent = "";
  content2!.textContent = "";
  content3!.textContent = "";

  allDoors.forEach((element: HTMLElement) => {
    element.style.backgroundColor = "#f9ad5b";
    element.style.border = "4px solid transparent";
    element.classList.remove("translated");
  });

  let index = Math.floor(Math.random() * 3);
  doors[index] = "🚗";
}

// Function for handling the validation of doors
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

  welcomeMessage!.style.display = "none";
  dataInfo!.innerHTML = `Do you want to change to door #${switchDoorIndex + 1}?`;
  const openDoor = document.querySelector(`.content-${openDoorIndex + 1}`);
  openDoor!.innerHTML = "🐑";
  const selectedDoor: HTMLElement | null = document.querySelector(`.door${selectedIndex + 1}`);
  selectedDoor!.style.border = "4px solid #000";

  document
    .querySelector(`.door${openDoorIndex + 1}`)!
    .classList.add("translated");

  container!.classList.add("blocked");
  dataContainer!.style.display = "block";
}

// Function to know if you win or lose
function willSwitchDoor(option: boolean) {
  let youWon: boolean;
  const switchDoor = document.querySelector(`.content-${switchDoorIndex + 1}`);
  const selectedDoor = document.querySelector(
    `.content-${selectedDoorIndex + 1}`
  );

  youWon = doors[option ? switchDoorIndex : selectedDoorIndex] === "🚗";
  youWon
    ? (document.querySelector(".info-message")!.textContent = "You win!")
    : (document.querySelector(".info-message")!.textContent = "You lose!");

  let finalDoor: HTMLElement | null = document.querySelector(
    `.door${(option ? switchDoorIndex : selectedDoorIndex) + 1}`
  );
  finalDoor!.style.backgroundColor = youWon ? "#77dd77" : "#ff6961";

  selectedDoor!.textContent = doors[selectedDoorIndex];
  switchDoor!.textContent = doors[switchDoorIndex];

  allDoors.forEach((element: HTMLElement) => {
    element.classList.add("translated");
    element.style.border = "4px solid transparent";
  });

  dataContainer!.style.display = "none";
  dataMessage!.style.display = "block";
  doorsContainer!.classList.add("blocked");
}
