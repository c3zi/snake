import 'bootstrap/dist/css/bootstrap.min.css';
import Game from './Game';

let TOKEN = null;
let NICKNAME = null;

(function() {

    document.getElementById('userForm').addEventListener('submit', startGame);

    document.addEventListener('point', (e) => {
        const elem = document.getElementById('points');
        elem.innerHTML = ' ' + (e.detail.score).toString();

        addPoint(TOKEN, e.detail.snake, e.detail.item);
    }, false);

    const url = API_URL + '/scores';
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (data.length) {

                const table = document.getElementById("score");

                for(let item of data) {
                    const row = table.insertRow(-1);
                    const nicknameCell = row.insertCell(0);
                    const scoreCell = row.insertCell(1);

                    const nickname = document.createTextNode(item.nickname);
                    const score = document.createTextNode(item.score);

                    nicknameCell.appendChild(nickname);
                    scoreCell.appendChild(score);
                }
            }
        });

}());

function startGame(e) {
    const nickname = this['nickname'].value;
    generateToken(nickname);

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

function generateToken(nickname) {
    fetch(API_URL + `/generate-token/${nickname}`,
        {
            method: 'POST',
            mode: 'cors',
            redirect: 'follow',
            referrer: 'no-referrer'
        })
        .then(response => response.json())
        .then(function (data) {
            if (data.token && data.nickname) {
                TOKEN = data.token;
                NICKNAME = data.nickname;
            }
        });
}

function addPoint(token, snake, item) {
    console.log(snake, item);
    fetch(API_URL + `/scores/${token}`,
        {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            redirect: 'follow',
            referrer: 'no-referrer',
            body: JSON.stringify({ snake, item })
        })
        .then(response => {
            if (response.status !== 200) {
                throw new Error('Cannot add a point');
            }
        })
}