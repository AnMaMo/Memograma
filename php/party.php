<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PARTY</title>
    <link rel="stylesheet" href="styles.css">
    <script src="scripts/party.js"></script>

</head>
<body>

<div class="playersInfo">

</div>



<div class="board">
<table class="boardTable"> 

<?php 
    //Get the axe x and y, calculate the total number of cards
        $fx = $_POST['fx'];
        $fy = $_POST['fy'];
        $cardsnumber = $fx * $fy;



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

        // ROWS
        for($rowY = 0; $rowY < $fy; $rowY++){
            ?>
            <!-- Open row -->
                <tr>
            <?php
            // COLS
            for($colX = 0; $colX < $fx; $colX++){
            $actualCard = $cards[$nActualCardOfArray];
            ?>
            <td>

            <div class="card">
                    <img src="media/cards/reversecard.png" id="card_<?=$CardIdNumber?>" name="<?=$actualCard?>" class="noFlipCard" onclick="flipCard(this.id, this.name)" alt="" >      
                </div>

            </td>
            <?php
            $nActualCardOfArray++;
            $CardIdNumber++;
        }
        ?>
        <!-- Close row -->
    </tr>
        <?php
    }
        ?>

        </table>
        </div>
        <a class="button" href="form.html">QUIT</a>

</body>
</html>