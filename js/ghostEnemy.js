class GhostEnemy extends Bat{
    constructor(board){
        super(board);
        
        this.velocityY = 1;
        this.width= 40;
        this.height= 40;
        this.element = document.createElement("div");
        this.element.style.position = "absolute";
        this.element.className = "ghost";
        this.element.style.backgroundImage = "url('./image/ghost.gif')";
        this.element.style.backgroundPosition = "center";
        this.element.style.backgroundSize = "cover";
        this.element.style.backgroundRepeat = "no-repeat";
        this.board.appendChild(this.element);

    }
    move() {
        super.move(); 
    }

   
    draw() {
        super.draw(); 
    }
}
