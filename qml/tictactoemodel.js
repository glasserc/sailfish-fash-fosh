var currentGameState = null;
var currentGame = null;
var component = null;

var createSpace = function(board, row, col) {
    console.log(background.width, background.height, background.x, background.y)
    if(! component)
        component = Qt.createComponent("Space.qml");

    if (component.status != Component.Ready) {
        console.log("error loading block component");
        console.log(component.errorString());
        return false;
    }

    var space = component.createObject(background);
    if(! space) {
        console.log("error creating Tic-Tac-Toe space");
        console.log(component.errorString());
        return false;
    }

    space.height = space.width = gameCanvas.blockSize
    space.x = col * space.width + (col - 1) * gameCanvas.boardLineWidth;
    space.y = row * space.height + (row - 1) * gameCanvas.boardLineWidth;
    space.state = "";
    console.log("New space with", space.width, space.height, "at", space.x, space.y)
    board[row][col] = space;
    return space;
}

var updateMessage = function() {
    var status = currentGame.gameStatus();
    if(! status) {
        gameCanvas.message = currentGame.nextPlayer() + " to play";
        return;
    }
    if(status.state === "tied") {
        gameCanvas.message = "Tied game!";
        return;
    }
    if(status.state === "won") {
        gameCanvas.message = "Game won by " + status.winner;
        return;
    }
};

var newGame = function(){
    if(currentGameState) {
        for(var row = 0; row < 3; row++) {
            for(var col = 0; col < 3; col++) {
                currentGameState.boardSpaces[row][col].destroy();
            }
        }

    }

    var state = currentGameState = {
        currentPlayer: 'O',
        boardSpaces: [[], [], []],
    };

    for(var row = 0; row < 3; row++) {
        for(var col = 0; col < 3; col++) {
            createSpace(state.boardSpaces, row, col);
        }
    }

    currentGame = {
        valueAt: function(row, col) {
            return state.boardSpaces[row][col].state;
        },
        nextPlayer: function() {
            return state.currentPlayer;
        },
        gameStatus: function() {
            var valueAt = this.valueAt;
            for (var row = 0; row < 3; row++) {
                if(valueAt(row, 0) && valueAt(row, 0) === valueAt(row, 1) && valueAt(row, 1) === valueAt(row, 2)) {
                    return {state: 'won', winner: valueAt(row, 0)};
                }
            }
            for (var col = 0; col < 3; col++) {
                if(valueAt(0, col) && valueAt(0, col) === valueAt(1, col) && valueAt(1, col) === valueAt(2, col)) {
                    return {state: 'won', winner: valueAt(0, col)};
                }
            }
            if(valueAt(0, 0) && valueAt(0, 0) === valueAt(1, 1) && valueAt(1, 1) === valueAt(2, 2)) {
                return {state: 'won', winner: valueAt(0, 0)};
            }
            if(valueAt(0, 2) && valueAt(0, 2) === valueAt(1, 1) && valueAt(1, 1) === valueAt(2, 0)) {
                return {state: 'won', winner: valueAt(0, 2)};
            }
            for (var row = 0; row < 3; row++) {
                for (var col = 0; col < 3; col++) {
                    if(! valueAt(row, col))
                        // Game isn't over yet; at least one space left to move
                        return null;
                }
            }
            return {state: 'tied'};
        },
        move: function(row, col) {
            // Can't go there. Throw an exception?
            if (this.valueAt(row, col))
                return;
            var space = state.boardSpaces[row][col];
            space.state = state.currentPlayer;
            if (state.currentPlayer == 'O')
                state.currentPlayer = 'X';
            else
                state.currentPlayer = 'O';
        },
        handleClick: function(x, y) {
            var col = Math.floor(x / gameCanvas.blockSize);
            var row = Math.floor(y / gameCanvas.blockSize);
            var move = this.move(row, col);
            updateMessage();
        }
    };

    updateMessage();

    return currentGame;
};
