//Card vars
var existFlippedCard = false;
var flippedcard1Id = null;
var flippedcard1Name = null;
var flippedcard2Id = null;
var flippedcard2Name = null;

/**
 * Function to set card values to null
 */
function valuesToNull() {
    existFlippedCard = false;
    flippedcard1Id = null;
    flippedcard1Name = null;
    flippedcard2Id = null;
    flippedcard2Name = null;
}


// Player vars
var actualPlayer = null;
var turnPlayer = null;
var players = new Array();

// Party vars
var countdownTime = null;
var isRickRollVar = false;
var difficulty = null;

/**
 * This is the principal function of the game
 */
window.onload = function startParty() {

    difficulty = document.getElementById("titleDifficulty").textContent;

    //Set value to contdownTime
    countdownTime = parseInt(document.getElementById("counter").textContent);


    //Get a players inside the playersinfo div
    var playerelements = document.getElementsByClassName("playername");

    //Iterate the players and get the name of the player
    for (var i = 0; i < playerelements.length; i++) {
        players[i] = playerelements[i].getAttribute("id");
    }

    var numberofplayers = players.length;

    // Set the first player of the array his tourn
    turnPlayer = players[0];
    document.getElementById(turnPlayer + "-div").style.backgroundColor = "#b64545";

    countdownfunction();


    /* EASTER EGG Rick Roll */
    isRickRoll();
}


////// PLAYER AND TURNS FUNCTIONS /////

/**
 * Function to change the turn of the player
 * @param {*} actualPlayerIndex 
 */
function changeTurn(actualPlayerIndex) {
    // Restart the countdown
    restartCountdown();

    // Add 1 to turn
    document.getElementById("turn").textContent = parseInt(document.getElementById("turn").textContent) + 1;

    // Change the color of the actual player to white
    document.getElementById(turnPlayer + "-div").style.backgroundColor = null;
    // Change the actual player
    if (actualPlayerIndex == players.length - 1) {
        turnPlayer = players[0];
    } else {
        turnPlayer = players[actualPlayerIndex + 1];
    }
    // Change the color of the new player to red
    document.getElementById(turnPlayer + "-div").style.backgroundColor = "#b64545";
}


/**
 * Function to add a point to the player
 * @param {} player 
 */
function addPointToPlayer(player) {
    // Get the player points
    var playerpoints = document.getElementById(player + "-points").textContent

    playerpoints = parseInt(playerpoints);
    playerpoints++;

    document.getElementById(player + "-points").innerText = playerpoints;
}

/**
 * Add time to player
 * @param {*} player 
 */
function addTimeToPlayer(player) {
    playertime = parseInt(document.getElementById(player + "-time").textContent);
    document.getElementById(player + "-time").innerText = playertime + 1;
}

////////////////////////////////////////


///// CARDS FUNCTIONS /////

/**
 * Function to flip the card needs the id and the name of the card who is flipped
 * @param {*} id 
 * @param {*} name 
 */
function flipCard(id, name) {

    var idCardClicked = id;
    var nameCardClicked = name;


    // change the class of the card to noFlipCardClick

    document.getElementById(idCardClicked).classList.remove('noFlipCard');
    document.getElementById(idCardClicked).classList.add('noFlipCardClick');

    // Reverse a card
    document.getElementById(idCardClicked).src = ("media/cards/" + difficulty + "/" + name + ".png");

    // Remove click attribute
    document.getElementById(idCardClicked).removeAttribute("onclick");

    // See if exist a flipped card
    if (existFlippedCard == false) {
        flippedcard1Id = idCardClicked;
        flippedcard1Name = nameCardClicked;
        existFlippedCard = true;


    } else {

        //Now stop contdown
        stopCountdown();

        flippedcard2Id = idCardClicked;
        flippedcard2Name = nameCardClicked;

        //Create a arraylist with all cards and remove click of all them
        var allCards = document.getElementsByClassName("noFlipCard");

        //Iterate array allCards
        for (var i = 0; i < allCards.length; i++) {
            allCards[i].removeAttribute("onclick");
        }

        // Now check if the cards are equals
        setTimeout(checkTheCards, 1000);
    }
}


