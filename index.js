// board
const BOARD = {
	width : window.innerWidth,
	height : window.innerHeight,
}

// bird
const BIRD = {
	width : 50,
	height : 50,
	x : BOARD.width / 3,
	y : BOARD.height / 2,
}



window.onload = () => {
	const board = document.getElementById('board');
	const contex = board.getContext('2d'); // used for 2d drawing on the board

	// set the game board dimensions
	board.width = BOARD.width;
	board.height = BOARD.height;
}