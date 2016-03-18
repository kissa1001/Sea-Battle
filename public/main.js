$(document).ready(function() {
    //Variables
    var socket = io();
    var square = document.getElementsByClassName("square");
    var fields = 100;
    var input = $('.msgInput');
    var nickInput = $('.usernameInput');
    var loginPage = $('.login-form');
    var gamePage = $('.wrapper');
    var messages = $('#messages');
    var myShips = $('#myShips');
    var otherShips = $('#otherShips');
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


    //Setting Boards
    var myBoard = new SeaBattleBoard('10x10', 10);
    var myBoardUI = new SeaBattleBoardUI(myBoard);

    //Add message
    var addMessage = function(message) {
        messages.append('<div>' + message + '</div>');
    };

    socket.on('addBoardPos', addData);


//Chat Box Part

    //Create username
    socket.on('connect', function(data){
        function setUsername () {
            nickname = nickInput.val();
            // If the username is valid
            if (nickname) {
                loginPage.fadeOut();
                socket.emit('join', nickname);
                gamePage.show();
                $('.chooseShips').fadeIn(1000, function(){
                    $(this).append('<p>Place your ships. You can place 10 ships</p>');
                    myBoardUI.setShips();
                });
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
