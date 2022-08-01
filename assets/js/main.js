/*
	Highlights by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {
/*js for playbutton*/
TweenMax.set(".play-circle-01", {
	rotation: 90,
	transformOrigin: "center"
  })
  
  TweenMax.set(".play-circle-02", {
	rotation: -90,
	transformOrigin: "center"
  })
  
  TweenMax.set(".play-perspective", {
	xPercent: 6.5,
	scale: .175,
	transformOrigin: "center",
	perspective: 1
  })
  
  TweenMax.set(".play-video", {
	visibility: "hidden",
	opacity: 0,
  })
  
  TweenMax.set(".play-triangle", {
	transformOrigin: "left center",
	transformStyle: "preserve-3d",
	rotationY: 10,
	scaleX: 2
  })
  
  const rotateTL = new TimelineMax({ paused: true })
	.to(".play-circle-01", .7, {
	  opacity: .1,
	  rotation: '+=360',
	  strokeDasharray: "456 456",
	  ease: Power1.easeInOut
	}, 0)
	.to(".play-circle-02", .7, {
	  opacity: .1,
	  rotation: '-=360',
	  strokeDasharray: "411 411",
	  ease: Power1.easeInOut
	}, 0)
  
  const openTL = new TimelineMax({ paused: true })
	.to(".play-backdrop", 1, {
	  opacity: .95,
	  visibility: "visible",
	  ease: Power2.easeInOut
	}, 0)
	.to(".play-close", 1, {
	  opacity: 1,
	  ease: Power2.easeInOut
	}, 0)
	.to(".play-perspective", 1, {
	  xPercent: 0,
	  scale: 1,
	  ease: Power2.easeInOut
	}, 0)
	.to(".play-triangle", 1, {
	  scaleX: 1,
	  ease: ExpoScaleEase.config(2, 1, Power2.easeInOut)
	}, 0)
	.to(".play-triangle", 1, {
	  rotationY: 0,
	  ease: ExpoScaleEase.config(10, .01, Power2.easeInOut)
	}, 0)
	.to(".play-video", 1, {
	  visibility: "visible",
	  opacity: 1
	}, .5)
  
  
  const button = document.querySelector(".play-button")
  const backdrop = document.querySelector(".play-backdrop")
  const close = document.querySelector(".play-close")
  
  button.addEventListener("mouseover", () => rotateTL.play())
  button.addEventListener("mouseleave", () => rotateTL.reverse())
  button.addEventListener("click", () => openTL.play())
  backdrop.addEventListener("click", () => openTL.reverse())
  close.addEventListener("click", e => {
	e.stopPropagation()
	openTL.reverse()
  })

	var	$window = $(window),
		$body = $('body'),
		$html = $('html');

	// Breakpoints.
		breakpoints({
			large:   [ '981px',  '1680px' ],
			medium:  [ '737px',  '980px'  ],
			small:   [ '481px',  '736px'  ],
			xsmall:  [ null,     '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch mode.
		if (browser.mobile) {

			var $wrapper;

			// Create wrapper.
				$body.wrapInner('<div id="wrapper" />');
				$wrapper = $('#wrapper');

				// Hack: iOS vh bug.
					if (browser.os == 'ios')
						$wrapper
							.css('margin-top', -25)
							.css('padding-bottom', 25);

				// Pass scroll event to window.
					$wrapper.on('scroll', function() {
						$window.trigger('scroll');
					});

			// Scrolly.
				$window.on('load.hl_scrolly', function() {

					$('.scrolly').scrolly({
						speed: 1500,
						parent: $wrapper,
						pollOnce: true
					});

					$window.off('load.hl_scrolly');

				});

			// Enable touch mode.
				$html.addClass('is-touch');

		}
		else {

			// Scrolly.
				$('.scrolly').scrolly({
					speed: 1500
				});

		}

	// Header.
		var $header = $('#header'),
			$headerTitle = $header.find('header'),
			$headerContainer = $header.find('.container');

		// Make title fixed.
			if (!browser.mobile) {

				$window.on('load.hl_headerTitle', function() {

					breakpoints.on('>medium', function() {

						$headerTitle
							.css('position', 'fixed')
							.css('height', 'auto')
							.css('top', '50%')
							.css('left', '0')
							.css('width', '100%')
							.css('margin-top', ($headerTitle.outerHeight() / -2));

					});

					breakpoints.on('<=medium', function() {

						$headerTitle
							.css('position', '')
							.css('height', '')
							.css('top', '')
							.css('left', '')
							.css('width', '')
							.css('margin-top', '');

					});

					$window.off('load.hl_headerTitle');

				});

			}

		// Scrollex.
			breakpoints.on('>small', function() {
				$header.scrollex({
					terminate: function() {

						$headerTitle.css('opacity', '');

					},
					scroll: function(progress) {

						// Fade out title as user scrolls down.
							if (progress > 0.5)
								x = 1 - progress;
							else
								x = progress;

							$headerTitle.css('opacity', Math.max(0, Math.min(1, x * 2)));

					}
				});
			});

			breakpoints.on('<=small', function() {

				$header.unscrollex();

			});

	// Main sections.
		$('.main').each(function() {

			var $this = $(this),
				$primaryImg = $this.find('.image.primary > img'),
				$bg,
				options;

			// No primary image? Bail.
				if ($primaryImg.length == 0)
					return;

			// Create bg and append it to body.
				$bg = $('<div class="main-bg" id="' + $this.attr('id') + '-bg"></div>')
					.css('background-image', (
						'url("assets/css/images/overlay.png"), url("' + $primaryImg.attr('src') + '")'
					))
					.appendTo($body);

			// Scrollex.
				$this.scrollex({
					mode: 'middle',
					delay: 200,
					top: '-10vh',
					bottom: '-10vh',
					init: function() { $bg.removeClass('active'); },
					enter: function() { $bg.addClass('active'); },
					leave: function() { $bg.removeClass('active'); }
				});

		});

})(jQuery);
