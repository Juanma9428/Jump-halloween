class Player{
    constructor(board, game) {
        this.board = board;
        this.game = game;
        this.width = 45;
        this.height = 60;
        this.x = this.board.clientHeight / 2;
        this.y0 = MAIN_FLOOR;
        this.y = 0;
        this.prevY = this.y;
        this.vy =18;
        this.vx = 6;
        this.maxHeight = this.board.clientHeight / 2 + 20;
        this.gravity = 0.6; 
        this.jumpStrength = 15;
        this.isOnPlatform = false;
        this.tick = 0;
        this.blocksSpeedBoosted = false;
        this.bats= [];
        this.jumpSound = document.getElementById("jump-sound");
        
        
        this.element = document.createElement("div");
        this.element.style.position = "absolute";
        this.element.className = "player";
        
        this.element.style.backgroundImage = `url('./image/start.png')`;
        this.element.style.backgroundPosition = "center";
        this.element.style.backgroundSize = "cover";
        this.element.style.backgroundRepeat = "no-repeat";
        this.setListeners();

    this.actions = {
      isJumping: false,
      up: false,
      down: false,
      left: false,
      right: false,
      canShoot: true,
    };

    }
    draw() {
        this.element.style.width = this.width + "px";
        this.element.style.height = this.height + "px";
        this.element.style.left = this.x + "px";
        this.element.style.bottom = this.y + "px";
    
        this.board.appendChild(this.element);
    
        /*this.bullets.forEach((bullet) => {
          bullet.draw();
        });*/
      }
      setListeners() {
        window.addEventListener("keydown", (event) => {
          switch (event.key) {
            // case "ArrowUp":
            //   this.actions.up = true;
            //   break;
            // case "ArrowDown":
            //   this.actions.down = true;
            //   break;
            case "ArrowLeft":
              this.actions.left = true;
              
              break;
            case "ArrowRight":
              this.actions.right = true;
            
              break;
            case " ":
                if (!this.actions.isJumping || this.isOnPlatform) {

                    this.element.style.backgroundImage = `url('./image/jump.png')`;
                    this.actions.isJumping = true;
                    
                }
                break;

            
            case "z":
              console.log("shoot");
              this.shoot();
              break;
          }
        });
    
        window.addEventListener("keyup", (event) => {
          switch (event.key) {
            // case "ArrowUp":
            //   this.actions.up = false;
            //   break;
            // case "ArrowDown":
            //   this.actions.down = false;
            //   break;
            case "ArrowLeft":
              this.actions.left = false;
              break;
            case "ArrowRight":
              this.actions.right = false;
              break;
            case " ":
              this.vy -= 4;
              break;
          }
        });
      }
      move(block) {
        // MOVEMENTS
        this.prevY = this.y;
        if (this.actions.isJumping) {
            this.y += this.vy;
            this.vy -= this.gravity;
            
    
            if (this.y < this.y0 && !this.isOnPlatform) {
                this.y = this.y0;
                this.vy = 15;  // Saltar de nuevo
            }
            this.bats.forEach((bat) => {
                if (this.collideWith(bat)) {
                    console.log("Colisión con el murciélago");
                    this.handleCollisionWithBat(bat);  // Acción cuando el jugador choca con el murciélago.
                }
            });
        }
        
        
    
        if (this.actions.left) {
            this.x -= this.vx;
            this.element.style.transform = `scaleX(-1)`;
        } else if (this.actions.right) {
            this.x += this.vx;
            this.element.style.transform = `scaleX(1)`;
        }
        const centerBoardY = this.board.clientHeight / 2;
        const upperLimitY = centerBoardY + 20; 
         if (block.jumpMovement && !this.blocksSpeedBoosted) {
                this.blocksSpeedBoosted = true;

        blocks.forEach(block => {
            block.velocity = 20;
        });
        setTimeout(() => {
            blocks.forEach(block => {
                block.velocity = 2;
            });
            this.blocksSpeedBoosted = false; 
        }, 1000);
            }

        if (this.y > this.maxHeight) {
            this.y = this.maxHeight; 
            
            block.forEach(block => {
                block.velocity = 5; 
            });
           
        } else {
            
            block.forEach(block => {
                block.velocity = 4;
            });
        }
    
        
        if (this.x < 0) { 
            this.x = 0; 
        }
    
       
        if (this.x > this.board.clientWidth - this.width) {
            this.x = this.board.clientWidth - this.width; 
        }
    
       
        if (this.y > this.board.clientHeight - this.height) {
            this.y = this.board.clientHeight - this.height; 
       
        }
        
        this.checkCollisions(block);
        
        this.draw();  
    }

    handleCollisionWithBat() {
        const currentTime = Date.now();
        if (!this.isColliding && (currentTime - this.lastCollisionTime) > this.collisionCooldown) {
            this.isColliding = true; // Activar el estado de colisión
            this.lastCollisionTime = currentTime; // Actualizar el tiempo de la última colisión

            // Movimiento de salto en la colisión
            this.y -= 10; // Ajusta la altura del "salto"
            this.x += 10; // Ajusta el desplazamiento horizontal

            // Opción: reducir puntos o aplicar penalización
            this.game.score -= 10;
            if (this.game.score < 0) this.game.score = 0;
            this.game.updateScore();

            // Restablecer el estado de colisión después de un tiempo
            setTimeout(() => {
                this.isColliding = false; // Desactivar el estado de colisión
            }, this.collisionCooldown); // Tiempo de "invulnerabilidad" en milisegundos
        }
    }


    
    
    updateBackground(background, blocks) {
        const centerBoardY = this.board.clientHeight / 2;
    
        
        if (this.y > centerBoardY) {
            background.move();
    
            
            if (this.y > centerBoardY + 15) {
                background.velocity = 60; 
                blocks.forEach(block => {
                    block.velocity = 6; 
                });
                
            } 
           
        }
    }
    
    checkCollisions(blocks) {
        let isOnPlatform = false;
    
        blocks.forEach((block) => {
            
            const playerLeft = this.x;
            const playerRight = this.x + this.width;
            const playerTop = this.y + this.height;
            const playerBottom = this.y; 
    
            
            const blockLeft = block.x;
            const blockRight = block.x + block.width;
            const blockTop = block.y + block.height;
            const blockBottom = block.y;
            
            if (
                this.vy < 0 && 
                playerRight > blockLeft && playerLeft < blockRight &&
                playerBottom <= blockTop && playerBottom >= blockBottom &&
                this.prevY > blockTop
            ) {

               
                this.y = blockTop;
                this.vy = 15; 
                isOnPlatform = true;
                
                
                
            }
    
            
            else if (
                this.vy > 0 && 
                playerRight > blockLeft && playerLeft < blockRight && 
                playerTop >= blockBottom && playerBottom < blockBottom 
            ) {
                
                this.vy = this.vy;
            }
            
            7/*if (block.jumpMovement) {
                // Activar el aumento de velocidad si el bloque tiene "jumpMovement"
                this.game.activateJumpMovement();
            }*/
        });
    
       
        this.isOnPlatform = isOnPlatform;
        
    }
    
    
      collideWith(entity) {
        return (
          this.x < entity.x + entity.width &&
          this.x + this.width > entity.x &&
          this.y < entity.y + entity.height &&
          this.height + this.y > entity.y
        );
      }

}