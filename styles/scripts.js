$(function() {
	setTimeout(function() {
		$('.pageLoad').fadeToggle();
		$(this).scrollTop(0);
		$('#scrollToTop').fadeOut();
		$('.darkModeToggle').fadeOut();
	}, 2000);

	var pageTitle = $("title").text();

	$(window).blur(function() {
	  	$("title").text("Hey..👋");
	});

	$(window).focus(function() {
	  	$("title").text(pageTitle);
	});

	$(window).scroll(function() {
		$('nav').toggleClass('scrolled', $(this).scrollTop() > 80);

		if($(this).scrollTop() > 80) {
			$('#scrollToTop').fadeIn();
		}
		else {
			$('#scrollToTop').fadeOut();
		}
	});

	$(document).ready(function() {
		$(this).scrollTop(0);
		
		$("a").on('click', function(event) {
		  	if (this.hash !== "") {
				event.preventDefault();
				var hash = this.hash;
		
				$('html, body').animate( {
					scrollTop: $(hash).offset().top
					}, 1000, function() {
					window.location.hash = hash;
				});
		  	}
		});

		$('#darkMode').click(function() {
			$('.darkModeToggle').fadeToggle();
		});
		
		$('.menuIcon span').removeClass('open');
		$('.navbar-collapse').collapse('hide');

		$('.navLogo').click(function() {
			if ($('.menuIcon').hasClass('open')) {
				$('.menuIcon').removeClass('open');
				$('.navbar-collapse').collapse('hide');
			}
		});

		$('#scrollToTop').click(function() {
			if ($('.menuIcon').hasClass('open')) {
				$('.menuIcon').removeClass('open');
				$('.navbar-collapse').collapse('hide');
			}
		});

		$('.navbar-toggler').click(function() {
			$('.navbar-collapse').collapse('toggle');
			$('.menuIcon').toggleClass('open');
		});

		$('.navbar ul').click(function() {
			if ($('.menuIcon').hasClass('open')) {
				$('.menuIcon').removeClass('open');
				$('.navbar-collapse').collapse('hide');
			}
		});
	});
});