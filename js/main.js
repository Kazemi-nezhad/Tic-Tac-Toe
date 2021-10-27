window.onload = function () {
  const cellArray = document.querySelectorAll(".cells");
  //console.log(cellArray);
  const winnerAlert = document.getElementById("winner_alert");
  /****/
  var filledCells = 0;
  var cellTracker = [];
  /****/
  var xTimer = 20;
  var oTimer = 20;
  const timerX = document.getElementById("playerX_timer");
  const timerO = document.getElementById("playerO_timer");
  /****/
  var currentTurn = "X";
  const playerTurn = document.getElementById("player_turn");
  /****/
  var gameRunning = false;
  var stopBtnClicked = false;
  /****/
  var counterRowX = 0,
    counterRowO = 0,
    counterColumnX = 0,
    counterColumnO = 0,
    counterCrossX = 0,
    counterCrossO = 0,
    counterReverseCrossX = 0,
    counterReverseCrossO = 0;
  /****/
  const startBtn = document.getElementById("start_btn");
  const stopBtn = document.getElementById("stop_btn");
  const resetBtn = document.getElementById("reset_btn");
  const redoBtn = document.getElementById("redo_btn");
  /**********************/
  var xTimerId;
  var oTimerId;
  function xTimerReducer() {
    xTimerId = setInterval(() => {
      if (xTimer > 0) {
        xTimer--;
        timerX.innerText = xTimer;
      } else {
        clearInterval(xTimerId);
        winnerAlert.style.display = "block";
        winnerAlert.innerText = `X's time has run out. O is the winner`;
        cellTracker = [];
      }
    }, 1000);
  }
  function oTimerReducer() {
    oTimerId = setInterval(() => {
      if (oTimer > 0) {
        oTimer--;
        timerO.innerText = oTimer;
      } else {
        clearInterval(oTimerId);
        winnerAlert.style.display = "block";
        winnerAlert.innerText = `O's time has run out. X is the winner`;
        cellTracker = [];
      }
    }, 1000);
  }
  /**********************/
  function winnerAlertFunction(player) {
    winnerAlert.style.display = "block";
    winnerAlert.innerText = `${player} is the winner`;
    clearInterval(xTimerId);
    clearInterval(oTimerId);
    cellTracker = [];
  }
  /**********************/
  startBtn.addEventListener("click", function () {
    gameRunning = true;
    stopBtnClicked = false;
    startBtn.style.display = "none";
    stopBtn.style.display = "block";
    if (currentTurn == "X") {
      xTimerReducer();
    } else {
      oTimerReducer();
    }
  });
  cellArray.forEach((cellElement) => {
    cellElement.addEventListener("click", function () {
      if (cellElement.innerText == "." && gameRunning) {
        cellTracker.push(cellElement.id);
        cellElement.innerText = currentTurn;
        filledCells++;
        if (currentTurn == "X") {
          currentTurn = "O";
          clearInterval(xTimerId);
          oTimerReducer();
          cellElement.classList.add("cell_blue");
          playerTurn.innerText = currentTurn;
        } else {
          currentTurn = "X";
          clearInterval(oTimerId);
          xTimerReducer();
          cellElement.classList.add("cell_red");
          playerTurn.innerText = currentTurn;
        }
      }
      /******بررسی شرط های برنده شدن با استفاده از آرایه و حلقه******/
      const rowLength = Math.sqrt(cellArray.length),
        columnLength = Math.sqrt(cellArray.length);
      var cellCounter = 0;
      /***ساختن آرایه دوبعدی***/
      var cellValuesArray = new Array(rowLength);
      for (let i = 0; i < rowLength; i++) {
        cellValuesArray[i] = new Array(columnLength);
      }
      /***اتمام ساختن آرایه دوبعدی***/
      for (let i = 0; i < rowLength; i++) {
        for (let j = 0; j < columnLength; j++) {
          cellCounter++;
          cellValuesArray[i][j] = document.getElementById(
            `D${cellCounter}`
          ).innerText;
        }
      }
      console.log(cellValuesArray, cellCounter);
      /******اتمام بررسی شرط های برنده شدن با استفاده از آرایه و حلقه******/
      /******شرط های برنده شدن*******/
      for (let i = 0; i < rowLength; i++) {
        counterRowX = 0;
        counterRowO = 0;
        counterColumnX = 0;
        counterColumnO = 0;
        /***/
        for (let j = 0; j < columnLength; j++) {
          if (cellValuesArray[i][j] == "X") counterRowX++;
          else if (cellValuesArray[i][j] == "O") counterRowO++;
          if (cellValuesArray[j][i] == "X") counterColumnX++;
          else if (cellValuesArray[j][i] == "O") counterColumnO++;
        }
        if (cellValuesArray[i][i] == "X") counterCrossX++;
        else if (cellValuesArray[i][i] == "O") counterCrossO++;
        if (cellValuesArray[i][rowLength - 1 - i] == "X")
          counterReverseCrossX++;
        else if (cellValuesArray[i][rowLength - 1 - i] == "O")
          counterReverseCrossO++;
        /***/
        if (counterRowX == rowLength) winnerAlertFunction("X");
        else if (counterRowO == rowLength) winnerAlertFunction("O");
        else if (counterColumnX == columnLength) winnerAlertFunction("X");
        else if (counterColumnO == columnLength) winnerAlertFunction("O");
        else if (counterCrossX == rowLength) winnerAlertFunction("X");
        else if (counterCrossO == rowLength) winnerAlertFunction("O");
        else if (counterReverseCrossX == rowLength) winnerAlertFunction("X");
        else if (counterReverseCrossO == rowLength) winnerAlertFunction("O");
        if (i + 1 == rowLength) {
          counterCrossX = 0;
          counterCrossO = 0;
          counterReverseCrossX = 0;
          counterReverseCrossO = 0;
        }
      }
      /***********شرط مساوی شدن بازی*********/
      if (filledCells == cellArray.length) {
        winnerAlert.style.display = "block";
        winnerAlert.innerText = `The game is a tie`;
        clearInterval(xTimerId);
        clearInterval(oTimerId);
        cellTracker = [];
      }
    });
  });
  stopBtn.addEventListener("click", function () {
    clearInterval(xTimerId);
    clearInterval(oTimerId);
    stopBtnClicked = true;
    gameRunning = false;
    stopBtn.style.display = "none";
    startBtn.innerText = "ادامه";
    startBtn.style.display = "block";
  });
  resetBtn.addEventListener("click", function () {
    clearInterval(xTimerId);
    clearInterval(oTimerId);
    gameRunning = false;
    filledCells = 0;
    playerTurn.innerText = "X";
    currentTurn = "X";
    xTimer = 20;
    oTimer = 20;
    timerX.innerText = xTimer;
    timerO.innerText = oTimer;
    cellArray.forEach((cellElement) => {
      cellElement.innerText = ".";
      cellElement.classList.remove("cell_blue");
      cellElement.classList.remove("cell_red");
    });
    winnerAlert.innerText = "";
    winnerAlert.style.display = "none";
    stopBtn.style.display = "none";
    startBtn.style.display = "block";
    startBtn.innerText = "شروع";
  });
  redoBtn.addEventListener("click", function () {
    if (filledCells > 0) {
      filledCells--;
      if (currentTurn == "X") {
        clearInterval(xTimerId);
        if (!stopBtnClicked) {
          oTimerReducer();
        }
        currentTurn = "O";
        playerTurn.innerText = "O";
      } else {
        clearInterval(oTimerId);
        if (!stopBtnClicked) {
          xTimerReducer();
        }
        currentTurn = "X";
        playerTurn.innerText = "X";
      }
      let lastCell = cellTracker.pop();
      document.getElementById(lastCell).innerText = ".";
      document.getElementById(lastCell).classList.remove("cell_blue");
      document.getElementById(lastCell).classList.remove("cell_red");
    }
  });
};
