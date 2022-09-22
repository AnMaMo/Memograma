<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ranking</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="icon" type="image/x-icon" href="media/favicon.ico">
</head>
<body>
<h1 class="title">RANKING</h1>
<?php
    //Get the cookie ranking decode it and get the array
    $rankingcookie = isset($_COOKIE["ranking"]);
    $ranking = json_decode($_COOKIE["ranking"], true);

    //Iterate array and echo it info
    for($i = 0; $i < count($ranking); $i++){

        if($i < 5){
            $name = $ranking[$i][0];
            $points = $ranking[$i][1];
            ?>
            <div class="rankingPlayer">
                <p class="playerinfo">#<?=$i+1?> <?=$name?> - <?=$points?></p>
            </div>
            <?php
        }
    }
?>

<br>
    <a class="button" href="form.html">MENU</a>
</body>
</html>