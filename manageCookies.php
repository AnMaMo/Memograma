<?php
    // Get the values of playername, points and time
        $playername = $_POST['playername'];
        $playerpoints = $_POST['playerpoints'];
        $playertime = $_POST['playertime'];

        // Create a array with the values
        $player = [$playername, $playerpoints, $playertime];


        // If cookie ranking not exist
        if(!isset($_COOKIE["ranking"])){
            $ranking = [];
            array_push($ranking, $player);
        // If cookie ranking exist decode the array and add the player    
        }else{
            //Get the array from the cookie
            $ranking = json_decode($_COOKIE["ranking"], true);

            //iterate the array and check if the player is already in the ranking
            $playerInRanking = false;

            for($i = 0; $i < count($ranking); $i++){
                if($ranking[$i][0] == $playername){
                    //Set the variable true to add player if is not in the ranking
                    $playerInRanking = true;
                    // If the player is in the ranking check if the points are higher
                    if($ranking[$i][1] < $playerpoints){
                        // If the new points are more higer change it
                        $ranking[$i][1] = $playerpoints;
                    }
                }
            }

            // If the player is not in the ranking add it
            if(!$playerInRanking){
                array_push($ranking, $player);
            }
            
            // Now order the array by points is $player[1]
            usort($ranking, function($a, $b) {
                return $b[1] <=> $a[1];
            });
            
        }

        // Encode the array and set the cookie
        $JsonRanking = json_encode($ranking);
        setcookie("ranking", $JsonRanking, time() + 2592000 /*1 month*/);

        print_r($_COOKIE["ranking"]);
        //Open the ranking page
    //    header("Location: ranking.php");


    ?>