/**
 * Check if the cards are equals
 * @returns {undefined}
 */
function checkTheCards() {

    // See if twho cards is the same card
    if (flippedcard1Name != flippedcard2Name) {

        // change the class of the card to noFlipCard
        document.getElementById(flippedcard1Id).classList.add('noFlipCard');
        document.getElementById(flippedcard1Id).classList.remove('noFlipCardClick');
        document.getElementById(flippedcard2Id).classList.add('noFlipCard');
        document.getElementById(flippedcard2Id).classList.remove('noFlipCardClick');


        // Set the cards to the back
        document.getElementById(flippedcard1Id).src = ("media/cards/" + difficulty + "/" + "reversecard.png");
        document.getElementById(flippedcard2Id).src = ("media/cards/" + difficulty + "/" + "reversecard.png");


        // Create a array with all cards reversed
        var allCards = document.getElementsByClassName("noFlipCard");

        // give to the all cards no flipped the onclick function
        for (var i = 0; i < allCards.length; i++) {
            allCards[i].setAttribute("onclick", "flipCard(this.id, this.name)");
        }

        // Set card values to null
        valuesToNull();


        //Discover what element of the array is the actual player
        var actualPlayerIndex = players.indexOf(turnPlayer);
        changeTurn(actualPlayerIndex);
    } else {
        // Audio
        var okaudio = new Audio('audio/ok.mp3');
        okaudio.play();


        // Remove a noflipcardClick class with the twho same cards and add a flipcard class
        document.getElementById(flippedcard1Id).classList.add('flipCard');
        document.getElementById(flippedcard1Id).classList.remove('noFlipCardClick');
        document.getElementById(flippedcard2Id).classList.add('flipCard');
        document.getElementById(flippedcard2Id).classList.remove('noFlipCardClick');


        // Set card values to null
        valuesToNull();


        // Create a array with all cards reversed
        var allCards = document.getElementsByClassName("noFlipCard");

        // give to the all cards no flipped the onclick function
        for (var i = 0; i < allCards.length; i++) {
            allCards[i].setAttribute("onclick", "flipCard(this.id, this.name)");
        }



        // Add a point to the player
        addPointToPlayer(turnPlayer);

        // Start the countdown again
        restartCountdown();

        // Check if player wins
        setTimeout(checkIfPlayerWin, 500);
    }
}


/**
 * Function to reverse cards if the turn finish
 */
function reverseNullCards() {
    document.getElementById(flippedcard1Id).classList.add("noFlipCard");
    document.getElementById(flippedcard1Id).classList.remove("noFlipCardClick");
    document.getElementById(flippedcard1Id).src = ("media/cards/" + difficulty + "/" + "reversecard.png");
    document.getElementById(flippedcard1Id).setAttribute("onclick", "flipCard(this.id, this.name)");

    // Set card values to null
    valuesToNull();
}

////////////////////////////////////////



///// WIN FUNCTIONS /////

/**
 * Check if the player wins in this turn
 */
function checkIfPlayerWin() {
    // Count the number of cards not flipped
    var cardsNotFlipped = document.getElementsByClassName("noFlipCard");
    if (cardsNotFlipped.length == 0) {
        stopCountdown();
        getTheWinner();
    }
}


/**
 * Function to get the winner of the game
 */
