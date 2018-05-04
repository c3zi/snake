const assert = require('assert');
const Item = require('../app/item');

describe('Item class', () => {
    describe('createItem()', () =>  {
        it('it should return x,y different than snake part', () => {
            const snake = [
                {x: 15, y: 0},
                {x: 30, y: 0},
                {x: 45, y: 0},
                {x: 60, y: 0},
            ];

            const item = new Item(60, 0, 15);
            const result = item.createItem(snake);

            assert.equal(result.x, 0);
            assert.equal(result.y, 0);
        });

        it('it should return x=0, y=0 when width an height is 0', () => {
            const snake = [
                {x: 0, y: 0},
                {x: 15, y: 0},
                {x: 30, y: 0},
                {x: 45, y: 0},
                {x: 60, y: 0},
            ];

            const item = new Item(0, 0, 15);
            const result = item.createItem(snake);

            assert.equal(result.x, 0);
            assert.equal(result.y, 0);
        });

    });
});