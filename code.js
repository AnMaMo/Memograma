//Validate Form
function validate(){
    var form = document.initialform;

    if((form.fx.value * form.fy.value)%2 != 0 ){
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


    var nplayersform = form.nplayers.value;
    // Check if number of players is the same
    if(nplayersent != nplayersform){
       alert("The number of players has to be equal to the number of names entered!");
        return false;
    }

}


// Global vars
var existFlippedCard = false;
var flippedcard1Id = null;
var flippedcard1Name = null;
var flippedcard2Id = null;
var flippedcard2Name = null;

function flipCard(id, name){
    var idCardClicked = id;
    var nameCardClicked = name;

    // Reverse a card
    document.getElementById(idCardClicked).src=("media/cards/"+name+".png");
    
    //quitar atributo onclick
    document.getElementById(idCardClicked).removeAttribute("onclick");

    // See if exist a flipped card
    if(existFlippedCard == false){
        flippedcard1Id = idCardClicked;
        flippedcard1Name = nameCardClicked;
        existFlippedCard = true;
    }else{
        flippedcard2Id = idCardClicked;
        flippedcard2Name = nameCardClicked;

        //Create a arraylist with all cards and remove click of all them
        var allCards = document.getElementsByClassName("noFlipCard");
        
        //Iterate array allCards
        for(var i = 0; i < allCards.length; i++){
            allCards[i].removeAttribute("onclick");
        }

        // Now check if the cards are equals
        setTimeout(checkTheCards, 500);
    }

}


function checkTheCards(){
    // See if twho cards is the same card
    if(flippedcard1Name != flippedcard2Name){
                
        // Set the cards to the back
        document.getElementById(flippedcard1Id).src=("media/cards/reversecard.png");
        document.getElementById(flippedcard2Id).src=("media/cards/reversecard.png");


        // Create a array with all cards reversed
        var allCards = document.getElementsByClassName("noFlipCard");

        // give to the all cards no flipped the onclick function
        for(var i = 0; i < allCards.length; i++){
            allCards[i].setAttribute("onclick", "flipCard(this.id, this.name)");
        }

        //poner atributo onclick
        document.getElementById(flippedcard1Id).setAttribute("onclick", "flipCard(this.id, this.name)");
        document.getElementById(flippedcard2Id).setAttribute("onclick", "flipCard(this.id, this.name)");

        existFlippedCard = false;
    }else{
        // Remove a noflipcard class with the twho same cards and add a flipcard class
        document.getElementById(flippedcard1Id).classList.remove('noFlipCard');
        document.getElementById(flippedcard1Id).classList.add('flipCard');
        document.getElementById(flippedcard2Id).classList.remove('noFlipCard');
        document.getElementById(flippedcard2Id).classList.add('flipCard');

        // Create a array with all cards reversed
        var allCards = document.getElementsByClassName("noFlipCard");

        // give to the all cards no flipped the onclick function
        for(var i = 0; i < allCards.length; i++){
            allCards[i].setAttribute("onclick", "flipCard(this.id, this.name)");
        } 

        // Set all values to null and false
        existFlippedCard = false;
        flippedcard1Id = null;
        flippedcard1Name = null;
        flippedcard2Id = null;
        flippedcard2Name = null;        

    }




   
}