class Score {
    constructor(board){
        this.board = board
        this.width = 100;
        this.height = 40;
        this.x = 20;
        this.y = 500;
        
        this.element = document.createElement("div");
        this.element.className = ("score");
        this.element.style.position = ("absolute")
        this.element.style.fontSize= "20"
        this.element.style.color = "white"
        this.element.innerHTML = "Score : 0";
        this.element.style.fontSize="15px"
        this.element.style.fontFamily = "'MyCustomFont', sans-serif";
    }
    
    draw(scoreValue){
        this.element.innerHTML = `SCORE  :  ${scoreValue}`;
        this.element.style.width = this.width + "px";
        this.element.style.height = this.height + "px";
        this.element.style.left = this.x + "px";
        this.element.style.bottom = this.y + "px";
        this.board.appendChild(this.element);
    }
}