"use strict";

// Globalt objekt som innehåller de attribut som ni skall använda.
// Initieras genom anrop till funktionern initGlobalObject().

let oGameData = {};

window.addEventListener("load", () => {
  initGlobalObject();
  prepGame();
});

/**
 * Initerar det globala objektet med de attribut som ni skall använda er av.
 * Funktionen tar inte emot några värden.
 * Funktionen returnerar inte något värde.
 */
function initGlobalObject() {
  oGameData.gameField = ["", "", "", "", "", "", "", "", ""];

  oGameData.playerOne = "X";
  oGameData.playerTwo = "O";

  oGameData.currentPlayer = "";

  oGameData.nickNamePlayerOne = "";
  oGameData.nickNamePlayerTwo = "";

  oGameData.colorPlayerOne = "";
  oGameData.colorPlayerTwo = "";

  oGameData.seconds = 5;
  oGameData.timerId = null;
  oGameData.timerEnabled = false;

  oGameData.timeRef = document.querySelector("#errorMsg");
}

function checkForGameOver() {
  if (checkWinner(oGameData.playerOne)) {
    //Om detta är true så går den inte vidare till nästa else if. och returnerar värdet 1. Som ger console.log att spelareOne vinner
    return 1;
  } else if (checkWinner(oGameData.playerTwo)) {
    //Om detta är true så går den inte vidare till nästa else if. och returnerar värdet 2. Som ger console.log att spelareTwo vinner
    return 2;
  } else if (checkForDraw()) {
    //Om detta är true så går den inte vidare till nästa else. och returnerar värdet 3. Som ger console.log att det är oavgjort.
    return 3;
  } else {
    //Om detta är true så fortsätter spelet och det är nästa spelares tur.
    return 0;
  }
}

// Viktigt att funktionen returnerar true eller false baserat på om den inskickade spelaren är winner eller ej
function checkWinner(playerIn) {
  let winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [2, 4, 6],
    [0, 4, 8], // Diagonal
  ];

  for (let i = 0; i < winCombinations.length; i++) {
    //loopar igenom tills winCombinations är slut
    let combination = winCombinations[i]; // när jag loopar igenom winCombinations vill jag spara [i] i variabeln let combination.
    //                                     //Den plockar ut en array som innehåller 0,1,2 och sparar in combination

    let cellA = oGameData.gameField[combination[0]]; //Jag letar upp det första värdet(som är ett index) i t.ex. [3,4,5] arrayen.
    // Jag får ut index 3. Vilket innebär oGameData.gameField[index3]
    let cellB = oGameData.gameField[combination[1]];
    // Jag får ut index 4. Vilket innebär oGameData.gameField[index4]
    let cellC = oGameData.gameField[combination[2]];
    // Jag får ut index 5. Vilket innebär oGameData.gameField[index5]

    if (
      cellA === playerIn &&
      // Här undrar jag om cellA är strikt lika med vår parameter playerIn
      // (parametern playerIn står för argumentet som skickas in när funktionen checkWinner anropas inifrån funktionen checkForGameover
      // med i detta fall argument playerOne/ playerTwo som ersätter parametern playerIn)
      // Det står alltså med andra ord:
      //cellA === playerOne alternativt cellA === playerTwo
      // om vi kollar deklarationen av playerOne och playerTwo så är de definierade med string "X" och "O". Vi jämför två strings i slutändan.
      //cellA === "X" alternativt cellA === "O"
      cellA === cellB &&
      //Om vi nu vet att första kravet är att cellA är samma som playerIn, räcker det att veta att cellA är lika med övriga celler. De stämmer då även med playerIn
      cellA === cellC
    ) {
      console.log(`winner is ${playerIn}`);
      //console.log(Winner is X)
      return true;
      //returnerar true / sant om ovanstående påstående stämmer. Detta kan checkForGamerover hantera, det var inuti den som funktionen checkWinner anropades ifrån.
    }
  }
  return false;
  //returnerar false / falskt om ovanstående påstående inte stämmer och det inte heller finns något mer att loopa igenom.
  // När det är false kan checkForGameover inte returnera de första två delarna i if-satsen och deklarera en vinnare.
  // checkForGameover går då vidare till att kontrollera sitt nästa funktionsanrop: checkForDraw och om det är true
}

