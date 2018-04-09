$(function() {

	var ua = window.navigator.userAgent.toLowerCase(),
	is_ie = ua.search('trident') >= 0 || ua.search('msie') >= 0;
	if(is_ie) {
	  $('header').css('padding-bottom', '140px');
	}
  
	  var $outCont = $('header .outer-container');
	  $(window).scroll(function(e){
		  activatePrMenu();
  
		  if($outCont[0].getBoundingClientRect().top < 0) {
			  if($outCont.children('.inner-container').hasClass('glide')) {
				  return;
			  }
			  $outCont.children('.inner-container').addClass('glide');
		  } else {
			  $outCont.children('.inner-container').removeClass('glide');
		  }
	  })
  
	  var $prMenu = $('.prMenu'),
		  $mainBlocks = $('body > header, body > section, body > footer');
  
	  if($mainBlocks.length > 0) {
		for(var i = 0; i < $mainBlocks.length; i ++) {
			var hexMenu = '<svg version="1.1" class="hexMenu go_to" href="' + $mainBlocks[i].tagName;
			for(var j = 0; j < $mainBlocks[i].classList.length; j++){
				hexMenu += '.' + $mainBlocks[i].classList[j];
			}
			hexMenu += '" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 15.625"><polygon points="0.5,4.207 0.5,11.419 6.502,15.027 12.5,11.419 12.5,4.207 6.502,0.6 "/></svg>';
  
			$prMenu.append(hexMenu);
		}
	  }
  
	  var $hexMenus = $prMenu.children('.hexMenu');
	  function activatePrMenu() {
		  // for(var i = 0; i < $mainBlocks.length; i ++) {
		  // 	console.log($mainBlocks[i].getBoundingClientRect().top);
		  // }
		  var minTop = Infinity,
			  block = 0;
		  for(var i = 0; i < $mainBlocks.length; i ++) {
			  var currentTop = Math.abs($mainBlocks[i].getBoundingClientRect().top);
			  if(minTop < currentTop) {
				  minTop = currentTop;
				  block = i;
			  }
			  if(currentTop < 350) {
				  if($hexMenus.eq(i).hasClass('active')){
					  return;
				  } else {
					  $hexMenus.removeClass('active');
					  $hexMenus.eq(i).addClass('active');
					  return;
				  }
			  }
		  }
		  // $hexMenus.removeClass('active');
		  // $hexMenus.eq(block).addClass('active');
	  }
  
	  activatePrMenu();
  
  
	  $( '.go_to' ).click( function(e){ // ловим клик по ссылке с классом go_to
		  var scroll_el = $(this).attr('href'); // возьмем содержимое атрибута href, должен быть селектором, т.е. например начинаться с # или .
		  if ($(scroll_el).length != 0) { // проверим существование элемента чтобы избежать ошибки
			  $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500);// анимируем скроолинг к элементу scroll_el
		  } 
		  e.preventDefault();
	  });
  
	  $('.team .viewMore').click(function(e) {
		  $(this).toggleClass('active');
		  var showEl = $(this).attr('href');
		  if ($(showEl).length != 0) { // проверим существование элемента чтобы избежать ошибки
			  $(showEl).slideToggle(250);
		  } 
		  e.preventDefault();
	  })
  
	  $('.roadmap .viewMore').click(function(e) {
		  $(this).toggleClass('active');
		  var showEl = $(this).attr('href');
		  if ($(showEl).length != 0) { // проверим существование элемента чтобы избежать ошибки
			  $(showEl).toggleClass('active');
		  } 
		  e.preventDefault();
	  })
  
	  $('header .mobile-switcher').click(function(e){
		$('header .singup-form').fadeOut(250);
		  e.preventDefault();
		  $('header .mobile-main-menu').fadeToggle(250);
	  })
  
	  $('header .mobile-menu .cross').click(function(e){
		  e.preventDefault();
		  $('header .mobile-menu').fadeOut(250);
	  })
  
	  $('.mobile-menu .mobile-main-menu').click(function(e){
		  e.preventDefault();
		  $('header .mobile-menu').fadeOut(250);
	  })
  
	  $('header .header-button').click(function(e){
		$('header .mobile-main-menu').fadeOut(250);
		e.preventDefault();
		$('header .singup-form').fadeToggle(250);
	  });
  
  
	  var timerId;
		var tickets = [
			$('header .days .ticket'),
			$('header .hours .ticket'),
			$('header .minutes .ticket'),
			$('header .seconds .ticket')
		],
		  active_tickets = [true, true, true, true],
		  countDate = new Date(2018, 5, 20),
		  msInDay = 24 * 60 * 60 * 1000,
		  lastDate = pasreDate(new Date());
  
	  // for(var i = 0; i < tickets.length; i++) {
	  // 	var completedDate = lastDate[i];
   //  		if((completedDate + '').length < 2) {
   //  			completedDate = '0' + completedDate;
   //  		}
	  // 	tickets[i].html(completedDate);
	  // }
  
	  var currentTicket = 0;
	  function update2() {
		  var i = currentTicket;
			var c_ticket = tickets[i].eq(+!!active_tickets[i]).css('z-index', 102);
			c_ticket.animate({
				'opacity': 0,
				'top': '-100px'
			}, {
				duration: 500,
				complete : function() {
					c_ticket.css({
						'opacity': 1,
						'z-index': 100,
						'top': 0
					});
				}
				});
			tickets[i].eq(+!active_tickets[i]).css('z-index', 101);
			active_tickets[i] = !active_tickets[i];
			currentTicket++;
			currentTicket = (currentTicket == 4) ? 0 : currentTicket;
	  }
  
	  function update() {
		var date = pasreDate(new Date());
  
		for(var i = 0; i < date.length; i++) {
			if(date[i] != lastDate[i]){
				var completedDate = date[i];
				if((completedDate + '').length < 2) {
					completedDate = '0' + completedDate;
				}
				tickets[i].eq(+!active_tickets[i]).html(completedDate);
				(function(){
					var c_ticket = tickets[i].eq(+!!active_tickets[i]).css('z-index', 102);
					c_ticket.animate({
						'opacity': 0,
						'top': '-100px'
					}, {
						duration: 500,
						complete : function() {
							c_ticket.css({
								'opacity': 1,
								'z-index': 100,
								'top': 0
							});
						}
					});
				})();
				tickets[i].eq(+!active_tickets[i]).css('z-index', 101);
				active_tickets[i] = !active_tickets[i];
				//console.log(active_tickets);
			}
		}
		lastDate = date;
	  }
  
	  function pasreDate(date) {
		  var newDate = [];
		  var ms = countDate - date;
  
		  newDate[0] = parseInt(ms / msInDay);
		  newDate[1] = parseInt((ms % msInDay) / 3600000);
		  newDate[2] = parseInt(((ms % msInDay) % 3600000) / 60000);
		  newDate[3] = parseInt((((ms % msInDay) % 3600000) % 60000) / 1000);
		  return newDate;
	  }
  
	  setInterval(update2, 1000);
  
	  
	  var isVideoClicked = false;
	  $('.video').click(function(e){
		  if(!isVideoClicked) {
			  // $(this).css('background', '#000');
		$(this).addClass('content_hidden');
			  var player = new YT.Player('video1', {
				  videoId: 'j6K2wmDn7Ug',
				  events: {
					  'onReady' : function(){
						  $('.video').children('iframe').css('z-index', 1);
						  player.playVideo();
					  }
				  }
			  });
		  }
	  })
  
	  $('.owlcarousel').owlCarousel({
		  items: 1,
		  nav : true,
		  navText : ['<img src="images/arrow-l.svg">', '<img src="images/arrow-r.svg">'],
	  });
  
	  $('.accordeon .acc-label').click(function(e){
		  e.preventDefault();
  
		  $(this).parents('.acc').toggleClass('active').siblings().removeClass('active');
	  });
  
	  $('#submitSignup').click(function(e) {
		  const email = $('#emailSignup').val();
		  if (!ValidateEmail(email)) {
			  return;
		  }
		  const dataToSend = {};
		  dataToSend.type = 1;
		  dataToSend.email = email;
		  postDataToServer(dataToSend, function (res, status) {
			  if (status == "error") {
				  toastr.error("Error:" + res.responseJSON).attr('style', 'font-size:1.9rem');
				  return;
			  }
			  $('#emailSignup').val('');
			  $('header .mobile-menu').fadeOut(250);
			  toastr.success("Thank you for subscribing Homelend").attr('style', 'font-size:1.9rem');
		  });
	  });
  
	  $('#submitContact').click(function(e) {
		  const email = $('#emailContact').val();
		  const name = $('#nameContact').val();
		  if (!ValidateEmail(email)) {
			  toastr.error("Invalid email").attr('style', 'font-size:1.9rem');
			  return;
		  }
		  if (name.length > 64) {
			  const msg = 'Invalid name: ' + (name.length > 64 ? "too long" : "empty");
			  toastr.error(msg).attr('style', 'font-size:1.9rem');
			  return;
		  }
  
		  const dataToSend = {};
		  dataToSend.type = 2;
		  dataToSend.email = email;
		  dataToSend.fullName = name;
		  postDataToServer(dataToSend, function (res, status) {
			  if (status == "error") {
				  toastr.error("Error: " + res.responseJSON).attr('style', 'font-size:1.9rem');
				  return;
			  }
			  toastr.success("We will contact you soon, thank you").attr('style', 'font-size:1.9rem');
			  $('#nameContact').val('');
			  $('#emailContact').val('');
		  });
	  });
  });
  
  
  toastr.options = {
	  "positionClass": "toast-bottom-right",
  }
  
  const postDataToServer = function (data, callback)  {
	  $.ajax({
		  url: "https://homelendioserv.azurewebsites.net/api/apply",
		  type: "POST",
		  dataType: "json",
		  data: JSON.stringify(data),
		  contentType: "application/json",
		  success: callback,
		  error: callback
	  });
  }
  
  const ValidateEmail = function (mail) {
	  return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail));
  }