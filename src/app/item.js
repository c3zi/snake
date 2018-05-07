// @flow

class Item {
    width: number;
    height: number;
    pixelSize: number;
    type: string;

    constructor(width: number, height: number, pixelSize: number) {
        if (width > 0) {
            width -= pixelSize;
        }

        if (height > 0) {
            height -= pixelSize;
        }

        this.width = width;
        this.height = height;
        this.pixelSize = pixelSize;
        this.type = 'simple';

    }

    createItem(snake: Object[]): Object {
        let pointX = 0;
        let pointY = 0;

        if (this.width !== 0) {
            const randomX = Math.floor(Math.random() * this.width);
            pointX = Math.abs(randomX - (randomX % this.pixelSize));
        }

        if (this.height !== 0) {
            const randomY = Math.floor(Math.random() * this.height);
            pointY = Math.abs(randomY - (randomY % this.pixelSize));
        }

        if (pointX !== 0 || pointY !== 0) {
            for (const snakePart of snake) {
                if (pointX === snakePart.x && pointY === snakePart.y) {
                    return this.createItem(snake);
                }
            }
        }

        return { x: pointX, y: pointY };
    }
}

module.exports = Item;