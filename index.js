var level = 1;
var ON_GOING = false;
var interval = 2000;
var sequence = [];
var playerSequence = [];
var GREEN = 0;
var YELLOW = 1;
var RED = 2;
var BLUE = 3;
var WRONG = -1;
var ANIMATION_INTERVAL = 100;


$("#green").click(function (){
    if (!ON_GOING) {
        playBox(WRONG);
    }
    addToSequence(GREEN);
    var audio = new Audio("./sounds/green.mp3");
    audio.play();
    $("#green").addClass("pressed");
    setTimeout(function () {
        $("#green").removeClass("pressed");
    }, ANIMATION_INTERVAL);
    
    verifySequence();
});

$("#yellow").click(function () {
    if (!ON_GOING) {
        playBox(WRONG);
    }
    $("#yellow").addClass("pressed");
    setTimeout(function () {
        $("#yellow").removeClass("pressed");
    }, ANIMATION_INTERVAL);
    addToSequence(YELLOW);
    var audio = new Audio("./sounds/yellow.mp3");
    audio.play();
    verifySequence();
});

$("#red").click(function () {
    if (!ON_GOING) {
        playBox(WRONG);
    }
    $("#red").addClass("pressed");
    setTimeout(function () {
        $("#red").removeClass("pressed");
    }, ANIMATION_INTERVAL);

    addToSequence(RED);

    var audio = new Audio("./sounds/red.mp3");
    audio.play();
    verifySequence();
});

$("#blue").click(function () {
    if (!ON_GOING) {
        playBox(WRONG);
    }
    $("#blue").addClass("pressed");
    setTimeout(function () {
        $("#blue").removeClass("pressed");
    }, ANIMATION_INTERVAL);

    addToSequence(BLUE);

    var audio = new Audio("./sounds/blue.mp3");
    audio.play();
    verifySequence();
});



$(document).keypress(function (e) {
    if (!ON_GOING) {
        ON_GOING = true;

        startGame();
    }
})

function startGame() {
    $("h1").text(`Level ${level}`);
    addSequence();
    console.log("Start");
}

function addSequence() { // generated sequence
    if (ON_GOING) {
        var box = Math.floor(Math.random() * 4);
        sequence.push(box);
        playBox(box);
    }
}

function addToSequence(box) { // players sequence
    if (ON_GOING) {
        playerSequence.push(box);
    }
}

function verifySequence() {
    if (ON_GOING) {

        if (playerSequence.length < sequence.length) {
            return;
        } else if (playerSequence.length == sequence.length) {
            if (compare(playerSequence, sequence)) {
                // same sequence, reset player
                playerSequence = [];
                level += 1;
                $("h1").text(`Level ${level}`);
                setTimeout(addSequence, interval);
                return;
            } else {
                // failed, end game
                playBox(WRONG);
                resetGame();
                return;
            }
        } else {
            // failed, end game
            playBox(WRONG);
            resetGame();
            return;
        }
    }
}

function resetGame() {
    $("h1").text("Game Over, Press Any Key to Restart")
    ON_GOING = false;
    level = 1;
    interval = 2000;
    playerSequence = [];
    sequence = [];
}

function compare(seq1, seq2) {
    for (var i = 0; i < seq1.length; i++) {
        if (seq1[i] !== seq2[i]) {
            return false;
        }
    }

    return true;
}





function playBox(box) {
    switch (box) {
        case GREEN:
            var audio = new Audio("./sounds/green.mp3");
            audio.play();

            $("#green").addClass("generated");
            setTimeout(function () {
                $("#green").removeClass("generated");
            }, ANIMATION_INTERVAL);
            break;
        case YELLOW:
            var audio = new Audio("./sounds/yellow.mp3");
            audio.play();

            $("#yellow").addClass("generated");
            setTimeout(function () {
                $("#yellow").removeClass("generated");
            }, ANIMATION_INTERVAL);
            break;
        case RED:
            var audio = new Audio("./sounds/red.mp3");
            audio.play();

            $("#red").addClass("generated");
            setTimeout(function () {
                $("#red").removeClass("generated");
            }, ANIMATION_INTERVAL);
            break;
        case BLUE:
            var audio = new Audio("./sounds/blue.mp3");
            audio.play();

            $("#blue").addClass("generated");
            setTimeout(function () {
                $("#blue").removeClass("generated");
            }, ANIMATION_INTERVAL);
            break;
        case WRONG: 
            var audio = new Audio("./sounds/wrong.mp3");
            audio.play();

            $("body").addClass("game-over");
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, ANIMATION_INTERVAL);
            break;
        default:
            console.log("Error");
            break;
    }


}