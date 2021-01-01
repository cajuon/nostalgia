//function to show animation while page is loaded
$(window).on("load",function(){
      $('.loading').fadeOut("slow");
      $('body').removeAttr("style");
      $('.all').removeAttr("style");
});    