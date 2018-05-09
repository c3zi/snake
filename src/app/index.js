import 'bootstrap/dist/css/bootstrap.min.css';
import Game from './Game';

(function() {

    document.getElementById('userForm').addEventListener('submit', startGame);

    document.addEventListener('point', (e) => {
        const elem = document.getElementById('points');

        elem.innerHTML = ' ' + (e.detail).toString();
    }, false);

}());

function startGame(e) {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(response => response.json())
        .then(json => console.log(json));

    hideUserArea();
    showGameArea();
    showPointsArea();

    const game = new Game(document);
    game.play();

    e.preventDefault();
}

function hideUserArea()
{
    const userArea = document.getElementById("userArea").classList;
    userArea.add('d-none');
}

function showGameArea()
{
    const gameArea = document.getElementById("gameArea").classList;
    gameArea.remove('d-none');
}

function showPointsArea()
{
    const pointsArea = document.getElementById("pointsArea").classList;
    pointsArea.remove('d-none');
}
