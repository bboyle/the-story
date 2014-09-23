(function() {
	'use strict';

	var media = document.getElementById( 'media' );
	var sequence = [
		{ duration:  100, on: 'thumbnail',         off: 'fade-in'   },
		{ duration:  600, on: 'full',              off: 'thumbnail' },
		{ duration: 3500, on: 'fade-in thumbnail', off: 'full'      },
		{ duration:  700, on: 'thumbnail',         off: 'full'      },
	];


	var i = 0;
	var then = Date.now();
	requestAnimationFrame(function animateSequence() {
		var now = Date.now();

		// time to update?
		if ( now - then >= sequence[ i ].duration ) {
			// update classes
			sequence[ i ].on.split( ' ' ).forEach(function( newClass ) {
				media.classList.add( newClass );
			});
			sequence[ i ].off.split( ' ' ).forEach(function( oldClass ) {
				media.classList.remove(  oldClass );
			});

			// next in sequence
			then = now;
			i = ( i + 1 ) % sequence.length;
		}

		// loop
		requestAnimationFrame( animateSequence );
	});

}());
