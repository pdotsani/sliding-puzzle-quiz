/*
 * Game Logic
 *
 */

(function() {
	// Holds the state of the puzzle
	var state = [[],[],[]];

	// Global elements saved to variables
	var puzzle = document.getElementsByClassName('sliding-puzzle')[0];
	var cells = puzzle.children;

	// Refresh the gameboard after a click or other move
	function render() {
		var ct = 0;
		for(var i = 0; i < 3; i++) {
			for(var j = 0; j < 3; j++) {
				cells[ct].innerHTML = state[i][j];
				if(state[i][j] === '') {
					cells[ct].className = 'tile blank';
					cells[ct].addEventListener('click', function() { return; })
				} else {
					cells[ct].className = 'tile';
					cells[ct].addEventListener('click', swap)
				}
				ct++;
			}
		}
	}

	// Get the location of a piece with a given value
	function getLocation(val) {
		var loc = [];
		for(var i = 0; i < 3; i++) {
			for(var j = 0; j < 3; j++) {
				if(state[i][j] === val) {
					loc.push(i);
					loc.push(j);
					break;
				}
			}
			if(loc.length === 2) { break; }
		}
		return loc;
	}

	// Gets the allowed moves based on the position of the blank space
	function getMoves(val) {
		var moves = [];
		var blank = getLocation('');
		var canmove = false;
		// Checks surrounding cells of blank space
		if(blank[0] - 1 >= 0) {
			moves.push([blank[0] - 1, blank[1]]);
		}
		if(blank[1] - 1 >= 0) {
			moves.push([blank[0], blank[1] - 1]);
		}
		if(blank[0] + 1 < 3) {
			moves.push([blank[0] + 1, blank[1]]);
		}
		if(blank[1] + 1 < 3) {
			moves.push([blank[0], blank[1] + 1]);
		}
		// If clicked piece matches one of the possible move locations, move is ok
		moves.forEach(function(move) {
			if(state[move[0]][move[1]] === val) {
				canmove = true;
			}
		});
		return canmove;
	}

	// swaps the clicked value with the empty space
	function swap(el) {
		if(getMoves(el.target.innerHTML)) {
			var placeholder = el.target.innerHTML;
			var blank = getLocation('');
			var swapTile = getLocation(placeholder);
			state[blank[0]][blank[1]] = placeholder;
			state[swapTile[0]][swapTile[1]] = '';
			render();
		} else {
			placeholder = null;
			return;
		}
	}

	// Initialize the gameboard, add onclick event listeners to pieces
	function startPuzzle() {
		var rowCt = 0;
		var col = 0;
		// Create blank cell with style 'tile blank' (see CSS)
		var blankCell = document.createElement('li');
		blankCell.className = 'tile blank';
		puzzle.append(blankCell);
		// Add event listeners and set up initial state
		for(var i = 0; i < cells.length; i++) {
			state[col][rowCt] = cells[i].innerHTML;
			cells[i].addEventListener("click", swap);
			rowCt++;
			if(rowCt === 3) {
				rowCt = 0;
				col++;
			}
		};	
	}
	startPuzzle();
})();
