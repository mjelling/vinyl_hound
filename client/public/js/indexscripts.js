function signUpButton(){
  $($( "#button")).click(function(){
    $('#sign-up').toggle();
    console.log('hiding');
  })
}


$( document ).ready(function() {
    signUpButton();
});
