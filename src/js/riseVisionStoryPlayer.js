(function() {
	'use strict';


	var player = {};
	var playing = false;


	function riseVisionStoryPlayer() {

		var mediaElements;
		var mediaIndex = 0;

		var sequence = [
			{ duration:  100, on: 'thumbnail',         off: 'fade-in hidden'    },
			{ duration:  750, on: 'full',              off: 'thumbnail fade-in' },
			{ duration: 3500, on: 'fade-in thumbnail', off: 'full'              },
			{ duration:  700, on: 'fade-in thumbnail', off: 'full'              },
		];
		var sequencePauseIndex = 1;

		playing = playing || false;
		var pausedTimeout = 3000;


		// got file list from storage
		document.querySelector( 'rise-storage' ).addEventListener( 'rise-storage-response', function( e ) {
			var urls = e.detail;

			// setup DOM
			var mediaList = document.querySelector( 'main > ul' );
			var oldMediaList = {};
			if ( ! mediaList ) {
				mediaList = document.createElement( 'ul' );
				document.querySelector( 'main' ).appendChild( mediaList );
			} else {
				Array.prototype.forEach.call( mediaList.children, function( li ) {
					var src = li.querySelector( 'img' ).src;
					oldMediaList[ src ] = li;
				});
			}
			urls.forEach(function( src ) {
				// already have this element
				if ( oldMediaList[ src ]) {
					delete oldMediaList[ src ];
					return;
				}

				var li = document.createElement( 'li' );
				var button = document.createElement( 'button' );
				var img = document.createElement( 'img' );
				img.src = src;
				img.alt = "";

				// initial animation classes
				li.classList.add( 'hidden', 'fade', 'fade-in', 'thumbnail' );

				// randomly position
				li.style.left = ( Math.floor( Math.random() * window.innerWidth ) - ( window.innerWidth / 2 )) + 'px';
				li.style.top = ( Math.floor( Math.random() * window.innerHeight ) - ( window.innerHeight / 2 )) + 'px';
				li.style.transform = 'rotate(' + ( Math.floor( Math.random() * 90 ) - 45 + 360 ) + 'deg)';

				// add to DOM
				button.appendChild( img );
				li.appendChild( button );
				mediaList.appendChild( li );
			});

			// pause for update
			pause();

			// remove anything left on the old media list
			Object.keys( oldMediaList ).forEach(function( key ) {
				oldMediaList[ key ].remove();
			});
			// get the new children list
			mediaElements = mediaList.children;
			// cap the mediaIndex
			mediaIndex = Math.min( mediaIndex, mediaElements.length );

			play();
		});


		// render the animation sequence
		var animationIndex = 0;
		var then = Date.now();
		function animateSequence() {
			var now = Date.now();

			if ( mediaElements.length === 0 ) {
				return;
			}

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
		document.querySelector( 'main' ).addEventListener( 'click', playerClick );


		// return API
		player = {
			pause: pause,
			play: play,
			playPause: playToggle
		};
		return player;
	}


	// API
	window.riseVisionStoryPlayer = riseVisionStoryPlayer;

}());

