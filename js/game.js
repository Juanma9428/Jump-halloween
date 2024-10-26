class Game {
    constructor(board) {
      this.board = board;
      this.background = new Background(this.board);
      this.player = new Player(this.board,this);
      this.score = new Score(this.board)
      this.blocks = [];
      this.enemies = [];
      this.ghosts = [];
      this.enemyTick = 20;
      this.tempY = 50;
      this.gameOverBoard = document.querySelector("#game-over");
      this.bgSound = document.getElementById("bg-sound");
      this.gosound = document.getElementById("go-sound")
      this.table = document.getElementById("highScoreTable");
      this.restartButton = document.getElementById("restart-btn");
      
     

      this.scoreValue = 0;
      this.intervalId;
      this.tick = 0;
      this.blocksSpeedBoosted = false;


      
    }
    start() {
        this.intervalId = setInterval(() => {
        this.createBlocks();
        this.move();
        this.draw();
        
        this.bgSound.play();
        
        this.cleanup();
        this.playerDead();
        this.tick++;
        if (this.tick % this.enemyTick === 0) {
            if (this.enemies.length < 2) {
                this.enemies.push(new Bat(this.board)); 
            }
            this.enemies.forEach((bat, index) => {
                bat.move();
                bat.draw();

               
                if (bat.y > this.board.offsetHeight) {
                    this.enemies.splice(index, 1); 
                }
            });

            // Generar fantasmas
            /*if (this.tick % this.enemyTick === 0) {
                if (this.ghosts.length < 1) {
                    this.ghosts.push(new GhostEnemy(this.board)); 
                }
                this.ghosts.forEach((ghost, index) => {
                    ghost.move();
                    ghost.draw();

                    // Eliminar fantasmas que salen de la pantalla
                    if (ghost.y > this.board.offsetHeight) {
                        this.ghosts.splice(index, 1); 
                    }
                });
            }*/
            this.cleanup();
          }
        

      }, 1000 / 60);
    }
  

    createBlocks() {
        
        const maxBlocks = this.scoreValue >= 50 ? 8 : 9;

        if (this.blocks.length < maxBlocks) { 
            const width = 60;
            const height = 20;
            let x = Math.floor(Math.random() * (this.board.offsetWidth - width));
            if (this.blocks.length) {
                const lastBlockLeft = this.blocks[this.blocks.length - 1].x;
                while (x - lastBlockLeft > 240) {
                    x -= 10;
                }
                while (x - lastBlockLeft < -240) {
                    x += 10;
                }
            }
            const y = this.tempY;
            let jumpMovement= false
            let smallMovement = false;
            let withMovement = false
            const randomNumberJump = Math.floor(Math.random() * (101)); ;
            const randomNumberMovement = Math.floor(Math.random() * (101));

            if (this.scoreValue > 10 && randomNumberMovement < 10) {
                withMovement = true;
                smallMovement = true;
            }
            if (this.scoreValue > 50 && randomNumberJump < 50) {
                jumpMovement = true;
                
            
            }
            const block = new Block(this.board, x, y, width, height, withMovement, smallMovement, jumpMovement); 
            this.blocks.push(block);
            this.tempY += Math.floor(Math.random() * (100 - 20 + 1) + 20);
            if (this.tempY + height > this.board.offsetHeight) {
                this.tempY = this.board.offsetHeight;
                
            }
        }
}


/*checkCollisions() {
    this.enemies.forEach((enemy) => {
        // Primero, verificamos si hay colisión
        if (this.player.collideWith(enemy)) {
            // Si hay colisión, procesamos las acciones de colisión
            this.player.x -= 10; // Desplazamiento a la derecha
             // Salto hacia arriba

            // Remover el enemigo del juego
            // Comprobar si el jugador ha perdido todas sus vidas
          
        }
    });
}

    activateJumpMovement() {
        this.blocks.forEach(block => {
            block.velocity = 8; 
        });

        
        setTimeout(() => {
            this.blocks.forEach(block => {
                block.velocity = 6; // Restaurar velocidad normal
            });
        }, 1000);
    }*/
        playerDead() {
            if (this.player.y === MAIN_FLOOR && this.player) {
                clearInterval(this.intervalId);
                this.gameOverBoard.style.display = "flex"; // Mostrar el panel de Game Over
                this.bgSound.pause();
                this.bgSound.currentTime = 0;
                this.gosound.play();
                this.restartButton.style.display = "block";
        
                const finalScoreElement = document.getElementById('finalScoreValue');
                finalScoreElement.textContent = this.scoreValue;
        
                const formNode = this.gameOverBoard.querySelector("#score-form");
                formNode.style.display = 'block'; // Asegúrate de que el formulario esté visible
                const highScoreTable = document.getElementById('highScoreTable');
                highScoreTable.style.display = 'none'; // Ocultar la tabla de puntuaciones
        
                formNode.addEventListener("submit", (event) => {
                    event.preventDefault();
                    const formData = new FormData(formNode);
                    const playerName = formData.get("name");
                    const dataToSave = {
                        name: playerName,
                        score: this.scoreValue
                    };
                    const savedName = localStorage.getItem('playerName');
                    if (savedName) {
                        
                        formNode.style.display = 'none';
                        const message = document.createElement('p');
                        message.textContent = `Tu nombre ya está guardado: ${savedName}`;
                        this.gameOverBoard.appendChild(message);
                    } else {
                        // Guardar el puntaje
                        const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
                        highScores.push(dataToSave);
                        highScores.sort((a, b) => b.score - a.score);
                        localStorage.setItem('highScores', JSON.stringify(highScores));
                        formNode.querySelector('input[name="name"]').value = '';
                        formNode.style.display = 'none'; // Ocultar el formulario después de guardar
                        this.displayHighScores(); // Mostrar los puntajes
                        highScoreTable.style.display = 'table'; // Mostrar la tabla de puntajes
                    }
                });
            }
        }
        
    displayHighScores() {
        const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        const scoreTableBody = document.querySelector('#highScoreTable tbody');
    
        // Limpiar la tabla antes de agregar los puntajes
        scoreTableBody.innerHTML = '';
    
        // Ordenar los puntajes de mayor a menor
        highScores.sort((a, b) => b.score - a.score);
    
        // Limitar a los 5 mejores puntajes
        const topScores = highScores.slice(0, 5);
    
        // Recorrer los puntajes y agregar filas a la tabla
        topScores.forEach((scoreEntry, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}. ${scoreEntry.name}</td>
                <td>${scoreEntry.score}</td>
            `;
            scoreTableBody.appendChild(row);
        });
    }
    
    
    displayHighScoresAll() {
        const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        const scoreTableBody = document.querySelector('#highScoreTable tbody');
    
        // Limpiar la tabla antes de agregar los puntajes
        scoreTableBody.innerHTML = '';
    
        // Ordenar los puntajes de mayor a menor
        highScores.sort((a, b) => b.score - a.score);
    
        // Recorrer los puntajes y agregar filas a la tabla
        highScores.forEach((scoreEntry, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}. ${scoreEntry.name}</td>
                <td>${scoreEntry.score}</td>
            `;
            scoreTableBody.appendChild(row);
        });
    
        // Mostrar la tabla solo si hay puntajes
        const highScoreTable = document.getElementById('highScoreTable');
        highScoreTable.style.display = highScores.length > 0 ? 'table' : 'none';
    }
    
  
    
    move() {
      this.player.move(this.blocks);
      if (this.player.y > this.board.clientHeight / 2) {
          this.blocks.forEach((block) => block.moveY());
      }
      this.player.updateBackground(this.background, this.blocks);
      
     this.blocks.forEach(block => block.moveX());
     this.enemies.forEach((enemy) => {
        enemy.move();
      });
      
      
    }
  
    cleanup() {
        const currentBlocksLength = this.blocks.length;
        this.blocks = this.blocks.filter((block) => block.y + block.height > 0)
        if (this.blocks.length < currentBlocksLength) {
            this.scoreValue++;
            console.log(this.scoreValue)
        }
         
            this.enemies = this.enemies.filter(enemy => enemy.x + enemy.width > 0 && enemy.y + enemy.height > 0);
        
    }
  
    draw() {
      this.background.draw();
      this.player.draw();
      this.blocks.forEach(blocks => blocks.draw());
      this.score.draw(this.scoreValue);
      this.enemies.forEach((enemy) => {
        enemy.draw();
        this.ghosts.forEach((ghost) => ghost.draw());
      });
    }
  }
  