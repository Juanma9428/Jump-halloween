class Block {
    constructor(board, x, y, width = 60, height = 20, withMovement = false, smallMovement = false, jumpMovement = false) {
        this.board = board;
        this.width = width;
        this.height = height;
        this.velocity = 10;
        this.xVelocity = 1;
        this.x = x; 
        this.y = y; 
        this.withMovement = withMovement; 
        this.smallMovement = smallMovement;
        this.jumpMovement = jumpMovement;

        this.element = document.createElement("div");
        this.element.className = "block"; 
        this.element.style.position = "absolute";
        this.element.style.width = this.width + "px";
        this.element.style.height = this.height + "px";
        this.element.style.backgroundImage = `url('./image/block1.png')`; 
        this.element.style.left = this.x + "px";  
        this.element.style.bottom = this.y + "px"; 
        this.element.style.backgroundPosition = "center";
        this.element.style.backgroundSize = "cover";
        this.element.style.backgroundRepeat = "no-repeat";

        this.board.appendChild(this.element);
    }

    moveX() {
        if (this.withMovement) {

            if (this.x < 0 || this.x + this.width > this.board.offsetWidth) {
                this.xVelocity *= -1;
            }
            this.x += this.xVelocity;
        }
    }

    moveY() {
        if (this.smallMovement) {
            this.width = 60;
            this.height = 20;
        }
        if (this.jumpMovement) {
            if (this.x < 0 || this.x + this.width > this.board.offsetWidth) {
                this.xVelocity *= -1;
            }
            this.width = 40;
            this.height = 20;
            this.element.style.backgroundImage = `url('./image/block2.png')`; 
            this.element.style.backgroundSize = "100% 100%";  // Ajusta la imagen al tamaño del bloque
            this.element.style.backgroundPosition = "center";
            this.element.style.backgroundRepeat = "no-repeat";

        }
       
        
        this.y -= this.velocity;
        
    }

    draw() {
        this.element.style.width = this.width + "px";
        this.element.style.height = this.height + "px";
        this.element.style.left = this.x + "px";
        this.element.style.bottom = this.y + "px";
        
        if (!this.board.contains(this.element)) {
            this.board.appendChild(this.element);
        }
    }
}