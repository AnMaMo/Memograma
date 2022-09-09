//Validate Form
function validate(){
    var form = document.initialform;

    if((form.fx.value * form.fy.value)%2 != 0 ){
        alert("The maximum of cards has to be even");
        return false;
    }

}