//Kontrollera om alla platser i oGameData.GameField är fyllda. Om sant returnera true, annars false.
function checkForDraw() {
  for (let i = 0; i < oGameData.gameField.length; i++) {
    //Vi använder en for-loop till att loopa igenom antalet alternativ på spelbrädet
    if (oGameData.gameField[i] === "") {
      // Om i (index) någon gång visar sig ha värdet "" kommer funktionen returnera false.
      return false;
    }
  }
  return true; // Om däremot vi loopar igenom hela vårt bräde och ingen visar sig innehålla "" returnerar den true.
  // Detta kan checkForGamerover hantera, det var inuti den som funktionen checkForDraw anropades ifrån.
}

// Nedanstående funktioner väntar vi med!

//Här skall ni lägga till klassen "d-none" på elementet i DOM-en med id:t "gameArea",
// samt lägga en lyssnare på "Starta spelet!"-knappen som lyssnar efter ett klick.
// När den klickas skall ni anropa funktionen "initiateGame()".

function prepGame() {
  document.getElementById("gameArea").classList.add(`d-none`); // lägger till class d-none

  document.getElementById("newGame").addEventListener("click", () => {
    //Lägger till en lyssnare efter ett klick på knappen newGame, startar då initiateGame()
    validateForm(); // BYTTET UT INITIATEGAME MED DENNE HER ----------------------------------------------------------------- <<<<<<<
    console.log(newGame);
  });
}

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

document.querySelector("#theForm").addEventListener("submit", (event) => {
  event.preventDefault();
  validateForm();
});

function validateForm() {
  console.log("validateForm()");

  oGameData.nickNamePlayerOne = document.querySelector(`#nick1`).value;
  oGameData.colorPlayerOne = document.querySelector(`#color1`).value;
  oGameData.nickNamePlayerTwo = document.querySelector(`#nick2`).value;
  oGameData.colorPlayerTwo = document.querySelector(`#color2`).value;

  try {
    if (
      oGameData.nickNamePlayerOne.length < 3 ||
      oGameData.nickNamePlayerOne.length > 10
    ) {
      document.querySelector(`#nick1`).focus();
      nick1.style.border = "3px solid red";
      throw new Error("Username must be between 3-10 characters.");
    } else if (oGameData.nickNamePlayerOne === oGameData.nickNamePlayerTwo) {
      document.querySelector(`#nick1`).focus();
      nick1.style.border = "3px solid red";
      throw new Error("You cannot choose the same name.");
    } else {
      document.querySelector(`#nick1`).blur();
      document.querySelector(`#nick1`).style.removeProperty("border");
    }

    if (
      oGameData.nickNamePlayerTwo.length < 3 ||
      oGameData.nickNamePlayerTwo.length > 10
    ) {
      document.querySelector(`#nick2`).focus();
      nick2.style.border = "3px solid red";
      throw new Error("Username must be between 3-10 characters.");
    } else if (oGameData.nickNamePlayerOne === oGameData.nickNamePlayerTwo) {
      document.querySelector(`#nick2`).focus();
      nick2.style.border = "3px solid red";
      throw new Error("You cannot choose the same name.");
    } else {
      document.querySelector(`#nick2`).blur();
      document.querySelector(`#nick2`).style.removeProperty("border");
    }

    if (
      oGameData.colorPlayerOne === "#ffffff" ||
      oGameData.colorPlayerOne === "#000000"
    ) {
      document.querySelector(`#color1`).focus();
      // Rød border rundt båda INPUT-feltene, ikke bare en av dem
      document.querySelector(`#color1`).style.border = "3px solid red";

      throw new Error("You cannot choose the color black or white.");
    } else if (oGameData.colorPlayerOne === oGameData.colorPlayerTwo) {
      document.querySelector(`#color1`).focus();
      document.querySelector(`#color1`).style.border = "3px solid red";
      throw new Error("You cannot choose the same color.");
    } else {
      document.querySelector(`#color1`).blur();
      document.querySelector(`#color1`).style.removeProperty("border");
    }

    if (
      oGameData.colorPlayerTwo === "#ffffff" ||
      oGameData.colorPlayerTwo === "#000000"
    ) {
      document.querySelector(`#color2`).focus();
      // Rød border rundt båda INPUT-feltene, ikke bare en av dem
      document.querySelector(`#color2`).style.border = "3px solid red";
      throw new Error("You cannot choose the color black or white.");
    } else if (oGameData.colorPlayerOne === oGameData.colorPlayerTwo) {
      document.querySelector(`#color2`).focus();
      document.querySelector(`#color2`).style.border = "3px solid red";
      throw new Error("You cannot choose the same color.");
    } else {
      document.querySelector(`#color2`).blur();
      document.querySelector(`#color2`).style.removeProperty("border");
    }
    initiateGame();
  } catch (error) {
    console.log(error.message);
    document.querySelector("#errorMsg").textContent = error.message;
  }
}

