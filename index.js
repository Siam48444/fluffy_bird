// board
const board = document.getElementById('board');
const context = board.getContext('2d'); 
board.height = window.innerHeight; // set the initial board dimensions 
board.width = board.height; 

window.addEventListener('DOMContentLoaded', updateBoard); // make the board width responsive
window.addEventListener('resize', updateBoard);


// bird
const BIRD = {};
const birdUpImage = new Image(); 
const birdDownImage = new Image(); 
birdUpImage.src = './assets/images/bird.png';
birdDownImage.src = './assets/images/bird.png';


// pipes
const TOP_PIPE = {}; // the bottom pipes are generated based on this object
const topPipeImage = new Image(); 
const bottomPipeImage = new Image(); 
topPipeImage.src = './assets/images/topPipe.png'; 
bottomPipeImage.src = './assets/images/bottomPipe.png';	


// ground
const GROUND = {};
const groundImage = new Image();
groundImage.src = './assets/images/ground.png';


// popup
const gameOverPopup = document.getElementById('gameOverPopup');
const popup = document.getElementById('popup');
const highScoreSpan = document.getElementById('highScoreSpan');
const currentScoreSpan = document.getElementById('currentScoreSpan');


// physics and others
let gravity; // gravity of the falling bird
let birdVelocity = 0; // initial velocity of the bird
let jumpVelocity; // velocity of the jumping bird

let pipeVelocity; // velocity of the moving pipes
let pipeInterval; // time between each pipe generation (in milliseconds)
let pipeSpacing; // space between the pipes
let pipeArray = []; // used to add more pipes in the game

let gameOver = false; // keeps track if the game is over
let score = 0; // keeps track of the player's score
let highScore = localStorage.getItem('highScore'); // get the saved high score



// adjust the game board and the inner elements
function updateBoard() {
	// set the board's minimum width
	let minSize = Math.min(window.innerWidth, window.innerHeight);
	board.width = board.height = minSize;

	// set the board's maximum width
	let maxSize = 1234;
	if (board.width > maxSize) {
		board.width = board.height = maxSize;
	}

	// update the popup size and position
    popup.style.width = `${board.width * 0.6}px`;

	// recalculate bird properties
	BIRD.width = BIRD.height = board.width * 0.06;
	BIRD.x = board.width / 5;
	BIRD.y = (board.height / 2) - (BIRD.height * 0.5);

	// update ground properties
	GROUND.width = board.width;
	GROUND.height = board.height * 0.15;
	GROUND.x = 0;
	GROUND.y = board.height - GROUND.height;

	// update pipe properties
	TOP_PIPE.width = board.width * 0.1;
	TOP_PIPE.height = board.height - GROUND.height;
	TOP_PIPE.x = board.width;

	// update others
	gravity = board.width * 0.0005;
	jumpVelocity = -(board.width * 0.01);
	pipeVelocity = -(board.width * 0.005);
	pipeSpacing = BIRD.height * 3.5;
	pipeInterval = board.width; 

	// set the pipe interval for smaller screen
	if (board.width < 777) { pipeInterval = board.width * 1.7; }
	if (board.width < 444) { pipeInterval = board.width * 2.7; }
	if (board.width < 333) { pipeInterval = board.width * 5; }
}


window.addEventListener('DOMContentLoaded', () => {
	context.drawImage(birdDownImage, BIRD.x, BIRD.y, BIRD.width, BIRD.height); // draw the bird 
	context.drawImage(groundImage, GROUND.x, GROUND.y, GROUND.width, GROUND.height); // draw the ground

	// make the bird jump
	window.addEventListener('keydown', jumpOnKeypress);
	window.addEventListener('click', () => { 
		if (!gameOver) {
			birdVelocity = jumpVelocity;
		}
	}); // jump if mouse is clicked

	// start the animations
	requestAnimationFrame(updateFrames);
	setInterval(generatePipes, pipeInterval);
});


// update the frames
function updateFrames() {
	// stop the function if the game is over
	if (gameOver) {
		// move the bird according to the gravity
		BIRD.y += birdVelocity;
		birdVelocity += gravity;

		// make the bird fall down if collided
		if (BIRD.y + BIRD.height > board.height - GROUND.height) {
			gameOverPopup.classList.add('popupOpen');
	        return;
   		}
	}

	// Clear previous frame
	context.clearRect(0, 0, board.width, board.height); 

	// draw the new pipes from the pipe array
	for (let pipe of pipeArray) {
		placePipes(pipe);
	}

	// update the bird velocity using the gravity
	BIRD.y += birdVelocity;
	birdVelocity += gravity; 

	// prevent the bird from going outside the screen
	setBirdBoundary(); 

	//draw the bird according to the gravity
	if (birdVelocity > 0) { 
		context.drawImage(birdDownImage, BIRD.x, BIRD.y, BIRD.width, BIRD.height); 
	}
	else { 
		context.drawImage(birdUpImage, BIRD.x, BIRD.y, BIRD.width, BIRD.height); 
	}

	// draw the ground
	context.drawImage(groundImage, GROUND.x, GROUND.y, GROUND.width, GROUND.height);

	// add the text elements
	addText();

	// loop the animation
	requestAnimationFrame(updateFrames);	
}


