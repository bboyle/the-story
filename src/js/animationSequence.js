(function() {
	'use strict';

	var media = document.getElementById( 'media' );
	var sequence = [
		{ timeout:  100, on: 'thumbnail', off: 'fade-in'   },
		{ timeout:  700, on: 'full',      off: 'thumbnail' },
		{ timeout: 4000, on: 'fade-in',   off: 'full'      },
		{ timeout: 4400, on: 'thumbnail', off: 'full'      },
	];

	// TODO use requestAnimationFrame
	// http://codepen.io/bboyle/pen/gAuwv?editors=001

	function run() {
		// .1s-.4s: fade in
		setTimeout(function() {
			media.classList.add( sequence[ 0 ].on );
			media.classList.remove( sequence[ 0 ].off );
		}, sequence[ 0 ].timeout );

		// .7-1.4s: enlarge
		setTimeout(function() {
			media.classList.add( sequence[ 1 ].on );
			media.classList.remove( sequence[ 1 ].off );
		}, sequence[ 1 ].timeout );

		// 4-4.3s: fade-out
		setTimeout(function() {
			media.classList.add( sequence[ 2 ].on );
			media.classList.remove( sequence[ 2 ].off );
		}, sequence[ 2 ].timeout );

		// 4.4s: loop
		setTimeout(function() {
			media.classList.add( sequence[ 3 ].on );
			media.classList.remove( sequence[ 3 ].off );
			run();
		}, sequence[ 3 ].timeout );
	}

	// go!
	run();

}());