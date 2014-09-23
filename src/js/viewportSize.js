(function( window, body ) {
	'use strict';

	// set body to size of viewport
	function scaleBodyToFitWindow() {
		console.log( 'scaleBodyToFitWindow' );
		// 100% width is easy in css // document.body.style.width = window.innerWidth + 'px';
		body.style.height = window.innerHeight + 'px';
	}

	// onresize
	window.addEventListener( 'resize', scaleBodyToFitWindow );

	// immediately
	scaleBodyToFitWindow();

}( window, document.body ));
