$(document).ready(function() {
    var socket = io();
    var square = document.getElementsByClassName("square");
    var num_ship = 10;
    var fields = 100;
    input = $('.msgInput');
    var nickInput = $('.usernameInput');
    var loginPage = $('.login-form'); 
    var chatPage = $('.wrapper'); 
    var messages = $('#messages')
    var nickname;

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
                chatPage.show();
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
