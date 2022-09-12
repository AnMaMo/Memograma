//Validate Form
function validate(){
    var form = document.initialform;

    if((form.fx.value * form.fy.value)%2 != 0 ){
        alert("The maximum of cards has to be even");
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


    var nplayersform = form.nplayers.value;
    // Check if number of players is the same
    if(nplayersent != nplayersform){
       alert("The number of players has to be equal to the number of names entered");
        return false;
    }

}