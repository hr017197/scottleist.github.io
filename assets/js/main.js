/*
	Highlights by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {
	/**
	 * Get videos on load
	 */
	(function () {
		getVideos();
	})();
	
	/**
	 * For each video player, create custom thumbnail or
	 * use Youtube max resolution default thumbnail and create
	 * iframe video.
	 */
	function getVideos() {
		var v = document.getElementsByClassName("youtube-player");
		for (var n = 0; n < v.length; n++) {
			var p = document.createElement("div");
			var id = v[n].getAttribute("data-id");
	
			var placeholder = v[n].hasAttribute("data-thumbnail")
				? v[n].getAttribute("data-thumbnail")
				: "";
	
			if (placeholder.length) p.innerHTML = createCustomThumbail(placeholder);
			else p.innerHTML = createThumbail(id);
	
			v[n].appendChild(p);
			p.addEventListener("click", function () {
				var parent = this.parentNode;
				createIframe(parent, parent.getAttribute("data-id"));
			});
		}
	}
	
	/**
	 * Create custom thumbnail from data-attribute provided url
	 * @param {string} url
	 * @return {string} The HTML containing the <img> tag
	 */
	function createCustomThumbail(url) {
		return (
			'<img class="youtube-thumbnail" src="' +
			url +
			'" alt="Youtube Preview" /><div class="youtube-play-btn"></div>'
		);
	}
	
	/**
	 * Get Youtube default max resolution thumbnail
	 * @param {string} id The Youtube video id
	 * @return {string} The HTML containing the <img> tag
	 */
	function createThumbail(id) {
		return (
			'<img class="youtube-thumbnail" src="//i.ytimg.com/vi_webp/' +
			id +
			'/maxresdefault.webp" alt="Youtube Preview"><div class="youtube-play-btn"></div>'
		);
	}
	
	/**
	 * Create and load iframe in Youtube container
	 **/
	function createIframe(v, id) {
		var iframe = document.createElement("iframe");
		console.log(v);
		iframe.setAttribute(
			"src",
			"//www.youtube.com/embed/" +
				id +
				"?autoplay=1&color=white&autohide=2&modestbranding=1&border=0&wmode=opaque&enablejsapi=1&showinfo=0&rel=0"
		);
		iframe.setAttribute("frameborder", "0");
		iframe.setAttribute("class", "youtube-iframe");
		v.firstChild.replaceWith(iframe);
	}
	
	/** Pause video on modal close **/
	$("#video-modal").on("hidden.bs.modal", function (e) {
		$(this).find("iframe").remove();
	});
	
	/** Pause video on modal close **/
	$("#video-modal").on("show.bs.modal", function (e) {
		getVideos();
	});

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
