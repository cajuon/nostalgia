//Tab
$('.tab-list a').click(function(event) {
  event.preventDefault();

  $('.active').removeClass('active');
  $(this).addClass('active');
  var id = this.id;
  $('.' + id).addClass('active');
});

//horizontal scroll bar
$(window).scroll(function() {
	var windowScroll = $(window).scrollTop();
	var height = $(document).height() - $(window).height();
  var scrolled = (windowScroll / height) * 100;
	$('#scrollBar').css('width', scrolled + '%');
});
