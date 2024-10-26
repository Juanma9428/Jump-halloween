window.addEventListener("load", function () {
  const startButton = document.getElementById("start-btn");
  const restartButton = document.querySelector("#restart-btn")
  const bgSound = document.getElementById("bg-sound");
  const board = document.getElementById("game-board");
  let game;

  startButton.addEventListener("click", function () {
    startButton.style.display = "none";
    game = new Game(board);
    game.start();
  });
  restartButton.addEventListener("click", function () {
    restartButton.style.display = "none";
    const gameOverBoard = document.getElementById("game-over");
    gameOverBoard.style.display = "none";  // Ocultar la pantalla de "Game Over".
    board.style.display = "block";  // Asegurarse de que el tablero esté visible.
    
    game = new Game(board);  // Crear una nueva instancia del juego para reiniciarlo.
    game.start();  // Iniciar el nuevo juego.
});
});