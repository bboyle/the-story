(function( window, document ) {
	'use strict';


	var bodyStyle = document.body.style;
	var mainStyle = document.getElementsByTagName( 'main' )[ 0 ].style;


	// set body to size of viewport
	function scaleBodyToFitWindow() {
		// 100% width is easy in css // document.body.style.width = window.innerWidth + 'px';
		mainStyle.height = bodyStyle.height = window.innerHeight + 'px';
	}


	// onresize
	window.addEventListener( 'resize', scaleBodyToFitWindow );

	// immediately
	scaleBodyToFitWindow();


}( window, document ));
