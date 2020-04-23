const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// Box unit
const box = 32;

// Load images -
const ground = new Image();
ground.src = "ground.png";

const foodImage = new Image();
foodImage.src = "food.png";

// Make the snake
let snake = [];

snake[0] = {
    x: 9*box,
    y: 10*box
};

snake[1] = {
    x: 8*box,
    y: 10*box
};

// Make the food
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box,
};

// Make the score
let score = 0;

// Control the snake
let d;

document.addEventListener("keydown", direction);

function direction(event) {
    let key = event.keyCode;
    if (key == 37 && d != "RIGHT") {
        d = "LEFT";
    } else if (key == 38 && d != "DOWN") {
        d = "UP";
    } else if (key == 39 && d != "LEFT") {
        d = "RIGHT";
    } else if (key == 40 && d != "UP") {
        d = "DOWN";
    }
}

// Check for collisions
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

// Draw the different objects
function draw() {
    ctx.drawImage(ground, 0, 0);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0)? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.drawImage(foodImage, food.x, food.y);

    // Old position of head
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Current direction
    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    // When the food gets eaten
    if (snakeX == food.x && snake.Y == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box,
        }; // Don't remove the tail
    } else {
        snake.pop(); // Remove the tail
    }

    // Add on a new head
    let newHead = {
        x: snakeX,
        y: snakeY
    };

    // Game over
    if (snakeX < box || snakeX > 17*box || snakeY < 3*box || snakeY > 17*box || collision(newHead, snake)) {
        clearInterval(game);
    }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2*box, 1.6*box);
}

// Call draw function every 100 milliseconds
let game = setInterval(draw, 100);
