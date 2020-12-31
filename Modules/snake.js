import { getInputDirection } from "./input.js";

export const SNAKE_SPEED = 2;

const snakeBody = [
    { x: 10, y: 11 }
];
let newSegment = 0;

export function updateSnake() {
    addSegments();
    const inputDirection = getInputDirection();
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = {...snakeBody[i] }; //Created new object using same property(...)
    }
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
}

export function renderSnake(gameboard) {
    //console.log("Draw Snake");
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add('snake');
        gameboard.appendChild(snakeElement);
    })
}

export function expandSnake(amount) {
    newSegment += amount;
}

export function onSnake(position, { ignore = false } = {}) {
    return snakeBody.some((segment, index) => {
        if (ignore && index === 0) return false;
        //return (segment.x === position.x && segment.y === position.y);
        return equalPositions(segment, position);
    })
}

export function getHeadPosition() {
    return snakeBody[0];
}

export function snakeIntersection() {
    return onSnake(snakeBody[0], { ignore: true });
}

function equalPositions(pos1, pos2) {
    return (pos1.x === pos2.x && pos1.y === pos2.y);
}

function addSegments() {
    for (let i = 0; i < newSegment; i++) {
        snakeBody.push({...snakeBody[snakeBody.length - 1] })
    }
    newSegment = 0;
}