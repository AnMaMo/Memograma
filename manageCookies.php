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
            // Encode the array and set the cookie
            $JsonRanking = json_encode($ranking);
            setcookie("ranking", $JsonRanking, time() + 2592000 /*1 month*/);

        // If cookie ranking exist decode the array  
        }else{
            //Get the array from the cookie
            $ranking = json_decode($_COOKIE["ranking"], true);

            // Check if player is in the ranking
            for($i = 0; $i < count($ranking); $i++){
                if($ranking[$i][0] == $player[0]){
                    //Check the player points if is higher to new points
                    if($ranking[$i][1] > $player[1]){
                        //Replace the points to the player
                        $player[1] = $ranking[$i][1];
                    }

                    //Remove a players with the same name
                    for($i = 0; $i < count($ranking); $i++){
                        if($ranking[$i][0] == $player[0]){
                            unset($ranking[$i]);
                        }
                    }

                }
            }

            // Remove empty slots of array
            $ranking = array_values($ranking);

            // Add the player to the array
            array_push($ranking, $player);
            // Order array descending using $ranking[i][1] as key
            array_multisort(array_column($ranking, 1), SORT_DESC, $ranking);
        }


         // Encode the array and set the cookie
        $JsonRanking = json_encode($ranking);
        setcookie("ranking", $JsonRanking, time() + 2592000 /*1 month*/);
        header("Location: ranking.php"); 
    ?>