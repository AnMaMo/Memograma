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

<table class="board"> 

<?php 
    //Get the axe x and y, calculate the total number of cards
        $fx = $_GET['fx'];
        $fy = $_GET['fy'];
        $cardsnumber = $fx * $fy;

    //Generate the table and insert the cards
        // ROWS
        for($rowY = 0; $rowY < $fy; $rowY++){
            ?>
            <!-- Open row -->
                <tr>
            <?php
            // COLS
            for($colX = 0; $colX < $fx; $colX++){

            ?>
            <td>
            <div class="reversecard"><img src="media/cards/reversecard.png" alt=""></div>
            </td>
            <?php
        }
        ?>
        <!-- Close row -->
    </tr>
        <?php
    }
        ?>

        </table>

        <a class="button" href="form.html">QUIT</a>

</body>
</html>