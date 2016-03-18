var SeaBattleBoardUI = function(board){
    this.board = board;
    this.$board = $('.ships');
    // Populate the squares for this board.
    this.populate();
};

SeaBattleBoardUI.prototype.populate = function(){
    var self = this;
    this.board.grid.forEach(function(line, line_index) {
        line.forEach(function(cell, cell_index) {
            $('<div class="square"></div>')
            .data('board-position', [line_index, cell_index])
            .appendTo(self.$board);
        });
    });
};

SeaBattleBoardUI.prototype.setShips = function() {
    // Let user set the ships.
    this.$board.on('click', '.square', this.setShip.bind(this));
};

SeaBattleBoardUI.prototype.setShip = function(event) {
     var $square = $(event.target);
     $square.css('background-color', 'blue');
     this.board.setShip($square.data('board-position'));
     if (this.board.shipCount() === this.board.ships) {
         this.$board.off('click', '.square');
     }
};