let cells = document.querySelectorAll(`td`); //Hämtar samtliga celler med taggen td
let jumpotronMsg = document.querySelector(`.jumbotron > h1`); // Hämtar ut H1 tagg till jumpotronMsg

function initiateGame() {
  // let formRef = document.querySelector(`#theForm`); //hämtar hela formuläret och döljer det när spelet startat
  document.querySelector(`#theForm`).classList.add(`d-none`);

  document.getElementById("gameArea").classList.remove(`d-none`); // tar bort classen d-none (display:none) för att synliggöra spelplanen när spelet startat

  // oGameData.timeRef.textContent = `Time left: 5s`;

  //Kopplar till id nick1 i inputfält för att komma åt value(det som spelare 1 KOMMER fylla i)
  oGameData.nickNamePlayerOne = document.querySelector(`#nick1`).value;
  //Kopplar till id color1 i inputfält för att komma åt value(färg) som spelare 1 väljer
  oGameData.colorPlayerOne = document.querySelector(`#color1`).value;

  oGameData.nickNamePlayerTwo = document.querySelector(`#nick2`).value;
  oGameData.colorPlayerTwo = document.querySelector(`#color2`).value;

  for (let cell of cells) {
    //När spelet startar ska samtliga celler vara en tom sträng och bakgrunden vit
    cell.innerText = ``;
    cell.style.backgroundColor = `white`;
  }

  let playerChar = ``; //vad används egentligen playerChar till?
  let playerName = ``;

  let randomNumber = Math.random(); // Sparar ett slumpat tal från funktionen math.random mellan 0-1. Tar inga parametrar
  console.log(randomNumber);

  if (randomNumber < 0.5) {
    //är talet mindre än 0.5 är det spelare 1 som börjar
    playerChar = oGameData.playerOne;
    playerName = oGameData.nickNamePlayerOne;
    oGameData.currentPlayer = oGameData.playerOne;
  } else {
    //är talet större eller lika med 0.5 är det spelare 2 som börjar
    playerChar = oGameData.playerTwo;
    playerName = oGameData.nickNamePlayerTwo;
    oGameData.currentPlayer = oGameData.playerTwo;
  }

  jumpotronMsg.innerText = `Aktuell spelare är ${playerName}`;
  oGameData.timeRef.innerText = `Time left: 5s`;
  //När spelet först startar så är det utifrån mathRandoms tal denna spelares som gör sitt första drag
  console.log(jumpotronMsg);

  document.querySelector(`table`).addEventListener(`click`, executeMove);
  timer();
}

