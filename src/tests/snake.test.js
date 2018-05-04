const assert = require('assert');
const Snake = require('../app/snake');
const Item = require('../app/Item');

describe('Snake class', () => {
    const defaultSnake = [
        {x: 30, y: 30},
        {x: 45, y: 30},
        {x: 60, y: 30},
        {x: 75, y: 30},
    ];
    before(() => {

    });

    describe('move()', () => {
        it('it should increase y position when snake moves up', () => {
            const snake = new Snake({}, defaultSnake, new Item());
            snake.init();
            snake.move('up');

            const result = snake.body().pop();
            assert.equal(15, result.y);
        });

        it('it should decrease y position when snake moves down', () => {
            const snake = new Snake({}, defaultSnake, new Item());
            snake.init();
            snake.move('down');

            const result = snake.body().pop();
            assert.equal(45, result.y);
        });

        it('it should decrease x position when snake moves right', () => {
            const snake = new Snake({}, defaultSnake, new Item());
            snake.init();
            snake.move('right');

            const result = snake.body().pop();
            assert.equal(90, result.x);
        });

        it('it should reset y when a snake reaches maximum y point', () => {
            const defaultSnake = [
                {x: 30, y: 255},
                {x: 30, y: 270},
                {x: 30, y: 285},
                {x: 30, y: 300},
            ];
            const settings = {
                areaSizeX: 400,
                areaSizeY: 300
            };
            const snake = new Snake(settings, defaultSnake, new Item());
            snake.init();
            snake.move('down');

            const result = snake.body().pop();
            assert.equal(0, result.y);
            assert.equal(30, result.x);
        });

        it('it should reset x when a snake reaches maximum x point', () => {
            const defaultSnake = [
                {x: 300, y: 60},
                {x: 315, y: 60},
                {x: 330, y: 60},
                {x: 345, y: 60},
            ];
            const settings = {
                areaSizeX: 345,
                areaSizeY: 300
            };
            const snake = new Snake(settings, defaultSnake, new Item());
            snake.init();
            snake.move('right');

            const result = snake.body().pop();
            assert.equal(0, result.x);
            assert.equal(60, result.y);
        });

        it('it should start moving from the end of x axis when reaches 0 point', () => {
            const defaultSnake = [
                {x: 45, y: 60},
                {x: 30, y: 60},
                {x: 15, y: 60},
                {x: 0, y: 60},
            ];
            const settings = {
                areaSizeX: 345,
                areaSizeY: 300
            };
            const snake = new Snake(settings, defaultSnake, new Item());
            snake.init();
            snake.move('left');

            const result = snake.body().pop();
            assert.equal(330, result.x);
            assert.equal(60, result.y);
        });

        it('it should start moving from the end of y axis when reaches 0 point', () => {
            const defaultSnake = [
                {x: 45, y: 45},
                {x: 45, y: 30},
                {x: 45, y: 15},
                {x: 45, y: 0},
            ];
            const settings = {
                areaSizeX: 345,
                areaSizeY: 245
            };
            const snake = new Snake(settings, defaultSnake, new Item());
            snake.init();
            snake.move('up');

            const result = snake.body().pop();
            assert.equal(45, result.x);
            assert.equal(230, result.y);
        });
    });

    describe('isCollision()', () => {
        it('it should find a collision when snake one snake part is touched by another part .', () => {
            const defaultSnake = [
                {x: 45, y: 45},
                {x: 45, y: 30},
                {x: 45, y: 15},
                {x: 60, y: 15},
                {x: 60, y: 30},
            ];
            const snake = new Snake({}, defaultSnake, new Item());
            snake.init();

            assert.equal(true, snake.isCollision(45, 30));
        });
    });
});