import Snake from './Snake';
import Item from './Item';
import Paint from './Paint';
import Sound from './Sound';

class Game {
    constructor() {
        this.settings = {
            pixelSize: 15,
            areaSizeX: 795,
            areaSizeY: 600,
            speed: 80
        };

        const item = new Item(this.settings.areaSizeX, this.settings.areaSizeY, this.settings.pixelSize);
        const c = document.getElementById("myCanvas");
        c.width = this.settings.areaSizeX;
        c.height = this.settings.areaSizeY;
        const ctx = c.getContext("2d");


        this.snake = new Snake(this.settings, [], item);
        this.snake.init();

        this.paint = new Paint(ctx, this.settings);
        this.sound = new Sound();
    }

    play() {
        let direction = 'right';
        let lastDirectionTime = null;

        document.onkeydown = (event) => {
            const keyCode = event.keyCode;

            const d = new Date();
            const currentTime = d.getTime();

            if (lastDirectionTime !== null && (currentTime-lastDirectionTime) > this.settings.speed) {
                switch (keyCode) {
                    case 37:
                        if (direction !== 'right') {
                            direction = 'left';
                        }

                        break;
                    case 39:
                        if (direction !== 'left') {
                            direction = 'right';
                        }

                        break;
                    case 38:
                        if (direction !== 'down') {
                            direction = 'up';
                        }

                        break;
                    case 40:
                        if (direction !== 'up') {
                            direction = 'down';
                        }

                        break;
                }
            }
            const date = new Date();
            lastDirectionTime = date.getTime();
        };

        let loop = setInterval(() => {
            this.paint.clearSnake(this.snake.body());

            try {
                this.snake.move(direction);
            } catch (e) {
                this.paint.gameOver();
                clearInterval(loop);
                loop = null;
            }

            this.paint.drawSnake(this.snake.body());

            if (this.snake.currentItem !== null) {
                this.paint.drawItem(this.snake.currentItem.x, this.snake.currentItem.y);
            }

        }, this.settings.speed);

        document.addEventListener('point', () => {
            this.sound.beep();
            document.getElementById('points').innerHTML = (this.snake.snake.length - 4).toString();
        }, false);
    }
}

module.exports = Game;