<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PARTY</title>
    <link rel="stylesheet" href="styles.css">
    <style>

    </style>
</head>
<body>

<div class="board">

<?php 
    //Get the axe x and y, calculate the total number of cards
        $fx = $_GET['fx'];
        $fy = $_GET['fy'];
        $cardsnumber = $fx * $fy;

        //Generate the cards

        for($i = 0; $i < $cardsnumber; $i++){
            ?>

            <div class="reversecard"><img src="media/cards/reversecard.png" alt=""></div>

            <?php
        }
        ?>



</div>

<a class="button" href="form.html">QUIT</a>





</body>
</html>