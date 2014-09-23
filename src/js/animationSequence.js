(function() {
	'use strict';

	var media = document.getElementById( 'media' );

	// TODO use requestAnimationFrame
	// http://codepen.io/bboyle/pen/gAuwv?editors=001

	// 0-.7s: immediate: fade-in()
	media.classList.remove( 'fade-in' );

	// .7-1.4s: enlarge
	setTimeout(function() {
		media.classList.add( 'full' );
		media.classList.remove( 'thumbnail' );
	}, 700 );

	// 4s: fade-out
	// setTimeout(function() {
	// 	media.classList.add( 'fade-out' );
	// }, 4000 );

}());