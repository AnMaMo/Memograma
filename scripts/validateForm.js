/**
 * Function to validate the form to configure the game
 * @returns {undefined}
 */
 function validate(){
    var form = document.initialform;
    var numberOfCards = form.fx.value * form.fy.value;

    if(numberOfCards%2 != 0 ){
        alert("The maximum of cards has to be even!");
        return false;
    }

    // Count players has entered
    var nplayersent = 0;
    if(form.player1.value != ""){
        nplayersent++;
        }
    if(form.player2.value != ""){
        nplayersent++;
        }
    if(form.player3.value != ""){
        nplayersent++;
        }
    if(form.player4.value != ""){
        nplayersent++;
        }

        
    // Check if user enter a minimum 1 player
    if(nplayersent < 1){
       alert("You need to enter minimum 1 player!");
        return false;
    }
}