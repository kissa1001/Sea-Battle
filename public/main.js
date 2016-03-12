$(document).ready(function() {
    var socket = io();


var square = document.getElementsByClassName("square");
var num_ship = 10;
var fields = 100;


    //add empty fields to our game
    addEmptyFields(fields);
    addMyFields(fields);

    //add empty fields to our game
    function addEmptyFields(fields) {
      var divSquare = '<div class="square"></div>';
      for (var i = 0; i < fields; i++) {
          $('.wrap').append(divSquare);
      };
    }

    function addMyFields(fields) {
      var divSquare = '<div class="mySquare"></div>';
      for (var i = 0; i < fields; i++) {
          $('.myShips').append(divSquare);
      };
    }
});
