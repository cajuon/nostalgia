//to make page refresh to the top

history.scrollRestoration = "manual";
$(window).on('beforeunload', function(){
  $(window).scrollTop(0);
});