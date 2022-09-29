<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PARTY</title>
    <link rel="stylesheet" href="styles.css">
    <script src="scripts/party.js"></script>
    <link rel="icon" type="image/x-icon" href="media/favicon.ico">
</head>
<body id="rick">

<?php 
    //Get the axe x and y, calculate the total number of cards
        $fx = $_POST['fx'];
        $fy = $_POST['fy'];
        $cardsnumber = $fx * $fy;
        $time = $_POST['ftime'];
        $foolder = $_POST['difficulty'];

        //Get all players
        $player1 = $_POST['player1'];
        $player2 = $_POST['player2'];
        $player3 = $_POST['player3'];
        $player4 = $_POST['player4'];

        // Create array of players if they are not empty
        $players = array();
        if (!empty($player1)) {
            array_push($players, $player1);
        }
        if (!empty($player2)) {
            array_push($players, $player2);
        }
        if (!empty($player3)) {
            array_push($players, $player3);
        }
        if (!empty($player4)) {
            array_push($players, $player4);
        }

        // Create a div with info about players
    ?>
        <div class="playersinfo">
            <h3 id="titleDifficulty"><?=$foolder?></h3>
            <?php
                // Iterate the players array
                foreach ($players as $player) {
                    echo "<div class='playerinfo' id='$player-div'>";
                    echo "<p class='playername' id='$player'>$player</p>";
                    echo "<p class='playerpoints' id='$player-points'>0</p>";
                    echo "<text>Time: </text><text class='playerTime' id='$player-time'>0</text>";
                    echo "</div>";
                }
            ?>
            <!-- Party info-->
            <div id="info"><text>Turn: </text> <text id="turn">0</text></div> 
            <div id="info"><text>PartyTime: </text> <text id="partytime">0</text></div> 
            <div id="info"><text>CountDown: </text> <text id="counter"><?=$time?></text></div>          
        </div>

        <?php

        // Create array for the cards
        $cards = array();

        // Variable card
        $card = 1;
        for($i = 0; $i < $cardsnumber;$i++){
            // Add to array a twho same cards
           $cards[$i] = "card".$card;
           $cards[$i+1] = "card".$card;
           $card++;
           $i++;
        }

    //Generate the table and insert the cards
    $nActualCardOfArray = 0;
    $CardIdNumber = 1;

    //Shuffle the array
    shuffle($cards);

?>
    <div class="board">
<?php

        // ROWS
        for($rowY = 0; $rowY < $fy; $rowY++){
            ?>
            <!-- Open row -->
                <div class="row">
            <?php
            // COLS
            for($colX = 0; $colX < $fx; $colX++){
            $actualCard = $cards[$nActualCardOfArray];
            ?>

            <div class="card">
                    <img src="media/cards/<?=$foolder?>/reversecard.png" id="card_<?=$CardIdNumber?>" name="<?=$actualCard?>" class="noFlipCard" onclick="flipCard(this.id, this.name)" alt="" >      
                </div>
            <?php
            $nActualCardOfArray++;
            $CardIdNumber++;
        }
        ?>
        <!-- Close row -->
    </div>
        <?php
    }
        ?>

        </div>
        <a class="button" href="index.html">QUIT</a>


<div class="hidden">
    <form action="manageCookies.php" id="cookiesform" method="post">
    <input type="text" name="playername">
    <input type="text" name="playerpoints">
    <input type="text" name="playertime">
    </form>
</div>


</body>
</html>