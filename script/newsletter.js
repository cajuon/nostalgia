function ValidateEmail(inputText){
  var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if(inputText.value.match(mailformat)){
    alert('Valid email address!');
    alert('Thank you for signing up for our newsletter!\nPlease check your email for confirmation.');
  }
  else{
    alert('You have entered an invalid email address!');
    alert('Please try again.');
  }
}

document.getElementById('signup-btn').addEventListener('click', function(){
  ValidateEmail(document.getElementById('email'));
});

