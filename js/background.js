class Background {
    constructor(board, speedFactor = 1) {
      this.board = board;
      this.speedFactor = speedFactor;
      this.x = 0;
      this.y = 0;
      this.width = this.board.clientWidth;
      this.height = this.board.clientHeight;
      this.velocity =30;
      this.image1 = this.createImage();
      this.image2 = this.createImage();

      this.board.appendChild(this.image1);
      this.board.appendChild(this.image2);
  
    }
    createImage() {
        const img = document.createElement("img");
        img.src = "./image/back10.jpg";
        img.style.position = "absolute";
        img.style.width = this.width + "px";
        img.style.height = this.height + "px";
        return img;
    }
    move(speedMultiplier) {
        this.y += this.velocity * speedMultiplier; // Aumenta la velocidad por el multiplicador
        this.image.style.bottom = this.y + "px";

        // Si el fondo se desplaza completamente, puedes reiniciar su posición
        if (this.y >= this.height) {
            this.y = 0;
        }
    }

    draw() {
    
    
        

        this.image1.style.bottom = this.y + "px"; // Imagen superior
        this.image2.style.bottom = (this.y + this.height) + "px";

    }    
    move() {
        this.y -= 2; // Mueve el fondo hacia abajo
        this.draw();
        if (this.y <= -this.height) {
            this.y= 0;
        }
    }
}