function executeMove(event) {
  /*// Om spelet är över, tillåt inga fler drag
  if (oGameData.gameOver) {
    oGameData.timeRef.textContent =
      "Spelet är redan över. Starta ett nytt spel!";
    return;
  }
  */
  // oGameData.timeRef.textContent = "";
  const cell = event.target; // Hämta cellen som klickades på
  const cellIndex = parseInt(cell.getAttribute("data-id")); // Hämta cellens index

  if (oGameData.gameField[cellIndex] !== "") {
    oGameData.timeRef.textContent = "Cell redan upptagen. Välj en annan.";
    return;
  }

  /*const currentSymbol = oGameData.currentPlayer; // Hämta aktuell spelares symbol*/
  oGameData.gameField[cellIndex] = oGameData.currentPlayer; // Uppdatera spelplanen
  cell.textContent = oGameData.currentPlayer; // Visa symbolen i cellen

  // Applicera färg baserat på spelare
  if (oGameData.currentPlayer === oGameData.playerOne) {
    cell.style.backgroundColor = oGameData.colorPlayerOne;
  } else {
    cell.style.backgroundColor = oGameData.colorPlayerTwo;
  }

  const gameStatus = checkForGameOver(); // Kontrollera spelets status
  if (gameStatus === 0) {
    changePlayer(); // Byt till nästa spelare om spelet fortsätter
  } else {
    gameOver(gameStatus); // Spelet är över
  }
}

function changePlayer() {
  if (oGameData.currentPlayer === oGameData.playerOne) {
    oGameData.currentPlayer = oGameData.playerTwo;
    jumpotronMsg.innerText = `Aktuell spelare är ${oGameData.nickNamePlayerTwo}`; //Skriver ut i H1 högst upp att det är nästa spelares tur
    timer();
  } else {
    oGameData.currentPlayer = oGameData.playerOne;
    jumpotronMsg.innerText = `Aktuell spelare är ${oGameData.nickNamePlayerOne}`;
    timer();
  }
}

function timer() {
  console.log(`Timer startar`);

  oGameData.seconds = 5;
  oGameData.timeRef.textContent = `Time left: 5s`;
  oGameData.timerEnabled = false;

  // Stoppa tidigare timer om den finns
  if (oGameData.timerId) {
    clearInterval(oGameData.timerId);
  }

  // Starta nedräkning
  oGameData.timerId = setInterval(() => {
    oGameData.seconds--;
    oGameData.timeRef.textContent = `Time left: ${oGameData.seconds}s`;

    // Om sekunderna når 0, stoppa timern och byt spelare
    if (oGameData.seconds <= 0) {
      clearInterval(oGameData.timerId);
      console.log(`Tiden är ute! Nästa spelares tur!`);
      changePlayer();
    }
  }, 1000);
}

function gameOver(result) {
  let gameTable = document.getElementById("gameArea");
  oGameData.timeRef = `Grattis!`;
  clearTimeout(oGameData.timerId);
  gameTable.removeEventListener("click", executeMove);
  // gjør sånn at man ikke kan klikke på celler lengre

  gameTable.classList.add("d-none");
  // gjemmer/tar bort spelplanen

  let theForm = document.getElementById("theForm");
  theForm.classList.remove("d-none");
  // theForm = formRef?
  // gjør at formulæret vises på siden igjen

  let playerName;
  let gameResult = "";
  if (result === 1) {
    gameResult = oGameData.playerOne;
    jumpotronMsg.innerText = `${oGameData.nickNamePlayerOne} (${oGameData.playerOne}) wins!`;
    playerName = oGameData.nickNamePlayerOne;
    console.log(`Player 1 wins!`);
    // om resultatet er 1 = playerOne
  } else if (result === 2) {
    gameResult = oGameData.playerTwo;
    jumpotronMsg.innerText = `${oGameData.nickNamePlayerTwo} (${oGameData.playerTwo}) wins!`;
    console.log(`Player 2 wins!`);
    playerName = oGameData.nickNamePlayerTwo;
    // om resultatet er 2 = playerTwo
  } else {
    console.log("It ended in a tie! Try again...");
    jumpotronMsg.innerText = `Det blev oavgjort! Spela igen?`;
    // om det ikke er noen vinnere
  }
  // let jumpotronMsg = document.querySelector('.jumbotron');
  // skriver ut vinner-meddelande i jumbotronen

  initGlobalObject();
}
// ta bort () sånn at den ikke nullstiller alt før vi rekker å se resultatet?