// prevent the bird from going outside the screen
function setBirdBoundary() {
	// Prevent the bird from going above the screen
	let top = 0;
	if (BIRD.y < top) {
		BIRD.y = top;
		birdVelocity = 0.01; 
	}
	// Prevent the bird from going below the screen (end the game here)
	let bottom = board.height - BIRD.height - GROUND.height;
	if (BIRD.y > bottom) {
		gameOver = true;
	}
}


// place the pipes
function placePipes(pipe) {
	pipe.x += pipeVelocity; // move the pipes to the left
	context.drawImage(pipe.image, pipe.x, pipe.y, pipe.width, pipe.height); // draw the pipes

	// remove the old pipes that has already gone off the screen
	if (pipe.x + pipe.width < -board.width) {
		pipeArray.shift(pipe);
	}

	// detect if the pipe is crossed
	if (pipe.x + pipe.width < BIRD.x && !pipe.passed) {
		pipe.passed = true
		score += 0.5; // increment the score
	}

	// detect if the game is over
	if (detectCollision(BIRD, pipe)) {
		gameOver = true;
	}
}


// generate the pipes
function generatePipes() {
	// stop the function if the game is over
	if (gameOver) return;

	// random Y positions for the pipes 
	let randomPipeY = Math.random() * (board.height * 0.3) + (board.height * 0.3) + GROUND.height; 

	// new top pipes
	let topPipe = {
		width: TOP_PIPE.width,
		height: TOP_PIPE.height,
		x: TOP_PIPE.x,
		y: -randomPipeY, // move the top pipe a little upwards for randomly 
		image: topPipeImage, 
		passed: false,
	}
	pipeArray.push(topPipe); // add the new pipe

	// new bottom pipes
	let bottomPipe = {
		width: TOP_PIPE.width,
		height: TOP_PIPE.height,
		x: TOP_PIPE.x,
		y: TOP_PIPE.height + pipeSpacing - randomPipeY, // move the bottom pipe a little downwards randomly 
		image: bottomPipeImage, 
		passed: false,
	}
	pipeArray.push(bottomPipe); // add the new pipe
}


// make the bird jump on key-press
function jumpOnKeypress(e) {
	if (gameOver) return;

	// jump if any key is pressed
	if ( 
		e.code === 'Space' || 
		e.code === 'KeyW' || 
		e.code === 'ArrowUp' ||
		e.code === 'NumpadEnter' ||
		e.code === 'Enter'
	) {
		birdVelocity = jumpVelocity;
	}
}


// detect if the game is over (collision between bird and pipe)
function detectCollision(bird, pipe) {
	return (
        bird.x + bird.width > pipe.x && 
		bird.x < pipe.x + pipe.width && 

        bird.y + bird.height > pipe.y &&
        bird.y < pipe.y + pipe.height 
	);
}


// the scores and other texts
function addText() {
	// score text properties
	const scoreX = board.width * 0.5;
	const scoreY = board.width * 0.1;
	const scoreFontSize = board.width * 0.06;

	// game name text properties
	const nameX = board.width * 0.5;
	const nameY = board.height - GROUND.height * 0.3;
	const nameFontSize = board.width * 0.06;

	// draw the score
	context.fillStyle = '#ffffff';
	context.font = `800 ${scoreFontSize}px Inter`;
	context.textAlign = 'center';
	context.lineWidth = board.width * 0.005;
	context.strokeStyle = 'black';
	context.strokeText(score, scoreX, scoreY);
	context.fillText(score, scoreX, scoreY);
	
	// draw the game name in the bottom of the screen 
	context.fillStyle = '#ffffff';
	context.font = `500 ${board.width * 0.04}px Inter`; 
	context.textAlign = 'center';
	context.lineWidth = board.width * 0.005;
	context.strokeStyle = '#a49b44';
	context.strokeText('Fluffy Bird', nameX, nameY);
	context.fillText('Fluffy Bird', nameX, nameY);
}