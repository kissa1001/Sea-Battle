var EMPTY = 0,
    SHIP = 1,
    FIRE = 2;

var SeaBattleBoard = function(gridSize, ships){
    this.ships = ships;
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

SeaBattleBoard.prototype.setShip = function(position){
    var line = position[0];
    var cell = position[1];
    this.grid[line][cell] = SHIP;
};

SeaBattleBoard.prototype.shipCount = function() {
    var counter = 0;
    this.grid.forEach(function(line){
        line.forEach(function(cell) {
            if (cell === SHIP) {
                counter += 1;
            }
        });
    });
    return counter;
};
