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

    space.x = col * space.width;
    space.y = row * space.height;
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
        gameCanvas.message = "Game won by " + currentGame.nextPlayer();
        return;
    }
};

var newGame = function(){
    var state = currentGameState = {
        currentPlayer: 'O',
        board: [[null, null, null], [null, null, null], [null, null, null]],
        boardSpaces: [[], [], []],
    };

    for(var row = 0; row < 3; row++) {
        for(var col = 0; col < 3; col++) {
            createSpace(state.boardSpaces, row, col);
        }
    }



    return currentGame = {
        valueAt: function(row, col) {
            return state.board[row][col];
        },
        nextPlayer: function() {
            return state.currentPlayer;
        },
        gameStatus: function() {
            var board = state.board;
            for (var row = 0; row < 3; row++) {
                if(board[row][0] && board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
                    return {state: 'won', winner: board[row][0]};
                }
            }
            for (var col = 0; col < 3; col++) {
                if(board[0][col] && board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
                    return {state: 'won', winner: board[0][col]};
                }
            }
            if(board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
                return {state: 'won', winner: board[0][0]};
            }
            if(board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
                return {state: 'won', winner: board[0][2]};
            }
            for (var row = 0; row < 3; row++) {
                // Game isn't over yet
                if(board[row].indexOf(null) !== -1)
                    return null;
            }
            return {state: 'tied'};
        },
        move: function(row, col) {
            // Can't go there. Throw an exception?
            if (state.board[row][col])
                return;
            state.board[row][col] = state.currentPlayer;
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
};
