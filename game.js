var buttonColor = ["red", "blue", "green", "yellow"]
var gamePattern = [];
var userPattern = [];

var started = false;
var level = 0;

if(window.matchMedia("(min-width: 900px)").matches === true) {
    $(document).keypress(function(){
        if(!started) {
            $("#level-title").text('level - ' + level);
            nextSequence();
            started = true;        
        }
    });
    $('.btn').click(function() {
        userPattern.push($(this).attr('id'));
        playSound($(this).attr('id'));
        animatePress($(this).attr('id'));
        answerCheck(userPattern.length-1);
    });
}
else if(window.matchMedia("(max-width: 899px)").matches === true){
    $('#level-title').text("Click to start")
    $(document).on('mousedown', function(){
        if(!started) {
            $("#level-title").text('level - ' + level);
            nextSequence();
            started = true;        
        }
    });
    $('.btn').click(function() {
        userPattern.push($(this).attr('id'));
        playSound($(this).attr('id'));
        animatePress($(this).attr('id'));    
        answerCheck(userPattern.length-1);
    });
}
//=============================
// ALL FUNCTIONS 
//=============================
// NEXT SEQUENCE 

function nextSequence() {
    userPattern = [];
    level++;
    let randomNumber = Math.floor(Math.random() * 4);
    var randomColor = buttonColor[randomNumber];

    if(gamePattern.length === 0) {
        $(`#${randomColor}`).fadeOut().fadeIn();
        playSound(randomColor);
    } else if(gamePattern.length > 0) {
        let e = document.body;
        $(e).css('background', '#5e5d5d');
        setTimeout(function() {
            $(e).css('background', "");
        }, 4);
        for( let i = 0; i < gamePattern.length + 1; i++) {
            setTimeout(function(){
                $(`#${gamePattern[i]}`).fadeOut().fadeIn();
                playSound(gamePattern[i]);
            }, 1000 * i)
        }
    }
    gamePattern.push(randomColor);
    
}

// PLAY SOUND 

function playSound(name) {
    let audio = new Audio();
    let num;
    switch(name) {
        case "red":
            num = 1;
            break;
        case "green":
            num = 2;
            break;
        case "blue":
            num = 3;
            break;
        case "yellow":
            num = 4;
            break;
    }
    audio = new Audio(`https://s3.amazonaws.com/freecodecamp/simonSound${num}.mp3`)
    audio.play();
}

// ANIMATE ON CLICK 

function animatePress(name) {
    let e = $(`#${name}`);
    e.addClass('pressed');
    setTimeout(function(){
        e.removeClass('pressed');
    }, 100)
}

// ANSWER CHECK 

function answerCheck(currentLevel) {

    if(gamePattern[currentLevel] === userPattern[currentLevel])
    {
        if(gamePattern.length === userPattern.length) {
            $("#level-title").text('level - ' + level);
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    } else {
        
        if(window.matchMedia("(min-width: 900px)").matches === true) {
            let wrong = new Audio('sounds/wrong.mp3');
            wrong.play();
            $('#level-title').text('Game Over, Press any key to Play Again');
            let bg = document.body;
            bg.style.background = "rgb(201, 6, 6)"
            setTimeout(function() {
                bg.style.background = ""
            }, 100)
            level = 0;
            started = false;
            gamePattern = [];
        }
        else if(window.matchMedia("(max-width: 899px)").matches === true){
            let wrong = new Audio('sounds/wrong.mp3');
            wrong.play();
            overText();
            let bg = document.body;
            bg.style.background = "rgb(201, 6, 6)"
            setTimeout(function() {
                bg.style.background = ""
            }, 100)
            level = 0;
            started = false;
            gamePattern = [];
        }
    }
}

overText = () => {
    $("#level-title").text("Game Over, click to Play Again");
}
