class Bat {
    constructor(board) {
        this.board = board;
        this.width = 70;  
        this.height = 70; 

        
        this.x = Math.random() * (this.board.offsetWidth - this.width);

        
        this.y = -this.height; 

 
        this.velocityY = 2; 
        this.velocityX = (Math.random() - 0.5) * 2;

         
        this.element = document.createElement("div");
        this.element.style.position = "absolute";
        this.element.className = "bat";
        this.element.style.backgroundImage = "url('./image/bat.gif')";
        this.element.style.backgroundPosition = "center";
        this.element.style.backgroundSize = "cover";
        this.element.style.backgroundRepeat = "no-repeat";

        
        this.board.appendChild(this.element);
    }

  
    draw() {
        this.element.style.width = this.width + "px";
        this.element.style.height = this.height + "px";
        this.element.style.left = this.x + "px";
        this.element.style.top = this.y + "px"; 
    }

   
    move() {
        
        this.y += this.velocityY; 
        this.x += this.velocityX; 

       
        if (this.x < 0 || this.x + this.width > this.board.offsetWidth) {
            this.velocityX *= -1;  
        }

        
        if (Math.random() < 0.01) { 
            this.velocityY = (Math.random() * 2) + 1; 
        }

        
        if (this.y > this.board.offsetHeight) {
            this.remove(); 
        }
    }

    
    remove() {
        this.element.remove(); 
    }
}
