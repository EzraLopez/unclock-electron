// Frontend navigation


$(function () {

	var modeButtons = $('.switch-clocks a'),
		html = $('html');

	//	Changing the different clock modes using the buttons.

	modeButtons.on('click', function (e) {

		var that = $(e.target);

		// Making the according button accented.

		modeButtons.removeClass('accent-4');
		that.addClass('accent-4');

		// By adding classes to the html we manipulate which clock is shown through CSS.

		if(that.hasClass('alarm')){
			html.removeClass();
			html.addClass('alarm-mode');
		}

		if(that.hasClass('stopwatch')){
			html.removeClass();
			html.addClass('stopwatch-mode');
		}

		if(that.hasClass('timer')){
			html.removeClass();
			html.addClass('timer-mode');
		}

	});

	// Touch events

	// Change modes by swiping left and right with the help of Hammer.js.

	var myElement = document.querySelector(".wrapper");
	
	var mc = new Hammer(myElement);

	mc.on("panright", function() {

		if(html.hasClass('stopwatch-mode')){

			html.removeClass();
			html.addClass('alarm-mode');

			modeButtons.removeClass('accent-4');
			modeButtons.filter('.alarm').addClass('accent-4');

			mc.stop();
		}

		else if(html.hasClass('timer-mode')){

			html.removeClass();
			html.addClass('stopwatch-mode');

			modeButtons.removeClass('accent-4');
			modeButtons.filter('.stopwatch').addClass('accent-4');

			mc.stop();
		}
	});

	mc.on("panleft", function() {

		if(html.hasClass('stopwatch-mode')){

			html.removeClass();
			html.addClass('timer-mode');

			modeButtons.removeClass('accent-4');
			modeButtons.filter('.timer').addClass('accent-4');

			mc.stop();
		}

		else if(html.hasClass('alarm-mode')){

			html.removeClass();
			html.addClass('stopwatch-mode');

			modeButtons.removeClass('accent-4');
			modeButtons.filter('.stopwatch').addClass('accent-4');

			mc.stop();
		}
	});


	// A hover effect on the clocks.

	var clock = $('.clock');

	clock.on('mouseenter', function (e) {

		$(this).addClass('z-depth-3');

	});

	clock.on('mouseleave', function (e) {

		$(this).removeClass('z-depth-3');

	});


	// Prevent page refresh on enter press in the input fields.

	$('input').keydown(function(event){
		if(event.keyCode == 13) {
			event.preventDefault();
			return false;
		}
	});

});