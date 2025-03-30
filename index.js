// board
const BOARD = {
	width : window.innerWidth,
	height : window.innerHeight,
}



window.onload = () => {
	const board = document.getElementById('board');
	const contex = board.getContext('2d'); // used for 2d drawing on the board

	board.width = BOARD.width;
	board.height = BOARD.height;
}