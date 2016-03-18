var EMPTY = 0,
    SHIP = 1,
    FIRE = 2;

var SeaBattleBoard = function(gridSize){
    // gridSize should be something like '10x10'
    this.setGrid(gridSize);
};

SeaBattleBoard.prototype.setGrid = function(gridSize){
    // gridSize should be something like '10x10'
    var dimensions = gridSize.split('x').map(Number);
    var rows = dimensions[0],
        columns = dimensions[1];

    this.grid = new Array(rows).fill(0).map(function(row){
        return new Array(columns).fill(EMPTY);
    });
};

var SeaBattleBoardUI = function(board){
    this.board = board;
    this.$board = $('.myShips');
    this.populate();
};

SeaBattleBoardUI.prototype.populate = function(){
    var self = this;
    this.board.grid.forEach(function(line, line_index) {
        line.forEach(function(cell, cell_index) {
            $('<div class="mySquare"></div>')
            .data('board-position', [line_index, cell_index])
            .appendTo(self.$board);
        });
    });
};