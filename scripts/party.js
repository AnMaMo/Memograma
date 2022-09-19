//Card vars
var existFlippedCard = false;
var flippedcard1Id = null;
var flippedcard1Name = null;
var flippedcard2Id = null;
var flippedcard2Name = null;

// Player vars
var actualPlayer = null;
var turnPlayer = null;
var players = new Array();

// Party vars
var countdownTime = null;




/**
 * This is the principal function of the game
 */
window.onload = function startParty() {

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

    if(players.length == 1){
        stopContdown();
    }
}




/**
 * Function to flip the card needs the id and the name of the card who is flipped
 * @param {*} id 
 * @param {*} name 
 */
function flipCard(id, name) {
    var idCardClicked = id;
    var nameCardClicked = name;

    // Reverse a card
    document.getElementById(idCardClicked).src = ("media/cards/" + name + ".png");

    //quitar atributo onclick
    document.getElementById(idCardClicked).removeAttribute("onclick");

    // See if exist a flipped card
    if (existFlippedCard == false) {
        flippedcard1Id = idCardClicked;
        flippedcard1Name = nameCardClicked;
        existFlippedCard = true;
    } else {
        flippedcard2Id = idCardClicked;
        flippedcard2Name = nameCardClicked;

        //Create a arraylist with all cards and remove click of all them
        var allCards = document.getElementsByClassName("noFlipCard");

        //Iterate array allCards
        for (var i = 0; i < allCards.length; i++) {
            allCards[i].removeAttribute("onclick");
        }

        // Now check if the cards are equals
        setTimeout(checkTheCards, 500);
    }
}




/**
 * Check if the cards are equals
 * @returns {undefined}
 */
function checkTheCards() {

    // See if twho cards is the same card
    if (flippedcard1Name != flippedcard2Name) {

        // Set the cards to the back
        document.getElementById(flippedcard1Id).src = ("media/cards/reversecard.png");
        document.getElementById(flippedcard2Id).src = ("media/cards/reversecard.png");

        // Create a array with all cards reversed
        var allCards = document.getElementsByClassName("noFlipCard");

        // give to the all cards no flipped the onclick function
        for (var i = 0; i < allCards.length; i++) {
            allCards[i].setAttribute("onclick", "flipCard(this.id, this.name)");
        }

        existFlippedCard = false;

        //Discover what element of the array is the actual player
        var actualPlayerIndex = players.indexOf(turnPlayer);
        changeTurn(actualPlayerIndex);

    } else {
        // The cards are equals now restart the countdown
        restartCountdown();

        // Remove a noflipcard class with the twho same cards and add a flipcard class
        document.getElementById(flippedcard1Id).classList.remove('noFlipCard');
        document.getElementById(flippedcard1Id).classList.add('flipCard');
        document.getElementById(flippedcard2Id).classList.remove('noFlipCard');
        document.getElementById(flippedcard2Id).classList.add('flipCard');

        // Create a array with all cards reversed
        var allCards = document.getElementsByClassName("noFlipCard");

        // give to the all cards no flipped the onclick function
        for (var i = 0; i < allCards.length; i++) {
            allCards[i].setAttribute("onclick", "flipCard(this.id, this.name)");
        }

        // Set all values to null and false
        existFlippedCard = false;
        flippedcard1Id = null;
        flippedcard1Name = null;
        flippedcard2Id = null;
        flippedcard2Name = null;

        // Add a point to the player
        addPointToPlayer(turnPlayer);

        // Check if player wins
        setTimeout(checkIfPlayerWin, 500);
    }
}




/**
 * Check if the player wins in this turn
 */
function checkIfPlayerWin() {
    // Count the number of cards not flipped
    var cardsNotFlipped = document.getElementsByClassName("noFlipCard");
    if (cardsNotFlipped.length == 0) {
        var winner = null;
        var winnerpoints = 0;
        var player = null;
        var playerpoints = 0;


        //Check what player has more points
        for (var i = 0; i < players.length; i++) {
            if (i == 0) {
                // Get the first player set the winner and his points is the winnerpoints
                winner = players[i];
                winnerpoints = parseInt(document.getElementById(winner + "-points").textContent);
                continue;
            }

            // Save the actual Player
            player = players[i];
            playerpoints = parseInt(document.getElementById(player + "-points").textContent);

            if (playerpoints > winnerpoints) {
                winner = player;
                winnerpoints = playerpoints;
            }
        }


        // Stop the contdown
        stopContdown();

        // Player win
        alert(winner + " wins with " + winnerpoints + "points!");
        // Redirect to the Rankikg page
        //setTimeout(openRanking, 500);
    }
}




/**
 * This function open the ranking page.
 */
function openRanking() {
    window.location.href = "ranking.php";
}




/**
 * Function to change the turn of the player
 * @param {*} actualPlayerIndex 
 */
function changeTurn(actualPlayerIndex) {
    // Restart the countdown
    restartCountdown();

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
function addTimeToPlayer (player) {
    playertime = parseInt(document.getElementById(player+"-time").textContent) ;
    document.getElementById(player+"-time").innerText =playertime + 1;
}





/**
 * Contdown infinite function
 */
    var timerCountDown;
    function countdownfunction() {
            timerCountDown = setInterval(countdown, 1000);
            function countdown() {
                var time = parseInt(document.getElementById("counter").textContent);
                document.getElementById("counter").innerText = parseInt(time) - 1;

                addTimeToPlayer(turnPlayer);

                if (time < 1) {
                    restartCountdown();
        
                    //Discover what element of the array is the actual player
                    var actualPlayerIndex = players.indexOf(turnPlayer);
                    changeTurn(actualPlayerIndex);
                }
            }
    }




/**
 * function to restart contdown
 */
function restartCountdown() {
    if (players.length != 1) {
        document.getElementById("counter").innerText = countdownTime;
    }
}




/**
 * Function to stop the contdown
 */
function stopContdown() {
    clearInterval(timer);
    document.getElementById("counter").innerText = "";
}