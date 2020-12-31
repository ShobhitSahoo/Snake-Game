import { updateSnake as updateSnake, renderSnake as renderSnake, getHeadPosition, snakeIntersection, SNAKE_SPEED } from './snake.js'
import { updateFood as updateFood, renderFood as renderFood } from './food.js'
import { outsideGrid } from "./grid.js";

let lastRenderTime = 0;
let gameover = false;
const gameboard = document.querySelector('#game');

function main(currentTime) {
    if (gameover) {
        return alert("You Died!..... :'(");
    }

    window.requestAnimationFrame(main);
    const lastFrame = (currentTime - lastRenderTime) / 1000;
    if (lastFrame < 1 / SNAKE_SPEED) return;

    //console.log("Render Snake");
    //console.log(currentTime);
    lastRenderTime = currentTime;

    update();
    render();
}
window.requestAnimationFrame(main);

function update() {
    updateSnake();
    updateFood();
    checkDeath();
}

function render() {
    gameboard.innerHTML = '';
    renderSnake(gameboard);
    renderFood(gameboard);
}

function checkDeath() {
    gameover = outsideGrid(getHeadPosition()) || snakeIntersection();
}