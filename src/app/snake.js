class Snake {
    constructor(settings, defaultBody = [], item) {
        this.pixelSize = settings.pixelSize || 15;
        this.areaSizeX = settings.areaSizeX || 795;
        this.areaSizeY = settings.areaSizeY || 600;
        this.defaultBody = defaultBody;
        this.item = item;
        this.currentItem = null;
        this.snake = [];
    }

    init() {
        if (this.defaultBody) {
            this.snake = this.defaultBody;
        }

        if (this.snake.length === 0) {
            this.snake = [
                {x: 0, y: 0},
                {x: 1 * this.pixelSize, y: 0},
                {x: 2 * this.pixelSize, y: 0},
                {x: 3 * this.pixelSize, y: 0},
            ];
        }
    }

    move(direction) {
        let head = this.snake[this.snake.length-1];
        let x = head.x;
        let y = head.y;

        switch (direction) {
            case 'up':
                y -= this.pixelSize;
                break;
            case 'down':
                y += this.pixelSize;
                break;
            case 'left':
                x -= this.pixelSize;
                break;
            case 'right':
                x += this.pixelSize;
                break;
        }

        if (this.isCollision(x, y)) {
            throw new Error('Collision detected.');
        }

        this.calculateItem();

        if (this.currentItem.x === x && this.currentItem.y === y) {
            this.snake.unshift({x: this.snake[0].x - this.pixelSize, y: 0});
            this.currentItem = null;

            const event = new Event('point');
            document.dispatchEvent(event);
        }


        this.snake.shift();
        this.snake.push({x: x, y: y});

        this.recalculateSnake(direction);
    }

    recalculateSnake(direction) {
        const index = this.snake.length - 1;
        const head = this.snake[index];

        if (direction === 'right' && head.x >= this.areaSizeX) {
            this.snake[index].x = 0;
        }

        if (direction === 'left' && head.x < 0) {
            this.snake[index].x = this.areaSizeX - this.pixelSize;
        }

        if (direction === 'down' && head.y >= this.areaSizeY) {
            this.snake[index].y = 0;
        }

        if (direction === 'up' && head.y < 0) {
            this.snake[index].y = this.areaSizeY - this.pixelSize;
        }
    }

    isCollision(x, y) {
        for (const item of this.snake) {
            if (item.x === x && item.y === y) {
                return true;
            }
        }

        return false;
    }

    calculateItem () {
        if (this.currentItem === null) {
            this.currentItem = this.item.createItem(this.snake);
        }

        return this.currentItem;
    };

    body() {
        return this.snake;
    }
}

module.exports = Snake;