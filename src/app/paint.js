class Paint {

    constructor(canvas, settings) {
        this.canvas = canvas;
        this.settings = settings;
    }

    drawSnake(snake) {
        let i = 0;
        for (const snakePart of snake) {
            if (i < 255) {
                ++i;
            }

            this.canvas.fillStyle = 'rgb(43, ' + Math.floor(255 - i)  + ', 71)';
            this.canvas.strokeStyle = '#219538';
            this.canvas.strokeRect(snakePart.x, snakePart.y, this.settings.pixelSize, this.settings.pixelSize);
            this.canvas.fillRect(snakePart.x, snakePart.y, this.settings.pixelSize, this.settings.pixelSize);
        }
    }

    clearSnake(snake) {
        for (const snakePart of snake) {
            const size = this.settings.pixelSize + 2;
            this.canvas.clearRect(snakePart.x-1, snakePart.y-1, size, size);
        }
    }

    gameOver() {
        this.canvas.font = "italic bold 30px Arial";
        this.canvas.textBaseline = "middle";
        this.canvas.fillText('GAME OVER', 300, 200);
    }

    drawItem(x, y) {
        this.canvas.fillStyle = '#FF5733';
        this.canvas.strokeStyle = '#FFC300';
        this.canvas.fillRect(x, y, this.settings.pixelSize, this.settings.pixelSize);
        this.canvas.strokeRect(x, y, this.settings.pixelSize, this.settings.pixelSize);

    }
}

module.exports = Paint;