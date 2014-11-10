function getMediaFromStorage( company, folder, callback ) {
	'use strict';

	var mediaList = document.querySelector( 'main ul' );
	riseVisionStorage().getMedia( company, folder, function( images ) {
		// console.log( 'getMedia', images );
		images.forEach(function( src ) {
			var li = document.createElement( 'li' );
			var button = document.createElement( 'button' );
			var img = document.createElement( 'img' );
			img.src = src;

			li.appendChild( button );
			button.appendChild( img );
			mediaList.appendChild( li );
		});

		// media is now setup
		callback();
	});
};
