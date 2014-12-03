function riseVisionStoryPlayer( urls ) {
	'use strict';

	var player = {};
	var mediaElements = document.querySelectorAll( 'li' );
	var mediaIndex = 0;

	var sequence = [
		{ duration:  100, on: 'thumbnail',         off: 'fade-in hidden'    },
		{ duration:  750, on: 'full',              off: 'thumbnail fade-in' },
		{ duration: 3500, on: 'fade-in thumbnail', off: 'full'              },
		{ duration:  700, on: 'fade-in thumbnail', off: 'full'              },
	];
	var sequencePauseIndex = 1;

	var playing = false;
	var pausedTimeout = 3000;


	// setup DOM
	var mediaList = document.querySelector( 'main > ul' );
	if ( ! mediaList ) {
		mediaList = document.createElement( 'ul' );
		document.querySelector( 'main' ).appendChild( mediaList );
	}
	urls.forEach(function( src ) {
		var li = document.createElement( 'li' );
		var button = document.createElement( 'button' );
		var img = document.createElement( 'img' );
		img.src = src;

		li.appendChild( button );
		button.appendChild( img );
		mediaList.appendChild( li );

		// initial animation classes
		li.classList.add( 'hidden', 'fade', 'fade-in', 'thumbnail' );

		// randomly position
		li.style.left = ( Math.floor( Math.random() * window.innerWidth ) - ( window.innerWidth / 2 )) + 'px';
		li.style.top = ( Math.floor( Math.random() * window.innerHeight ) - ( window.innerHeight / 2 )) + 'px';
		li.style.transform = 'rotate(' + ( Math.floor( Math.random() * 90 ) - 45 + 360 ) + 'deg)';
	});
	var mediaElements = mediaList.children;


	// render the animation sequence
	var animationIndex = 0;
	var then = Date.now();
	function animateSequence() {
		var now = Date.now();

		// time to update?
		if ( now - then >= sequence[ animationIndex ].duration ) {
			// update classes
			sequence[ animationIndex ].on.split( ' ' ).forEach(function( newClass ) {
				mediaElements[ mediaIndex ].classList.add( newClass );
			});
			sequence[ animationIndex ].off.split( ' ' ).forEach(function( oldClass ) {
				mediaElements[ mediaIndex ].classList.remove(  oldClass );
			});

			// next in sequence
			then = now;
			animationIndex = ( animationIndex + 1 ) % sequence.length;

			// prepare next image
			if ( animationIndex === 0 ) {
				mediaIndex = Math.floor( Math.random() * mediaElements.length );
			}
		}

		// paused?
		if ( ! playing ) {
			// set pause duration
			then += pausedTimeout;
			playing = true;
		}

		// loop
		requestAnimationFrame( animateSequence );
	}


	// pause the slideshow
	function pause() {
		if ( playing ) {
			animationIndex = sequencePauseIndex;
			then = Date.now() - sequence[ sequencePauseIndex ].duration;
			playing = false;
		}
		return player;
	}

	// play
	function play() {
		then = Math.min( then, Date.now() );
		if ( ! playing ) {
			playing = true;
			requestAnimationFrame( animateSequence );
		}

		return player;
	}

	// pause toggle
	function playToggle() {
		if ( playing ) {
			pause();
		} else {
			play();
		}
	}


	// click on media
	function playerClick( event ) {
		var item = event.target;
		var i = 0;

		// find LI ancestor
		while ( /^BUTTON|IMG$/i.test( item.tagName ) && item.parentNode ) {
			item = item.parentNode;
		}
		// is it a media element? find it
		for ( i = 0; i < mediaElements.length && mediaElements[ i ] !== item; i++ );

		// selected active item
		if ( i === mediaIndex ) {
			// just pause
			pause();

		} else if ( i < mediaElements.length ) {
			pause();
			// TODO DRY: apply animation
			// finish current element
			sequence[ sequence.length - 1 ].on.split( ' ' ).forEach(function( newClass ) {
				mediaElements[ mediaIndex ].classList.add( newClass );
			});
			sequence[ sequence.length - 1 ].off.split( ' ' ).forEach(function( oldClass ) {
				mediaElements[ mediaIndex ].classList.remove(  oldClass );
			});

			// select new element
			mediaIndex = i;
			// reset animation
			animationIndex = 0;
			play();
		}
	}


	// select media item on click
	document.getElementsByTagName( 'main' )[ 0 ].addEventListener( 'click', playerClick );


	// return API
	player = {
		pause: pause,
		play: play,
		playPause: playToggle
	};
	return player;
}
