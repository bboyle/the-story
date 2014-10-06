(function() {
	'use strict';

	var mediaList = document.querySelector( 'main ul' );
	var images = riseVisionStorage().getMedia();

	images.forEach(function( src ) {
		var li = document.createElement( 'li' );
		var button = document.createElement( 'button' );
		var img = document.createElement( 'img' );
		img.src = src;

		li.appendChild( button );
		button.appendChild( img );
		mediaList.appendChild( li );
	});
}());