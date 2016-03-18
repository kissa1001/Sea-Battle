$(document).ready(function() {
    var socket = io();
    var square = document.getElementsByClassName("square");
    var fields = 100;
    var input = $('.msgInput');
    var nickInput = $('.usernameInput');
    var loginPage = $('.login-form'); 
    var gamePage = $('.wrapper'); 
    var messages = $('#messages')
    var nickname;
    var shipCounter = 10;

    //Scrollbar
    $("#chat").addClass("thin");

    $("#chat").mouseover(function(){
        $(this).removeClass("thin");
    });
    $("#chat").mouseout(function(){
        $(this).addClass("thin");
    });
    $("#chat").scroll(function () {
        $("#chat").addClass("thin");
    });

    var myBoard = new SeaBattleBoard('10x10');
    var myBoardUI = new SeaBattleBoardUI(myBoard);
    //add empty fields to our game
    addEmptyFields(fields);

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

    $('.myShips').on('click', '.mySquare', function(e){
        $(this).css("background", "blue");
        shipCounter--;
        $('.chooseShips').text(shipCounter + ' ships more!');
        if(shipCounter === 0){
            $('.chooseShips').text('Well Done!')
            .fadeOut(2000);
        }
        //console.log($(event.target).data('board-position'));
    });
    //Add message
    var addMessage = function(message) {
        messages.append('<div>' + message + '</div>');
    };

    //Create username
    socket.on('connect', function(data){
        function setUsername () {
            nickname = nickInput.val();
            // If the username is valid
            if (nickname) {
                loginPage.fadeOut();
                socket.emit('join', nickname);
                gamePage.show();
                $('.chooseShips').fadeIn(1000)
                .append('<p>Place your ships.You can place 10 ships</p>');
            }
        }     
        nickInput.on('keydown',function (event) {
            // When the client hits ENTER on their keyboard
            if (event.which === 13) {
                setUsername();
            }
        });
    });
    socket.on('usernames', function(name){
        var html = '';
        for(var i=0; i < name.length; i++){
            html += name[i] + '<br/>'
        }
        usersDiv.html(html);
    });
    //User is typing
    $("input").on("keyup", function (event) {
        socket.emit("sender", {
            nickname: nickname
        });
    });
    socket.on("sender", function (data) {
        $("#status").html(data.nickname + " is typing");
        setTimeout(function () {
            $("#status").html('');
        }, 3000);
    });

    input.on('keydown', function(event) {
        if (event.keyCode != 13) {
            return;
        }

        var message = input.val();
        socket.emit('message', message);
        input.val('');
    });
    socket.on('message',addMessage)
});
