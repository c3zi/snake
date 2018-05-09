// @flow

import Snake from './Snake';
import Item from './Item';
import Paint from './Paint';

class Game {
    context: Object;
    settings: Object;
    snake: Snake;
    paint: Paint;

    constructor(context: Object) {
        this.context = context;
        this.settings = {
            pixelSize: 15,
            areaSizeX: 795,
            areaSizeY: 600,
            speed: 80
        };

        const item = new Item(this.settings.areaSizeX, this.settings.areaSizeY, this.settings.pixelSize);
        const canvas = this.context.getElementById("myCanvas");

        if (!(canvas instanceof HTMLCanvasElement)) {
            return;
        }

        canvas.width = this.settings.areaSizeX;
        canvas.height = this.settings.areaSizeY;
        const ctx = canvas.getContext("2d");


        this.snake = new Snake(this.settings, [], item);
        this.snake.init();

        this.paint = new Paint(ctx, this.settings);
    }

    play(): void {
        let direction = 'right';
        let lastDirectionTime = null;

        this.context.onkeydown = (event) => {
            const keyCode = event.keyCode;

            const d = new Date();
            const currentTime = d.getTime();

            if (lastDirectionTime === null || (currentTime-lastDirectionTime) > this.settings.speed) {
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

        let loop: any  = setInterval(() => {
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
    }
}

module.exports = Game;