function getTheWinner() {
    // Create a array of points insert the points of the players sort them and get the maximum points of the array
    var points = new Array();

    for (var i = 0; i < players.length; i++) {
        points[i] = parseInt(document.getElementById(players[i] + "-points").textContent);
    }

    points.sort();
    var maxPoints = points[points.length - 1];


    // Create a array of players with max points and insert the players with max points
    var playersWithMaxPoints = new Array();

    for (var i = 0; i < players.length; i++) {
        if (parseInt(document.getElementById(players[i] + "-points").textContent) == maxPoints) {
            playersWithMaxPoints.push(players[i]);
        }

        // If the array of players with max points is 1 the player win
        if (playersWithMaxPoints.length == 1) {
            alert("Winner is " + playersWithMaxPoints[0] + "!");
            var winnerName = playersWithMaxPoints[0];
            var pointsWinner = document.getElementById(winnerName + "-points").textContent;
            var timeWinner = document.getElementById(winnerName + "-time").textContent;

            addPlayerToRanking(winnerName, pointsWinner, timeWinner);
            return;

            // Else need use the time of detect the winner
        } else {
            //Get the time of the players with max points and add it in to the array TimeOfMaxPoints sort them and get the minimum time
            var TimeOfMaxPoints = new Array();

            for (var i = 0; i < players.length; i++) {
                var points = document.getElementById(players[i] + "-points").textContent;
                if (points == maxPoints) {
                    TimeOfMaxPoints.push(document.getElementById(players[i] + "-time").textContent);
                }
            }

            TimeOfMaxPoints.sort();

            // Get the winnerpoints and the winner time
            var winnerTime = TimeOfMaxPoints[0];
            var winnerPoints = maxPoints;

            // Create a array of players with the winnerpoints and the winner time
            var WinnerPlayers = new Array();

            // Iterate all players to search the winners
            for (var i = 0; i < players.length; i++) {
                var points = document.getElementById(players[i] + "-points").textContent;
                var time = document.getElementById(players[i] + "-time").textContent;
                if (points == winnerPoints && time == winnerTime) {
                    WinnerPlayers.push(players[i]);
                }
            }

            // If the array of winner players is 1 the player win
            if (WinnerPlayers.length == 1) {
                alert("Winner is " + WinnerPlayers[0] + "!");
                var winnerName = WinnerPlayers[0];
                var pointsWinner = document.getElementById(winnerName + "-points").textContent;
                var timeWinner = document.getElementById(winnerName + "-time").textContent;

                addPlayerToRanking(winnerName, pointsWinner, timeWinner);
            } else {
                alert("tie");
                openRanking();
            }
        }
    }
}

////////////////////////////////////////



///// RANKING FUNCTIONS /////

/**
 * Function to add a player to the ranking cookie
 * @param {*} playername 
 * @param {*} points 
 * @param {*} time 
 */
function addPlayerToRanking(playername, points, time) {
    // Create a object player with the name, points and time
    var player = {
        name: playername,
        points: points,
        time: time
    };


    const form = document.forms['cookiesform'];
    form[0].value = player.name;
    form[1].value = player.points;
    form[2].value = player.time;
    form.submit();

    //  openRanking();
}


/**
 * This function open the ranking page.
 */
function openRanking() {
    window.location.href = "ranking.php";
}

////////////////////////////////////////



///// COUNTDOWN FUNCTIONS /////

/**
 * Contdown infinite function
 */
var timerCountDown;
function countdownfunction() {
    timerCountDown = setInterval(countdown, 1000);
    function countdown() {
        // Add a second to partytime
        document.getElementById("partytime").innerText = parseInt(document.getElementById("partytime").innerText) + 1;

        if (players.length != 1) {
            var time = parseInt(document.getElementById("counter").textContent);
            document.getElementById("counter").innerText = parseInt(time) - 1;

            if (time == 0) {
                // Now stop the contdown
                stopCountdown();



                if (flippedcard1Id != null) {
                    reverseNullCards();
                }

                //Discover what element of the array is the actual player
                var actualPlayerIndex = players.indexOf(turnPlayer);
                changeTurn(actualPlayerIndex);
            }
        }

        addTimeToPlayer(turnPlayer);
    }
}

/**
 * function to restart contdown
 */
function restartCountdown() {
    if (players.length != 1) {
        document.getElementById("counter").innerText = countdownTime;
        countdownfunction();
    }
}

/**
 * Function to stop the contdown
 */
function stopCountdown() {
    clearInterval(timerCountDown);
}

////////////////////////////////////////



////// EASTEREGG /////

/**
 * 
 */
function isRickRoll() {
    for (var i = 0; i < players.length; i++) {
        if (players[i].toUpperCase() == "RICK") {
            // set background to Rick
            document.getElementById("rick").style.backgroundImage = "url('media/rickroll-gif.gif')";
            //set width background to 50px
            document.getElementById("rick").style.backgroundSize = "100px";
            document.getElementById("rick").style.backgroundRepeat = "repeat";

            // Set variables to play music
            isRickRollVar = true;
            alert("Rick Roll Mode activated");
        }
    }
}