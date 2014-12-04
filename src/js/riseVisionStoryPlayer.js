(function() {
	'use strict';


	var player = {};
	var playing = false;
	var paused = false;
	var pausedTimeout = 3000;

	var sequence = [
		{ duration:  100, on: 'thumbnail',         off: 'fade-in hidden'    },
		{ duration:  750, on: 'full',              off: 'thumbnail fade-in' },
		{ duration: 3500, on: 'fade-in thumbnail', off: 'full'              },
		{ duration:  700, on: 'fade-in thumbnail', off: 'full'              },
	];
	var sequencePauseIndex = 1;


	function riseVisionStoryPlayer() {

		var mediaElements;
		var mediaIndex = 0;
		var animationIndex = 0;


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

			var newItems = [];

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
				newItems.push( li );
			});

			// stop playing
			stop();

			// remove anything left on the old media list
			Object.keys( oldMediaList ).forEach(function( key ) {
				oldMediaList[ key ].remove();
			});
			// add new media
			newItems.forEach(function( li ) {
				mediaList.appendChild( li );
			});

			// get the new children list
			if ( ! mediaElements ) {
				mediaElements = mediaList.children;
			}

			// go
			mediaIndex = Math.floor( Math.random() * mediaElements.length );
			play();
		});


		// set animation state
		function setAnimationState( element, classObject ) {
			DOMTokenList.prototype.add.apply( element.classList, classObject.on.split( ' ' ));
			DOMTokenList.prototype.remove.apply( element.classList, classObject.off.split( ' ' ));
		}


		// render the animation sequence
		var then = Date.now();
		function animateSequence() {
			var now = Date.now();

			if ( mediaElements.length < mediaIndex ) {
				return;
			}

			// time to update?
			if ( now - then >= sequence[ animationIndex ].duration ) {
				// update classes
				setAnimationState( mediaElements[ mediaIndex ], sequence[ animationIndex ]);

				// next in sequence
				then = now;
				animationIndex = ( animationIndex + 1 ) % sequence.length;

				// prepare next image
				if ( animationIndex === 0 ) {
					mediaIndex = Math.floor( Math.random() * mediaElements.length );
				}
			}

			// paused?
			if ( paused ) {
				// set pause duration
				then += pausedTimeout;
				paused = false;
			}

			// loop
			if ( playing ) {
				requestAnimationFrame( animateSequence );
			}
		}


		// pause the slideshow
		function pause() {
			if ( ! paused ) {
				animationIndex = sequencePauseIndex;
				paused = true;
				then = 0; // triggers animation to run
			}
			return player;
		}

		// play
		function play() {
			then = Math.min( then, Date.now() );
			if ( ! playing || paused ) {
				playing = true;
				paused = false;
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

		// stop
		function stop() {
			if ( playing ) {
				playing = false;
				paused = false;
				animationIndex = sequence.length - 1;
				// finish current element
				setAnimationState( mediaElements[ mediaIndex ], sequence[ animationIndex ]);

				// reset for new item
				mediaIndex = Math.floor( Math.random() * mediaElements.length );
			}
			return player;
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
				if ( ! playing ) {
					play();
				} else {
					pause();
				}

			} else if ( i < mediaElements.length ) {
				pause();
				// finish current element
				setAnimationState( mediaElements[ mediaIndex ], sequence[ sequence.length - 1 ]);

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
			playPause: playToggle,
			stop: stop
		};
		return player;
	}


	// API
	window.riseVisionStoryPlayer = riseVisionStoryPlayer;

}());
