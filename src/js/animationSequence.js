function riseVisionStoryPlayer() {
	'use strict';

	var player = {};
	var images;
	var nextImage = new Image();

	var media = document.getElementById( 'media' );
	var sequence = [
		{ duration:  100, on: 'thumbnail',         off: 'fade-in'           },
		{ duration:  600, on: 'full',              off: 'thumbnail fade-in' },
		{ duration: 3500, on: 'fade-in thumbnail', off: 'full'              },
		{ duration:  700, on: 'thumbnail',         off: 'full'              },
	];
	// TODO flag steps that can be paused, find the next 'pausable' point
	var sequencePauseIndex = 1;

	var playing = false;


	// render the animation sequence
	var i = 0;
	var then = Date.now();
	function animateSequence() {
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


			// prepare next image
			if ( i === 0 ) {
				nextImage.src = images[ Math.floor( Math.random() * images.length ) ];
			}

			// next in sequence
			then = now;
			i = ( i + 1 ) % sequence.length;

			// new media?
			if ( i === 0 ) {
				media.getElementsByTagName( 'img' )[ 0 ].src = nextImage.src;
			}
		}

		// loop
		if ( playing ) {
			requestAnimationFrame( animateSequence );
		}
	}


	// setMedia
	function setMedia( media ) {
		images = media;
		return player;
	}


	// pause the slideshow
	function pause() {
		if ( playing ) {
			i = sequencePauseIndex;
			then = Date.now() - sequence[ sequencePauseIndex ].duration;
			playing = false;
		}
		return player;
	}

	// play
	function play() {
		if ( ! playing ) {
			playing = true;
			requestAnimationFrame( animateSequence );
		}
		return player;
	}


	// start it up!
	playing = false;
	play();


	// return API
	return player = {
		pause: pause,
		play: play,
		setMedia: setMedia
	};
}
